import { ObjectId } from "mongodb";


export interface BlogPost {
    _id: ObjectId;
    title: string;
    content: string;
    userId: ObjectId;
  };