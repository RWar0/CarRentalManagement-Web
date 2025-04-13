import React, { useEffect, useState } from 'react'
import EditButtonComponent from '../common/EditButtonComponent';
import DeleteButtonComponent from '../common/DeleteButtonComponent';
import { ApiService } from '../../classes/ApiService';

const FinalizeButtonComponent = ({ id }: { id: number }) => {
    const apiService = new ApiService('Payment');

    async function handleDeleteButton() {
        try {
            await apiService.put(`Payments/Finalize/${id}`)
                .then(() => window.location.reload());
        } catch { }
    }
    return (
        <button className='positiveOnListButton' onClick={() => handleDeleteButton()}>Finalize</button>
    )
}

type PaymentListComponentProps = {
    id: number,
    invoiceTitle: string,
    invoiceId: number,
    price: number,
    finalizationDate?: string,
    isFinalized: boolean,
}

const PaymentListComponent = (props: PaymentListComponentProps) => {
    const [colorOfComponent, setColorOfComponent] = useState('');

    useEffect(() => {
        setColorOfComponent(props.isFinalized ? 'var(--additionalColor1)' : 'var(--additionalColor2)')
    }, []);

    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: colorOfComponent }}>Payments</span>
            <h4 style={{ color: colorOfComponent }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <span className='d-flex align-items-center'>Invoice: <span className='fw-bolder ps-1' style={{ color: 'var(--mainColor1)', fontSize: '18px' }}>{props.invoiceTitle}</span><span className='ps-1 fw-medium fs-6 text-black-50'>(#{props.invoiceId})</span></span>
                <span>Price: <span className='fw-bolder'>{props.price}<span className='fw-medium text-black-50'>$</span></span></span>

                {props.isFinalized && (
                    <span className='d-flex align-items-center'>
                        <span className="material-symbols-outlined pe-1 ps-1" style={{ color: "rgb(47, 203, 0)" }}>check_circle</span>
                        Finalized
                        {props.finalizationDate && (
                            <span className='fw-bolder text-black-50 ps-1'> - {props.finalizationDate}</span>
                        )}
                    </span>
                )}
            </div>
            <div className='ps-4'>
                <EditButtonComponent id={props.id} category='Rentals' page='EditPayment' />
                <DeleteButtonComponent id={props.id} apiPage='Payments' />
                {!props.isFinalized && (
                    <FinalizeButtonComponent id={props.id} />
                )}
            </div>
        </div>
    )
}

export default PaymentListComponent