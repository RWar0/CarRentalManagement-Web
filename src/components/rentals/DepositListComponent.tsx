import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import DeleteButtonComponent from '../common/DeleteButtonComponent';
import ActionsButtonComponent, { ActionButtonSubmenuComponent } from '../common/ActionsButtonComponent';
import { ApiService } from '../../classes/ApiService';


type EditButtonComponentProps = {
    id: number;
    rentalId: number;
}

const EditButtonComponent = (props: EditButtonComponentProps) => {
    return (
        <Link className='editVehicleOnListButton' to={`/Rentals/EditDeposit/${props.id}?rentalId=${props.rentalId}`}>
            Edit
        </Link>
    )
}

async function handleReturnDepositButton({ id }: { id: number }) {
    const apiService = new ApiService('Deposits');
    try {
        await apiService.put(`/Deposits/${id}/return`)
            .then(() => window.location.reload());
    }
    catch { }
}

async function handleKeepDepositButton({ id }: { id: number }) {
    const apiService = new ApiService('Deposits');
    try {
        await apiService.put(`/Deposits/${id}/keep`)
            .then(() => window.location.reload());
    }
    catch { }
}

type DepositListComponentProp = {
    id: number,
    rentalId: number,
    rentalBeginDate: string,
    rentalEndDate: string,
    customerName: string,
    customerId: number,
    vehicleId: number,
    vehicleName: string,
    price: number,
    status: string,
}


const DepositListComponent = (props: DepositListComponentProp) => {
    const [statusColor, setStatusColor] = useState('black');

    useEffect(() => {
        if (props.status === "Returned") setStatusColor("rgb(25, 213, 0)");
        else if (props.status === "Kept") setStatusColor("rgb(223, 53, 10)");
        else setStatusColor("rgb(26, 174, 162)");
    }, []);

    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>paid</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span>Rental_ID: <span className='fw-bolder fs-5' style={{ color: 'var(--mainColor1)' }}>#{props.rentalId}</span>, dates: <span className='fw-bolder'>{props.rentalBeginDate}</span> to <span className='fw-bolder'>{props.rentalEndDate}</span></span>
                <span>Information: <span className='fw-bolder'>{props.customerName} <span className='fw-medium text-black-50'>(#{props.customerId})</span></span> {String.fromCharCode(8594)} <span className='fw-bolder'>{props.vehicleName} <span className='fw-medium text-black-50'>(#{props.vehicleId})</span></span></span>
                <span>Price: <span className='fw-bolder'>{props.price}<span className='fw-medium text-black-50'>$</span></span></span>
                <span>Status: <span className='fw-bolder' style={{ color: statusColor }}>{props.status}</span></span>
            </div>
            <div className='ps-4'>
                <EditButtonComponent id={props.id} rentalId={props.rentalId} />
                <DeleteButtonComponent id={props.id} apiPage='Deposits' />
            </div>
        </div>
    )
}

type CurrentDepositListComponentProp = {
    id: number,
    rentalId: number,
    rentalBeginDate: string,
    rentalEndDate: string,
    customerName: string,
    customerId: number,
    vehicleId: number,
    vehicleName: string,
    price: number,
}

export const CurrentDepositListComponent = (props: CurrentDepositListComponentProp) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor2)' }}>paid</span>
            <h4 style={{ color: 'var(--additionalColor2)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span>Rental_ID: <span className='fw-bolder fs-5' style={{ color: 'var(--mainColor1)' }}>#{props.rentalId}</span>, dates: <span className='fw-bolder'>{props.rentalBeginDate}</span> to <span className='fw-bolder'>{props.rentalEndDate}</span></span>
                <span>Rental: <span className='fw-bolder'>{props.customerName} <span className='fw-medium text-black-50'>(#{props.customerId})</span></span> {String.fromCharCode(8594)} <span className='fw-bolder'>{props.vehicleName} <span className='fw-medium text-black-50'>(#{props.vehicleId})</span></span></span>
                <span>Price: <span className='fw-bolder'>{props.price}<span className='fw-medium text-black-50'>$</span></span></span>
            </div>
            <div className='ps-4'>
                <ActionsButtonComponent buttonTitle='Actions'>
                    <ActionButtonSubmenuComponent subButtonTitle='Return deposit' onClickMethod={() => handleReturnDepositButton({ id: props.id })} />
                    <ActionButtonSubmenuComponent subButtonTitle='Keep deposit' onClickMethod={() => handleKeepDepositButton({ id: props.id })} />
                </ActionsButtonComponent>

                <EditButtonComponent id={props.id} rentalId={props.rentalId} />
                <DeleteButtonComponent id={props.id} apiPage='Deposits' />
            </div>
        </div>
    )
}

export default DepositListComponent