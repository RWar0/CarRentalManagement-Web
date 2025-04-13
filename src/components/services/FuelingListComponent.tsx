import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent'
import DeleteButtonComponent from '../common/DeleteButtonComponent'

type FuelingListComponentProps = {
    id: number,
    vehicleId: number,
    vehicleName: string,
    date: string,
    quantity: number,
    price?: number,
}

const FuelingListComponent = (props: FuelingListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>local_gas_station</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span>Vehicle: <span className='fw-bolder'>{props.vehicleName} <span className='fw-medium text-black-50'>(#{props.vehicleId})</span></span></span>
                <span>Date: <span className='fw-bolder'>{props.date}</span></span>
                <span>Fuel: <span className='fw-bolder'>{props.quantity}<span className='fw-medium text-black-50'>L</span>
                {props.price && (
                    <span> {String.fromCharCode(8594)} {props.price}<span className='fw-medium text-black-50'>$</span></span>
                )}
                </span></span>
            </div>
            <div className='ps-4'>
                <EditButtonComponent id={props.id} category='Services' page='EditFueling' />
                <DeleteButtonComponent id={props.id} apiPage='Fuelings' />
            </div>
        </div>
    )
}

export default FuelingListComponent