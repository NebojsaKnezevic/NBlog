import BlogCard from "@/components/blog"
import { getCollection } from "@/lib/db"
import { BlogPost } from "@/types/shared/blog"
import { ObjectId } from "mongodb"



export default async function Show({params}:any){
    const {id} = await params
    console.log(id)
    const posts = await getCollection('posts')
    const blog = id.length === 24 ? await posts?.findOne({_id: ObjectId.createFromHexString(id)}) : null
   
    return(
        <div>
            {blog ? <BlogCard blog={blog as BlogPost}/> : <p>Failed to fetch data</p>}
        </div>
    )
}