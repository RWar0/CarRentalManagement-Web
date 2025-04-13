import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent'
import DeleteButtonComponent from '../common/DeleteButtonComponent'
import ActionsButtonComponent, { ActionButtonSubmenuComponent } from '../common/ActionsButtonComponent'

type DepositListComponentProp = {
    id: number,
    title: string,
    description?: string,
}

export const ServiceListComponentWithoutButtons = (props: DepositListComponentProp) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>settings_b_roll</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span className='fs-5 fw-bolder'>{props.title}</span>
                {props.description && (
                    <span className='fw-normal text-wrap text-black' style={{ maxWidth: '700px' }}>{props.description}</span>
                )}
            </div>
        </div>
    )
}

const ServiceListComponent = (props: DepositListComponentProp) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>settings_b_roll</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span className='fs-5 fw-bolder'>{props.title}</span>
                {props.description && (
                    <span className='fw-normal text-wrap text-black' style={{ maxWidth: '700px' }}>{props.description}</span>
                )}
            </div>
            <div className='ps-4'>
                <ActionsButtonComponent buttonTitle='Check'>
                    <ActionButtonSubmenuComponent subButtonTitle='Serviced Vehicles' onClickMethod={() => window.location.href = `/Services/ServicedVehicles/${props.id}`} />
                </ActionsButtonComponent>

                <EditButtonComponent id={props.id} category='Services' page='EditService' />
                <DeleteButtonComponent id={props.id} apiPage='Services' />
            </div>
        </div>
    )
}

export default ServiceListComponent