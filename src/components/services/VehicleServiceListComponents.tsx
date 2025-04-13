import React, { ReactNode } from 'react'
import { Link } from 'react-router';
import EditButtonComponent from '../common/EditButtonComponent';
import DeleteButtonComponent from '../common/DeleteButtonComponent';

const AddServiceForSpecificVehicleButtonComponent = ({ id }: { id: number }) => {
    return (
        <Link className='positiveOnListButton' to={`/Services/VehicleServiceCreate?vehicleId=${id}`}>
            Add service
        </Link>
    )
}

type ServicedVehicleItemListComponentProps = {
    id: number;
    vehicleId: number;
    vehicleName: string;
    vehicleProduction: number;
    serviceDate: string;
}

export const ServicedVehicleItemListComponent = (props: ServicedVehicleItemListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>build_circle</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3 fs-6">
                <span className='fw-bolder fs-5'>{props.vehicleName} <span className='fw-medium'>- {props.vehicleProduction}</span> <span className='fw-medium text-black-50'>(#{props.vehicleId})</span></span>
                <span className='fw-normal'>Date: <span className='fw-medium'>{props.serviceDate}</span></span>
            </div>
            <div className='ps-4'>
                <EditButtonComponent id={props.id} category='Services' page='EditVehicleService' />
                <DeleteButtonComponent id={props.id} apiPage='VehicleServices' />
            </div>
        </div>
    );
}


type VehicleItemListComponentProp = {
    vehicleId: number,
    vehicleName: string,
    vehicleCategory: string,
    vehicleProduction: number,
    vehicleColor: string,
    children: ReactNode
}

export const VehicleItemListComponent = (props: VehicleItemListComponentProp) => {
    return (
        <div className='mb-3'>
            <div className="m-0 p-0 ps-2 pt-1 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom" style={{ backgroundColor: 'var(--additionalLightColor1)', borderRadius: '20px 0px 20px 0px'}}>
                <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>directions_car</span>
                <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.vehicleId}</h4>
                <div className="d-flex flex-column fw-medium ps-3">
                    <h5 className='m-0 p-0'>{props.vehicleName} - ({props.vehicleCategory})</h5>
                    <span className='fw-semibold'>{props.vehicleProduction}<span className='fw-normal'>, color: {props.vehicleColor ?? "N/A"}</span></span>
                </div>

                <div className='ps-4'>
                    <AddServiceForSpecificVehicleButtonComponent id={props.vehicleId} />
                </div>
            </div>
            <div className="m-0 p-0 ms-5">
                {props.children}
            </div>
        </div>
    )
}

type VehicleServiceListComponentsProp = {
    id: number,
    serviceId: number,
    serviceTitle: string,
    serviceDescription?: string,
    serviceDate: string,
}


const VehicleServiceListComponents = (props: VehicleServiceListComponentsProp) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-3 pe-2" style={{ color: 'var(--additionalColor1)' }}>settings_b_roll</span>
            <h5 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h5>
            <div className="d-flex flex-column fw-medium ps-3 fs-6">
                <span className='fw-normal'>Service title: <span className='fw-bolder' style={{ color: 'var(--mainColor2)' }}>{props.serviceTitle}</span> <span className='fw-normal text-black-50'>(#{props.serviceId})</span></span>
                {props.serviceDescription && (
                    <span className='fw-normal text-wrap text-black' style={{ maxWidth: '700px', fontSize: '14px' }}>{props.serviceDescription}</span>
                )}
                <span className='fw-normal'>Date: <span className='fw-medium'>{props.serviceDate}</span></span>
            </div>
            <div className='ps-4'>
                <EditButtonComponent id={props.id} category='Services' page='EditVehicleService' />
                <DeleteButtonComponent id={props.id} apiPage='VehicleServices' />
            </div>
        </div>
    )
}

export default VehicleServiceListComponents