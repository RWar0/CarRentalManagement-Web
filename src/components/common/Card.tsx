import React, { ReactNode, useEffect, useState } from 'react'

type CardProps = {
    title: string;
    xs?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    colorOfBg?: string;
    colorOfTitle?: string;
    height?: string;
    children: ReactNode;
}

function Card(props: CardProps) {
    const [bgColor, setBgColor] = useState<string>("rgb(252, 252, 252)");
    const [titleColor, setTitleColor] = useState<string>("var(--mainColor1)");

    useEffect(() => {
        if (props.colorOfBg !== null) setBgColor(`${props.colorOfBg}`);
        if (props.colorOfTitle !== null) setTitleColor(`${props.colorOfTitle}`);
    }, []);

    return (
        <div className={`col-${props.xs ?? 12} col-md-${props.md ?? props.xs ?? 6} col-lg-${props.lg ?? props.md ?? 6} col-xl-${props.xl ?? 4} col-xxl-${props.xxl ?? props.xl ?? 4} m-0`} style={{ background: 'transparent' }}>
            <div className="rounded-1 mt-3 p-2 pt-0" style={{ backgroundColor: bgColor, maxWidth: '100vw', border: '1px solid rgb(232, 232, 232)', boxShadow: '2.9px 2.5px 5.8px hsl(0deg 0% 0% / 0.10)', minHeight: props.height ?? '0px' }}>
                <div className="fs-4 fw-bold ps-2 pb-1 pt-1 mt-0" style={{ color: titleColor, borderBottom: '1px solid rgb(240, 240, 240)' }}>{props.title}</div>
                {props.children}
            </div>
        </div>
    )
}

export default Card