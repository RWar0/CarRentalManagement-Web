import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import './stylesVehicles.css';
import Card from '../../components/common/Card';
import CategoryListComponent from '../../components/vehicles/CategoryListComponent';
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import { IVehicleCategory } from '../../interfaces/IVehicleCategory';
import { ApiService } from '../../classes/ApiService';

const VehicleCategories = () => {
    const apiService = new ApiService('Categories');
    const [dataFromDb, setDataFromDb] = useState<IVehicleCategory[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IVehicleCategory[]>(`/VehicleCategies`));
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
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Category List'>
                            {dataFromDb.map((item) => (
                                <CategoryListComponent key={item.id} id={item.id} categoryName={item.title} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Vehicles' category='Category' />
        </>
    )
}

export default VehicleCategories