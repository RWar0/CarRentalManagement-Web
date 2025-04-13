import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import WarningListComponent from '../../components/customers/WarningListComponent';
import { IWarning } from '../../interfaces/IWarning';
import { ApiService } from '../../classes/ApiService';

const CustomerWarnings = () => {
    const apiService = new ApiService('Warnings');
    const [dataFromDb, setDataFromDb] = useState<IWarning[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IWarning[]>(`/Warnings`));
            }
            catch { }
        }
        fetch();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Customers' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Warning List'>
                            {dataFromDb.map((item) => (
                                <WarningListComponent key={item.id} id={item.id} customerId={item.customerId} customerName={item.customerName} description={item.description} date={item.warningDate} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Customers' category='Warning' />
        </>
    )
}

export default CustomerWarnings