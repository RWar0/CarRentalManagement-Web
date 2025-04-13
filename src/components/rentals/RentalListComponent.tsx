import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent';
import DeleteButtonComponent from '../common/DeleteButtonComponent';
import ActionsButtonComponent, { ActionButtonSubmenuComponent, ActionButtonSubmenuDividerComponent } from '../common/ActionsButtonComponent';


type RentalListComponentProps = {
    id: number,
    customerName: string,
    customerId: number,
    vehicleId: number,
    vehicleName: string,
    beginDate: string,
    endDate: string,
}

export const RentalListComponentWithoutButtons = (props: RentalListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>partner_exchange</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span>Customer: <span className='fw-bolder'>{props.customerName} <span className='fw-medium text-black-50'>(#{props.customerId})</span></span></span>
                <span>Vehicle: <span className='fw-bolder'>{props.vehicleName} <span className='fw-medium text-black-50'>(#{props.vehicleId})</span></span></span>
                <span>Dates: <span className='fw-bolder'>{props.beginDate}</span> to <span className='fw-bolder'>{props.endDate}</span></span>
            </div>
        </div>
    )
}

const RentalListComponent = (props: RentalListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>partner_exchange</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span>Customer: <span className='fw-bolder'>{props.customerName} <span className='fw-medium text-black-50'>(#{props.customerId})</span></span></span>
                <span>Vehicle: <span className='fw-bolder'>{props.vehicleName} <span className='fw-medium text-black-50'>(#{props.vehicleId})</span></span></span>
                <span>Dates: <span className='fw-bolder'>{props.beginDate}</span> to <span className='fw-bolder'>{props.endDate}</span></span>
            </div>
            <div className='ps-4'>
                <ActionsButtonComponent buttonTitle='Actions'>
                    <ActionButtonSubmenuComponent subButtonTitle="Add Invoice" onClickMethod={() => window.location.href = `/Rentals/InvoiceCreate?rentalId=${props.id}`} />
                    <ActionButtonSubmenuComponent subButtonTitle="Check Rental's Invoices" onClickMethod={() => window.location.href = `/Rentals/InvoicesOfRental/${props.id}`} />
                    <ActionButtonSubmenuDividerComponent />
                    <ActionButtonSubmenuComponent subButtonTitle="Add Deposit" onClickMethod={() => window.location.href = `/Rentals/DepositCreate?rentalId=${props.id}`} />
                    <ActionButtonSubmenuComponent subButtonTitle="Check Rental's Deposits" onClickMethod={() => window.location.href = `/Rentals/DepositsOfRental/${props.id}`} />
                </ActionsButtonComponent>
                
                <EditButtonComponent id={props.id} category='Rentals' page='EditRental' />
                <DeleteButtonComponent id={props.id} apiPage='Rentals' />
            </div>
        </div>
    )
}

export default RentalListComponent