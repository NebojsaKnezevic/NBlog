import { BlogPost } from "@/types/shared/blog";
import Link from "next/link";

interface IBlogProps{
    blog: BlogPost
}

export default function BlogCard(props: IBlogProps){
    const {blog} = props
    return(
        <div key={blog._id.toString()}>
        <div className="border border-slate-400 border-dashed p-4 rounded-md h-full bg-white">
          <p className="text-slate-600 text-xs">{blog._id.getTimestamp().toLocaleString()}</p>
          <Link href={`/posts/show/${blog._id.toString()}`} className="block text-xl font-semibold">
          {blog.title}
          </Link>
          <p className="text-sm">{blog.content}</p>
        </div>
        
      </div>
    );
}