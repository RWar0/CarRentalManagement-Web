import React, { useEffect, useState } from 'react'
import SideMenuButtonLink, { SmallSideMenuButtonLink } from './ButtonLink';
import PagesList from '../../pages/PagesList';

function SideMenu() {
  const [currentTime, setCurrentTime] = useState<string | null>(new Date().toLocaleTimeString());
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const handleCategoryClick = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className='d-flex flex-column text-center' style={{ minHeight: '100%', backgroundColor: 'var(--additionalColor1)', borderRight: '1px solid #E8FCCF' }}>
      <span className='d-flex justify-content-center align-items-center m-0 p-0 text-white pb-1 pt-1'>
        <a className='text-decoration-none text-white d-flex justify-content-center align-items-center' href="/">
          <span className="material-symbols-outlined text-black-50 fs-3">assured_workload</span>
          <h4 className='m-0 p-0 ps-3 pe-3' style={{ fontFamily: '"Quantico", sans-serif', fontSize: '33px', letterSpacing: '2px', fontWeight: 'bold' }}>Car Rental</h4>
          <span className="material-symbols-rounded text-black-50 fs-3">garage</span>
        </a>
      </span>
      <div className='container d-flex flex-column m-0 p-0 pt-2 pb-5 flex-grow-1' style={{ borderRadius: '0 0 0 0', backgroundColor: 'var(--mainColor1)' }}>
        <div className="m-0 p-0">
          <p className='m-0 p-0 pb-2 fw-semibold text-white' style={{ fontFamily: '"Quantico", sans-serif', fontSize: '20px' }}>{currentTime}</p>
        </div>

        <div className="d-flex flex-column align-items-center gap-2 pt-2">
          {PagesList.map((item, index) => (
            <div key={index}>

              {item.categories ? (
                <div>
                  <button className='buttonLink-nonActive' style={{ border: 'none', textAlign: 'center' }} onClick={() => handleCategoryClick(item.page)}>
                    <span className="material-symbols-outlined text-black-50 pe-2 fs-3 myCategoryIcon">{item.icon}</span>
                    {item.title}
                    <span className={`material-symbols-outlined myRolldownIcon${openCategory === item.page ? "-opened" : ""}`} style={{ transform: 'translateX(4px)' }}>keyboard_arrow_left</span>
                  </button>

                  <div className={`collapse ${openCategory === item.page ? 'show' : ''}`}>
                    {item.categories.map((category, categoryIndex) => (
                      <SmallSideMenuButtonLink key={categoryIndex} title={category.categoryTitle} page={`${item.page}/${category.categoryPage ?? category.categoryTitle}`} icon={category.categoryImage} />
                    ))}
                  </div>
                </div>
              ) : (<SideMenuButtonLink title={item.title} page={item.page} icon={item.icon} onClick={() => handleCategoryClick(item.page)} />)
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideMenu