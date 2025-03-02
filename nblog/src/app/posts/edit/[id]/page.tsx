import { createPost, editPost } from "@/actions/posts";
import BlogForm from "@/components/blog-form";
import { getCollection } from "@/lib/db";
import { BlogPost } from "@/types/shared/blog";
import { ObjectId } from "mongodb";

export default async function Edit({params}:any){
      const {id} = await params
        console.log(id)
        const posts = await getCollection('posts')
        const blog = id.length === 24 ? await posts?.findOne({_id: ObjectId.createFromHexString(id)}) : null

    return(
        <div className="container w-1/2">
            <h1>Edit your post</h1>
            <BlogForm handler={editPost} post={JSON.parse(JSON.stringify(blog as BlogPost))}/>
        </div>
    );
}
