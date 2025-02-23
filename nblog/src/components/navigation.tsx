import NavLink from "./nav-link";

interface INavigationProps{}

const Navigation: React.FC<INavigationProps> = () => {
    return (
        <nav>
            <NavLink href="/" label="HOME" />
            <div>
                <NavLink href="/register" label="REGISTER" />
                <NavLink href="/dashboard" label="DASHBOARD" />
            </div>
        </nav>
    );
}

export default Navigation;