import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import InvoiceListComponent from '../../components/rentals/InvoiceListComponent';
import { IInvoice } from '../../interfaces/IInvoice';
import { ApiService } from '../../classes/ApiService';


const Invoices = () => {
    const apiService = new ApiService('Invoices');
    const [dataFromDb, setDataFromDb] = useState<IInvoice[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IInvoice[]>(`/Invoices`));
            }
            catch { }
        }
        fetch();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Rentals' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Invoices List'>
                            {dataFromDb.map((item) => (
                                <InvoiceListComponent key={item.id} id={item.id} date={item.invoiceDate} invoiceTitle={item.title} rentalId={item.rentalId} price={item.price} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Rentals' category='Invoice' />
        </>
    )
}

export default Invoices