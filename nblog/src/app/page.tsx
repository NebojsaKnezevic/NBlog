import BlogCard from "@/components/blog";
import { getCollection } from "@/lib/db";
import { BlogPost } from "@/types/shared/blog";
import { IUser } from "@/types/shared/register";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Home(): Promise<React.ReactElement> {

  return(
    <BlogList/>
  );
}


async function BlogList(): Promise<React.ReactElement>{
  
  const postoCollection = await getCollection('posts')
  if (!postoCollection) {
    throw new Error("Failed to connect to the database.");
  }

  const blogs = (await postoCollection.find().sort({$natural: -1}).toArray()) as BlogPost[];
  console.log(blogs)

  if(blogs){
    return (
      <div className="grid grid-cols-2 gap-6">
        {blogs.map((blog, index)=>{
          return(
            <BlogCard blog={blog}/>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Error, failed to fetch blogs!</h1>
      </div>
    );
  }
}