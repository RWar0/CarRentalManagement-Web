import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent'
import DeleteButtonComponent from '../common/DeleteButtonComponent'
import ActionsButtonComponent, { ActionButtonSubmenuComponent } from '../common/ActionsButtonComponent'

type InvoiceListComponentProps = {
    id: number,
    invoiceTitle: string,
    rentalId: number,
    price: number,
    date: string,
}

export const InvoiceListComponentWithoutButtons = (props: InvoiceListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>demography</span>
            <span className='fw-bolder pe-2 fs-4' style={{ color: 'var(--additionalColor1)' }}>#{props.id}</span>

            <div className="d-flex flex-column fw-medium ps-3">
                <span className='fs-5 fw-bolder'>{props.invoiceTitle}</span>
                <span className=''>Item as Rental_ID: <span className='fw-bolder fs-5' style={{ color: 'var(--mainColor1)' }}>#{props.rentalId}</span></span>
                <span className=''>Price: <span className='fw-bolder'>{props.price}</span><span className='text-black-50'> $</span></span>
                <span className=''>Date: <span className='fw-bolder'>{props.date}</span></span>
            </div>
        </div>
    )
}

const InvoiceListComponent = (props: InvoiceListComponentProps) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>demography</span>
            <span className='fw-bolder pe-2 fs-4' style={{ color: 'var(--additionalColor1)' }}>#{props.id}</span>

            <div className="d-flex flex-column fw-medium ps-3">
                <span className='fs-5 fw-bolder'>{props.invoiceTitle}</span>
                <span className=''>Item as Rental_ID: <span className='fw-bolder fs-5' style={{ color: 'var(--mainColor1)' }}>#{props.rentalId}</span></span>
                <span className=''>Price: <span className='fw-bolder'>{props.price}</span><span className='text-black-50'> $</span></span>
                <span className=''>Date: <span className='fw-bolder'>{props.date}</span></span>
            </div>

            <div className='ps-4'>
                <ActionsButtonComponent buttonTitle='Check'>
                    <ActionButtonSubmenuComponent subButtonTitle="Invoice's payments" onClickMethod={() => window.location.href = `/Rentals/PaymentsOfInvoice/${props.id}`} />
                </ActionsButtonComponent>

                <EditButtonComponent id={props.id} category='Rentals' page='EditInvoice' />
                <DeleteButtonComponent id={props.id} apiPage='Invoices' />
            </div>
        </div>
    )
}

export default InvoiceListComponent