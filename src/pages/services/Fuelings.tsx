import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import FuelingListComponent from '../../components/services/FuelingListComponent';
import { IFueling } from '../../interfaces/IFueling';
import { ApiService } from '../../classes/ApiService';


const Fuelings = () => {
    const apiService = new ApiService("Fuelings");
    const [dataFromDb, setDataFromDb] = useState<IFueling[]>([]);


    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IFueling[]>('Fuelings'));
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
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Fueling List'>
                            {dataFromDb.map((item) => (
                                <FuelingListComponent key={item.id} id={item.id} vehicleId={item.vehicleId} vehicleName={item.vehicleName} date={item.fuelingDate} quantity={item.quantity} price={item.price} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Services' category='Fueling' />
        </>
    )
}

export default Fuelings