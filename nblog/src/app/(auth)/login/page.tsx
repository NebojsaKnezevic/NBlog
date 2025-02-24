'use client'
import { login, register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";



const Login: React.FC = () => {
    const [state, action, isPending] = useActionState(login, undefined);
    // console.log(isPending)
    return (
        <div className="container w-1/2">
            <h1 className="title">Login</h1>
            <form action={action} className="space-y-4">
                <div>
                    {state?.errors?.server && (
                        <p className="error">{state.errors.server[0]}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" defaultValue={state?.email?.toString()} />
                    {state?.errors?.email && (
                        <p className="error">{state.errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" defaultValue={state?.password?.toString()} />
                    {state?.errors?.password && (
                        <p className="error">{state.errors.password[0]}</p>
                    )}
                </div>

                <div className="flex items-end gap-4">
                    <button className="btn-primary" disabled={isPending}>
                        {isPending ? "Loading" : "Login"}
                    </button>
                    <Link href={"/register"} className="text-link">or register here</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;