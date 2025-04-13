import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import ServiceListComponent from '../../components/services/ServiceListComponent';
import { IService } from '../../interfaces/IService';
import { ApiService } from '../../classes/ApiService';

const ServiceList = () => {
    const [dataFromDb, setDataFromDb] = useState<IService[]>([]);
    const apiService = new ApiService("Services");

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IService[]>('Services'));
            } catch { }
        }
        fetch();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Services' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Service List'>
                            {dataFromDb.map((item) => (
                                <ServiceListComponent key={item.id} id={item.id} title={item.title} description={item.description} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Services' category='Service' />
        </>
    )
}

export default ServiceList