import { IUser } from "@/types/shared/register";
import { cookies } from "next/headers";
import { decrypt } from "./sessions";
import { JWTPayload } from "jose";




export default async function getAuthUser(): Promise<JWTPayload | null>{
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value

    if(session){
        const user = await decrypt(session)
        return user;
    }
    return null;
}