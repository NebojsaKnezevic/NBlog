"use client"
import { register } from "@/actions/auth";
import Link from "next/link";
import React, { useActionState } from "react";

interface IRegisterProps{

}

const Register: React.FC<IRegisterProps> = () => {
    const [state, action, isPending] = useActionState(register, undefined);
    console.log(isPending)
    return(
        <div className="container w-1/2">
            <h1 className="title">Register</h1>
            <form action={action} className="space-y-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" defaultValue={state?.email?.toString()}/>
                    {state?.errors?.email && (
                        <p className="error">{state.errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" defaultValue={state?.password?.toString()}/>
                    {state?.errors?.password && (
                        <p className="error">{state.errors.password.shift()}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="text" name="confirmPassword" defaultValue={state?.confirmPassword?.toString()}/>
                    {state?.errors?.confirmPassword && (
                        <p className="error">{state.errors.confirmPassword}</p>
                    )}
                </div>

                <div className="flex items-end gap-4">
                    <button className="btn-primary" disabled={isPending}>
                        {isPending ? "Loading" : "Register"}
                    </button>
                    <Link href={"/"} className="text-link">or login here</Link>
                </div>
            </form>
        </div>
    );
}

export default Register