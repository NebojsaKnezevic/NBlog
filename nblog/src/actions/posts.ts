'use server'

import getAuthUser from "@/lib/auth-user"
import { getCollection } from "@/lib/db"
import { BlogPostoSchema } from "@/lib/rules"
import { error } from "console"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"


export interface ICreateUpdatePost {
    errors: {
        server?: string[] | undefined,
        title?: string[] | undefined,
        content?: string[] | undefined
    },
    title: FormDataEntryValue | null,
    content: FormDataEntryValue | null
}

export const createPost = async (state: any, formData: FormData): Promise<ICreateUpdatePost> => {
    // const title = formData.get('title')
    // const content = formData.get('content')
    // console.log(title, content)


    //check if user is signed in
    const user = await getAuthUser()
    if (!user) {
        return redirect("/")
    }

    //validate from field
    const title = formData.get('title')
    const content = formData.get('content')

    const validateFiled = BlogPostoSchema.safeParse({ title, content })

    if (!validateFiled.success) {
        return {
            errors: validateFiled.error.flatten().fieldErrors,
            title: title,
            content: content
        }
    }

    //save in db
    try {
        const postsCollection = await getCollection('posts')
        const post = {
            title: validateFiled.data.title,
            content: validateFiled.data.content,
            userId: ObjectId.createFromHexString(user.userID as string)
        }
        await postsCollection?.insertOne(post)
    } catch (error) {
        let errorMessage = "An unknown error occurred";

        if (error instanceof Error) {
            errorMessage = error.message
        } else if (typeof error === "string") {
            errorMessage = error;
        }

        return {
            errors: {
                server: [errorMessage]
            },
            title: title,
            content: content
        }
    }
    redirect('/dashboard')
    return {
        errors: {},
        title: "",
        content: ""
    }
}


export const editPost = async (state: any, formData: FormData): Promise<ICreateUpdatePost> => {
    // const title = formData.get('title')
    // const content = formData.get('content')
    // console.log(`${formData.get('postId')}`)


    //check if user is signed in
    const user = await getAuthUser()
    if (!user) {
        return redirect("/")
    }

    //validate from field
    const title = formData.get('title')
    const content = formData.get('content')
    const blogId = formData.get('postId') 

    const validateFiled = BlogPostoSchema.safeParse({ title, content })

    if (!validateFiled.success) {
        return {
            errors: validateFiled.error.flatten().fieldErrors,
            title: title,
            content: content
        }
    }
    //find the object
    const postsCollection = await getCollection('posts')
    const post = await postsCollection?.findOne({_id: ObjectId.createFromHexString(blogId as string)})
    
    //if not users blog, redirect
    if(post?.userId !== user.userId) return redirect("/")
    

    //update in db
    try {
        const result = await postsCollection?.findOneAndUpdate(
            { _id: post?._id },
            { $set: { title: validateFiled.data.title, content: validateFiled.data.content } }
        );

        if (result?.lastErrorObject?.updatedExisting) {
            console.log("Update successful!");
        } else {
            return {
                errors: {
                    server: ["update failed, document not found!"]
                },
                title: title,
                content: content
            }
        }
    } catch (error) {
        let errorMessage = "An unknown error occurred";

        if (error instanceof Error) {
            errorMessage = error.message
        } else if (typeof error === "string") {
            errorMessage = error;
        }

        return {
            errors: {
                server: [errorMessage]
            },
            title: title,
            content: content
        }
    }
    redirect('/dashboard')
    return {
        errors: {},
        title: "",
        content: ""
    }
}