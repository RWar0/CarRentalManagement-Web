import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent'
import DeleteButtonComponent from '../common/DeleteButtonComponent'

type WarningListComponentProps = {
    id: number,
    customerName: string,
    customerId: number,
    description: string,
    date: string,
}

const WarningListComponent = (props: WarningListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>warning</span>
            <span className='fw-bolder pe-2 fs-4' style={{ color: 'var(--additionalColor1)' }}>#{props.id}</span>

            <div className="d-flex flex-column fw-medium ps-3">
                <span className='fs-5 fw-bolder'>{props.customerName} <span className='fw-medium text-black-50'>(#{props.customerId})</span></span>
                <span className='pt-1 pb-1'>Date of warning: <span className='fw-bolder'>{props.date} </span></span>
                <span style={{ maxWidth: '900px', color: 'var(--additionalColor1)' }}>Description: <span className='fw-normal text-wrap text-black'>{props.description}</span></span>
            </div>

            <div className='ps-4'>
                <EditButtonComponent id={props.id} category='Customers' page='EditWarning' />
                <DeleteButtonComponent id={props.id} apiPage='Warnings' />
            </div>
        </div>
    )
}

export default WarningListComponent