import "server-only"

import {JWTPayload, jwtVerify, SignJWT} from "jose"
import { ObjectId } from "mongodb"
import { cookies } from "next/headers"


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)


export async function encrypt(payload:JWTPayload) {
    return new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey)
}

export async function decrypt(session:string): Promise<JWTPayload | null> {
    try {
        const {payload} = await jwtVerify(session, encodedKey,{
            algorithms: ["HS256"]
        })
        return payload
    } catch (error) {
        return null
    }
}

export async function createSession(userID:ObjectId)
{
    const expiresAt = new Date(Date.now() + 1 *24 *60 *60 * 1000)
    const session = await encrypt({userID, expiresAt});
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
}