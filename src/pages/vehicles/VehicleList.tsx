import React, { useEffect, useState } from 'react'
import Card from '../../components/common/Card'
import PageHeader from '../../components/common/PageHeader'
import CarListComponent from '../../components/vehicles/CarListComponent'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import { IVehicle } from '../../interfaces/IVehicle';
import { ApiService } from '../../classes/ApiService';

const VehicleList = () => {
    const apiService = new ApiService('Vehicles');
    const [dataFromDb, setDataFromDb] = useState<IVehicle[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IVehicle[]>(`/Vehicles`));
            }
            catch { }
        }
        fetch();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Vehicles' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Vehicles List'>

                            {dataFromDb.map((item) => (
                                <CarListComponent key={item.id} id={item.id} brand={item.brand} model={item.model} production={item.production} category={item.categoryName ?? ""} color={item.color} />
                            ))}

                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Vehicles' category='Vehicle' />
        </>
    )
}

export default VehicleList