"use server"

import { getCollection } from "@/lib/db"
import { RegisterFormSchema } from "@/lib/rules"
import { IRegister } from "@/types/shared/register"
import { error } from "console"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"
import { createSession } from "@/lib/sessions"

//Zod validation
export const register = async(state: any, formData: FormData) => {

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
    const existingUser = await userCollection.findOne({email:email})
    if(existingUser){
        return {
  
            errors: { email: ["Email already exists!"] },
            email,
            password,
            confirmPassword: confirmPassword,
        };
    }

    //has pwd
    const hashedPassword = await bcrypt.hash(password, 10)

    //save in db
    const results = await userCollection?.insertOne({email:email,password:hashedPassword});
    console.log("results", results)
    //create session
    await createSession(results.insertedId)
    //redirect
    redirect("/dashboard")
}