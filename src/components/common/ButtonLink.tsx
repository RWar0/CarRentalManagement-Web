import React from 'react'
import { Link, useLocation } from 'react-router';

import './stylesButtonLink.css';

type ButtonLinkProps = {
    title: string;
    page: string;
    icon?: string;
    onClick?: () => void;
};

export default function SideMenuButtonLink(props: ButtonLinkProps) {
    const pageLocation = useLocation();
    return (
        <Link
            className={`m-0 p-0 ${pageLocation.pathname === props.page ? 'buttonLink-active' : 'buttonLink-nonActive'}`}
            to={props.page}
            onClick={props.onClick}
        >
            {props.icon && (
                <span className="material-symbols-outlined text-black-50 pe-2 fs-3 myCategoryIcon">{props.icon}</span>
            )}
            {props.title}
        </Link>
    );
}

export function SmallSideMenuButtonLink(props: ButtonLinkProps) {
    const pageLocation = useLocation();
    return (
        <Link
            className={`p-0 ${pageLocation.pathname === props.page ? 'small-buttonLink-active' : 'small-buttonLink-nonActive'}`}
            to={props.page}
            onClick={props.onClick}
        >
            {props.icon && (
                <span className="material-symbols-outlined text-black-50 pe-2 fs-4 myCategoryIcon">{props.icon}</span>
            )}
            {props.title}
        </Link>
    );
}

export function TopMenuButtonLink(props: ButtonLinkProps) {
    const pageLocation = useLocation();
    return (
        <Link className={pageLocation.pathname == props.page ? 'topMenuButtonLink-active' : 'topMenuButtonLink-nonActive'} to={props.page}>
            {props.title}
        </Link>
    )
}

export function TopSubMenuButtonLink(props: ButtonLinkProps) {
    const pageLocation = useLocation();
    return (
        <Link className={pageLocation.pathname == props.page ? 'topSubMenuButtonLink-active' : 'topSubMenuButtonLink-nonActive'} to={props.page}>
            {props.title}
        </Link>
    )
}