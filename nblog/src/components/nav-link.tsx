'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface INavProp {
    label: string;
    href: string;
}

const NavLink: React.FC<INavProp> = (props) => {
    const { label, href } = props
    const pathname = usePathname();

    return (
        <Link 
        href={href}
        className={`nav-link ${pathname === href ? 'nav-link-activa' : ''}`}
        >
            {label}</Link>
    );
}

export default NavLink;