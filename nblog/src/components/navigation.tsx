import getAuthUser from "@/lib/auth-user";
import NavLink from "./nav-link";
import { logout } from "@/actions/auth";

interface INavigationProps { }

const Navigation: React.FC<INavigationProps> = async () => {

    const authUser = await getAuthUser();
    console.log(authUser)

    return (
        <nav>
            <NavLink href="/" label="HOME" />
            {authUser ?
                <div>
                    <NavLink href="/dashboard" label="DASHBOARD" />
                    <form action={logout}>
                        <button className="nav-link">Logout</button>
                    </form>
                </div> :
                <div>
                    <NavLink href="/login" label="LOGIN" />
                    <NavLink href="/register" label="REGISTER" />
                </div>

            }
        </nav>
    );
}

export default Navigation;