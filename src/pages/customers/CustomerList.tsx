import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import CustomerListComponent from '../../components/customers/CustomerListComponent';
import { ICustomer } from '../../interfaces/ICustomer';
import { ApiService } from '../../classes/ApiService';

const CustomerList = () => {
    const apiService = new ApiService('Customers');
    const [dataFromDb, setDataFromDb] = useState<ICustomer[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<ICustomer[]>(`/Customers`));
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
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Customer List'>
                            {dataFromDb.map((item) => (
                                <CustomerListComponent key={item.id} id={item.id} FirstName={item.firstname} LastName={item.lastname} DateOfBirth={item.dateOfBirth} PlaceOfBirth={item.placeOfBirth} Pesel={item.pesel} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Customers' category='Customer' />
        </>
    )
}

export default CustomerList