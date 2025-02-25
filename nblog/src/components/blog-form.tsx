'use client'

import { ICreatePost } from "@/actions/posts";
import { useActionState } from "react";


interface IBlogFormProps{
    handler: (state: any, formData: FormData) => Promise<ICreatePost>;
}

const BlogForm: React.FC<IBlogFormProps> = (props) => {
    const {handler} = props
    const [state, action, isPending] = useActionState(handler, undefined)
    return(
        <form action={action} className="space-y-4">
             <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title"  defaultValue={state?.title?.toString()}/>
                    {state?.errors?.title && (
                        <p className="error">{state.errors.title}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea rows={6} name="content"  defaultValue={state?.content?.toString()}></textarea>
                    {state?.errors?.content && (
                        <p className="error">{state.errors.content}</p>
                    )}
                </div>
                <div>
                    <button className="btn-primary" disabled={isPending}>SUBMIT</button>
                </div>
        </form>
    );
}
export default BlogForm;