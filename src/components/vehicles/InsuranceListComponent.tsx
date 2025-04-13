import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent'
import DeleteButtonComponent from '../common/DeleteButtonComponent'

type InsuranceListComponentProp = {
    id: number,
    vehicleName: string,
    vehicleId: number,
    beginDate: string,
    endDate: string,
}

const InsuranceListComponent = (props: InsuranceListComponentProp) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>assured_workload</span>
            <span className='fw-bolder ps-2 fs-4' style={{ color: 'var(--additionalColor1)' }}>#{props.id}</span>

            <div className="d-flex flex-column ps-4">
                <h5 className='m-0 p-0'>{props.vehicleName} <span className='ps-1 fw-medium fs-5 text-black-50'>(#{props.vehicleId})</span></h5>
                <span className='m-0 p-0 d-flex align-items-center'>Dates: <h6 className='d-flex align-items-center pt-2 ps-2'>{props.beginDate} - {props.endDate}</h6></span>
            </div>
            <div className='ps-4'>
            <EditButtonComponent id={props.id} category='Vehicles' page='EditInsurane' />
            <DeleteButtonComponent id={props.id} apiPage='Insurances' />
            </div>
        </div>
    )
}

export default InsuranceListComponent