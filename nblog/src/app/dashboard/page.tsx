import { deletePost } from "@/actions/posts";
import getAuthUser from "@/lib/auth-user";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import React, { JSX } from "react";

const Dashboard = async (): Promise<React.ReactElement> => {


    const user = await getAuthUser();

    if (user === null) throw new Error("user is null")

    const postsCollection = await getCollection('posts');

    if (postsCollection === null) throw new Error("collection is null")
    console.log(user.userID as string)
    const usersPosts = await postsCollection
        .find({ userId: ObjectId.createFromHexString(user.userID as string) })
        .sort({ $natural: -1 })
        .toArray()
    return (
        <div>
            <h1 className="title">DASHBOARD</h1>
            {usersPosts && (
                <table>
                    <thead>
                        <tr>
                            <th className="w-3/6">Title</th>
                            <th className="w-1/6 sr-only">View</th>
                            <th className="w-1/6 sr-only">Edit</th>
                            <th className="w-1/6 sr-only">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersPosts.map((blog) => {

                            return (
                                <tr key={blog._id.toString()}>
                                    <td className="w-3/6 ">{blog.title}</td>
                                    <td className="w-1/6 text-blue-500">
                                        <Link href={`/posts/show/${blog._id.toString()}`}>View</Link>
                                    </td>
                                    <td className="w-1/6 text-green-500">
                                        <Link href={`/posts/edit/${blog._id.toString()}`}>Edit</Link>
                                    </td>
                                    <td className="w-1/6 text-red-500">
                                        <form action={deletePost}>
                                            <input type="hidden" name="postId" value={blog._id.toString()}/>
                                            <button type="submit">Delete</button>
                                        </form>


                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {!usersPosts && <p>Failed to fetch users data!</p>}
        </div>
    );
};

export default Dashboard;