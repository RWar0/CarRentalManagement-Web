import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import PaymentListComponent from '../../components/rentals/PaymentListComponent';
import { IPayment } from '../../interfaces/IPayment';
import { ApiService } from '../../classes/ApiService';

const Payments = () => {
    const apiService = new ApiService('Payments');
    const [notFinalizedPayments, setNotFinalizedPayments] = useState<IPayment[]>([]);
    const [finalizedPayments, setFinalizedPayments] = useState<IPayment[]>([]);

    useEffect(() => {
        const fetchNotFinalized = async () => {
            try {
                setNotFinalizedPayments(await apiService.get<IPayment[]>(`/Payments/NotFinalized`));
            }
            catch { }
        }
        const fetchFinalized = async () => {
            try {
                setFinalizedPayments(await apiService.get<IPayment[]>(`/Payments/Finalized`));
            }
            catch { }
        }

        fetchNotFinalized();
        fetchFinalized();
    }, []);


    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Rentals' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Not finalized payments'>
                            {notFinalizedPayments.filter(item => !item.isFinalized).map(item => (
                                <PaymentListComponent key={item.id} id={item.id} invoiceId={item.invoiceId} invoiceTitle={item.invoiceTitle} price={item.paymentTotal} isFinalized={item.isFinalized} />
                            ))}
                        </Card>

                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Finalized payments'>
                            {finalizedPayments.filter(item => item.isFinalized).map(item => (
                                <PaymentListComponent key={item.id} id={item.id} invoiceId={item.invoiceId} invoiceTitle={item.invoiceTitle} price={item.paymentTotal} isFinalized={item.isFinalized} finalizationDate={item.finalizationDate ?? ""} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Rentals' category='Payment' />
        </>
    )
}

export default Payments