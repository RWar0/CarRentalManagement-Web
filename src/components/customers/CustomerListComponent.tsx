import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent';
import DeleteButtonComponent from '../common/DeleteButtonComponent';
import ActionsButtonComponent, { ActionButtonSubmenuComponent } from '../common/ActionsButtonComponent';

type CustomerListComponentProps = {
    id: number,
    FirstName: string,
    LastName: string,
    DateOfBirth: string,
    PlaceOfBirth: string,
    Pesel: string,
}

export const CustomerListComponentWithoutButtons = (props: CustomerListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>account_circle</span>
            <span className='fw-bolder pe-2 fs-4' style={{ color: 'var(--additionalColor1)' }}>#{props.id}</span>

            <div className="d-flex flex-column fw-medium ps-3">
                <span className='fs-5 fw-bolder'>{props.FirstName} {props.LastName}</span>
                <span className='pt-1 pb-1'>Born: <span className='fw-bolder'>{props.DateOfBirth} <span className='fw-normal'>in</span> <span className='fw-medium text-black'>{props.PlaceOfBirth}</span></span></span>
                <span>Pesel: <span className='fw-bolder'>{props.Pesel}</span></span>
            </div>
        </div>
    )
}

const CustomerListComponent = (props: CustomerListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>account_circle</span>
            <span className='fw-bolder pe-2 fs-4' style={{ color: 'var(--additionalColor1)' }}>#{props.id}</span>

            <div className="d-flex flex-column fw-medium ps-3">
                <span className='fs-5 fw-bolder'>{props.FirstName} {props.LastName}</span>
                <span className='pt-1 pb-1'>Born: <span className='fw-bolder'>{props.DateOfBirth} <span className='fw-normal'>in</span> <span className='fw-medium text-black'>{props.PlaceOfBirth}</span></span></span>
                <span>Pesel: <span className='fw-bolder'>{props.Pesel}</span></span>
            </div>

            <div className='ps-4'>
                <ActionsButtonComponent buttonTitle='Check'>
                    <ActionButtonSubmenuComponent subButtonTitle="Customer's Rentals" onClickMethod={() => window.location.href = `/Rentals/RentalsOfCustomer/${props.id}`} />
                    <ActionButtonSubmenuComponent subButtonTitle="Customer's Warnings" onClickMethod={() => window.location.href = `/Customers/WarningsOfCustomer/${props.id}`} />
                </ActionsButtonComponent>

                <EditButtonComponent id={props.id} category='Customers' page='EditCustomer' />
                <DeleteButtonComponent id={props.id} apiPage='Customers' />
            </div>
        </div>
    )
}

export default CustomerListComponent