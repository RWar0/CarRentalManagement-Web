import React from 'react'
import { Link } from 'react-router';

import "./stylesSubmenu.css";

type AddItemButtonProps = {
    page: string;
    category: string;
    additionalOptions?: string;
}

const AddItemButtonComponent = (props: AddItemButtonProps) => {
    return (
        <div className="m-0 p-0" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <div className="m-0 p-0">
                <Link to={`/${props.page}/${props.category}Create${props.additionalOptions ?? ""}`} className='p-3 add-item-submenu-button'>
                    <span className="sumbenu-bar"></span>
                    <span className="sumbenu-bar"></span>
                </Link>
            </div>
        </div>
    );
}

export default AddItemButtonComponent