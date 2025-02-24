"use server"

import { getCollection } from "@/lib/db"
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules"
import { IRegister, IUser } from "@/types/shared/register"
import { error } from "console"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"
import { createSession } from "@/lib/sessions"
import { cookies } from "next/headers"

interface RegisterResponse {
    errors: {
        
        email?: string[] | undefined;
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
    };
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
    confirmPassword: FormDataEntryValue | null;
}

interface LoginResponse {
    errors: {
        server?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
    };
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

//Zod validation
export const register = async(state: any, formData: FormData): Promise<RegisterResponse> => {

    // await new Promise((resolve)=> setTimeout(resolve, 3000))

    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    if(!validatedFields.success)
    {
        return{
            
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword") 
        }
    }
    
    const {email,password, confirmPassword} = validatedFields.data

    const userCollection = await getCollection("users")
    if (!userCollection) {
        return {
  
            errors: { email: ["Server error!"] },
            email,
            password,
            confirmPassword: confirmPassword,
        };
    }

    //Check if email already exists in db.
    const existingUser = await userCollection.findOne<IUser>({email:email})
    if(existingUser){
        return {
  
            errors: { email: ["Email already exists!"] },
            email,
            password,
            confirmPassword: confirmPassword,
        };
    }

    //hash pwd
    const hashedPassword = await bcrypt.hash(password, 10)

    //save in db
    const results = await userCollection?.insertOne({email:email,password:hashedPassword});
    console.log("results", results)
    //create session
    await createSession(results.insertedId)
    //redirect
    redirect("/dashboard")
}

export const login = async (state: any, formData: FormData): Promise<LoginResponse> => {
    console.log(formData.get('email'), formData.get('password'))
    
    const validateLogin = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })
    if(!validateLogin.success){
        return{
            errors: validateLogin?.error.flatten().fieldErrors,
            email: formData.get("email"),
            password: formData.get("password"),
        }
    }

    const {email, password} = validateLogin.data

    const userCollection = await getCollection('users')

    if(!userCollection){
        return{
            errors: {server: ['server error']},
            email: email,
            password: password
        }
    }

    const userExists = await userCollection.findOne<IUser>({email:email})

    if(!userExists){
        return{
            errors:{email: ['Invalid credentials....']},
            email: email,
            password: password
        }
    }

    const matchPwds = await bcrypt.compare(password, userExists.password)

    if(!matchPwds){
        return{
            errors:{server:['Invalid credentials....']},
            email: email,
            password: password
        }
    }

    await createSession(userExists._id);
    console.log(userExists)
    redirect("/dashboard")
    // return{
    //     errors: {},
    //     email: email,
    //     password: password,
    // }
}

export const logout = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('session')
    redirect('/')
}