import React from 'react'

type propType = {
  title: string;
}

function PageHeader(prop: propType) {
  return (
    <>
      <div className='d-block d-md-block d-lg-block d-xl-none' style={{ height: '57px' }} />
      <div className='d-none d-md-block d-lg-block bg-white pt-2 pb-1 m-0 text-center'>
        <h3 className='m-0 p-0 pb-1' style={{ color: 'var(--additionalColor4', fontWeight: 'bold', letterSpacing: '2px', textShadow: '1px 1px 2px var(--additionalColor1)' }}>{prop.title}</h3>
      </div>
    </>
  )
}

export default PageHeader