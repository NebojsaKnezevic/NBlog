import { ObjectId } from "mongodb";

export interface IRegister{
    email: string,
    password: string,
    confirmPassword: string
}

export interface IUser{
    _id: ObjectId,
    email: string,
    password: string,
}