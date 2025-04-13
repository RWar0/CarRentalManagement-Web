import React, { useState } from 'react'

import "./stylesSubmenu.css";

const Submenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="m-0 p-0" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <div className="m-0 p-0">
                <button className={`p-3 sumbenu-button ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                    <span className="sumbenu-bar"></span>
                    <span className="sumbenu-bar"></span>
                    <span className="sumbenu-bar"></span>
                </button>
            </div>
        </div>
    );
}

export default Submenu