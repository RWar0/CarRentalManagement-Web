import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent'
import DeleteButtonComponent from '../common/DeleteButtonComponent'

type CategoryListComponentProp = {
    id: number,
    categoryName: string,
}

const CategoryListComponent = (props: CategoryListComponentProp) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>help</span>

            <div className="d-flex flex-column">
                <h5 className='m-0 p-0'><span className='fw-bolder fs-4 pe-3' style={{ color: 'var(--additionalColor1)' }}>#{props.id}</span>{props.categoryName}</h5>
            </div>
            <div className='ps-4'>
                <EditButtonComponent id={props.id} category='Vehicles' page='EditCategory' />
                <DeleteButtonComponent id={props.id} apiPage='VehicleCategies' />
            </div>
        </div>
    )
}

export default CategoryListComponent