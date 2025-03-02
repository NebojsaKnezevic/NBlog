'use client'

import { ICreateUpdatePost } from "@/actions/posts";
import { BlogPost } from "@/types/shared/blog";
import { useActionState } from "react";


interface IBlogFormProps{
    handler: (state: any, formData: FormData) => Promise<ICreateUpdatePost>;
    post?: BlogPost
}

const BlogForm: React.FC<IBlogFormProps> = (props) => {
    const {handler, post} = props
    const [state, action, isPending] = useActionState(handler, undefined)
    return(
        <form action={action} className="space-y-4">
            <input type="hidden" name="postId" defaultValue={post?._id.toString()}/>
             <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title"  defaultValue={state?.title?.toString() || post?.title}/>
                    {state?.errors?.title && (
                        <p className="error">{state.errors.title}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea rows={6} name="content"  defaultValue={state?.content?.toString() || post?.content}></textarea>
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