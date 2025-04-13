import React, { useEffect, useRef, useState } from 'react';
import SideMenuButtonLink, { SmallSideMenuButtonLink, TopMenuButtonLink, TopSubMenuButtonLink } from './ButtonLink';
import PagesList from '../../pages/PagesList';
import './stylesSubmenu.css';

function TopMenu() {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [isSideMenuOffcanvasVisible, setIsSideMenuOffcanvasVisible] = useState<boolean>(false);
    const collapseButtonRef = useRef<HTMLButtonElement>(null);

    const handleCategoryClick = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    function handleClosingCollapse() {
        if (isSideMenuOffcanvasVisible) {
            collapseButtonRef.current?.click();
            setIsSideMenuOffcanvasVisible(false);
        }
    }

    function toggleSideMenuOffcanvasVisibility() {
        setIsSideMenuOffcanvasVisible(prev => !prev);
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 767 && isSideMenuOffcanvasVisible) {
                handleClosingCollapse();
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isSideMenuOffcanvasVisible]);

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-md" style={{ backgroundColor: 'var(--mainColor1)', borderBottom: '1.4px solid green', minHeight: '57px' }}>
                <div className="container-fluid">
                    <span className='m-0 p-0 text-white pt-1'>
                        <a className='d-flex justify-content-center align-items-center text-decoration-none text-white' href="/">
                            <span className="material-symbols-outlined text-black-50 fs-3">assured_workload</span>
                            <h4 className='m-0 p-0 ps-3 pe-3' style={{ fontFamily: '"Quantico", sans-serif', fontSize: '33px', letterSpacing: '2px', fontWeight: 'bold' }}>Car Rental</h4>
                            <span className="material-symbols-rounded text-black-50 fs-3">garage</span>
                        </a>
                    </span>
                    <button ref={collapseButtonRef} onClick={toggleSideMenuOffcanvasVisibility} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#topSideMenuOffCanvas" aria-controls="topSideMenuOffCanvas">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse fw-semibold">
                        <ul className="navbar-nav">
                            {PagesList.map((item, index) => (
                                <li key={index} className="m-0 p-0 nav-item dropdown">
                                    {item.categories ? (
                                        <>
                                            <a className="nav-link dropdown-toggle topMenuDropDownButton" href="#" id={`navbarDropdown${index}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {item.title}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby={`navbarDropdown${index}`}>
                                                {item.categories.map((category, categoryIndex) => (
                                                    <li key={categoryIndex}>
                                                        <TopSubMenuButtonLink title={category.categoryTitle} page={`${item.page}/${category.categoryPage ?? category.categoryTitle}`} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <span className="ms-0 ps-0 nav-link text-white">
                                            <TopMenuButtonLink title={item.title} page={item.page} />
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end hidden" tabIndex={-1} id="topSideMenuOffCanvas" aria-labelledby="offcanvasExampleLabel" style={{ maxWidth: '70%', backgroundColor: 'var(--mainColor1)', opacity: '0.9' }}>
                <div className="m-3 mt-2">
                    <button data-bs-dismiss="offcanvas" className='d-flex align-items-center justify-content-center m-0 p-0 closeSideMenuOffCanvasBtn'>
                        <span className="material-symbols-outlined m-0 p-1">arrow_forward_ios</span>
                    </button>
                </div>
                <div className="offcanvas-body m-0 p-0">
                    <div className="container d-flex align-items-center flex-column gap-3 m-0 p-0 flex-grow-1">
                        {PagesList.map((item, index) => (
                            <div key={index}>
                                {item.categories ? (
                                    <div>
                                        <button className='buttonLink-nonActive' style={{ border: 'none', textAlign: 'center' }} onClick={() => handleCategoryClick(item.page)}>
                                            <span className="material-symbols-outlined text-black-50 pe-2 fs-3 myCategoryIcon">{item.icon}</span>
                                            {item.title}
                                            <span className={`material-symbols-outlined myRolldownIcon${openCategory === item.page ? "-opened" : ""}`} style={{ transform: 'translateX(4px)' }}>
                                                keyboard_arrow_left
                                            </span>
                                        </button>
                                        <div className={`collapse ${openCategory === item.page ? 'show' : ''}`}>
                                            {item.categories.map((category, categoryIndex) => (
                                                <SmallSideMenuButtonLink onClick={handleClosingCollapse} key={categoryIndex} title={category.categoryTitle} page={`${item.page}/${category.categoryPage ?? category.categoryTitle}`} icon={category.categoryImage} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <SideMenuButtonLink title={item.title} page={item.page} icon={item.icon} onClick={handleClosingCollapse} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopMenu;
