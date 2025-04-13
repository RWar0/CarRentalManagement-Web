import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import ServiceInformationCardComponent from '../../components/services/ServiceInformationCardComponent';
import { useParams } from 'react-router';
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import { ServicedVehicleItemListComponent } from '../../components/services/VehicleServiceListComponents';
import { IServicedVehicle } from '../../interfaces/IVehicleService';
import { ApiService } from '../../classes/ApiService';

const ServicedVehicles = () => {
    const { id } = useParams();
    const [dataFromDb, setDataFromDb] = useState<IServicedVehicle[]>([]);
    const apiService = new ApiService("Serviced Vehicles");
    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IServicedVehicle[]>(`Vehicles/ServicedVehicles/${id}`));
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
                            <ServiceInformationCardComponent id={Number(id)} />
                            <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Serviced Vehicles List'>
                                {dataFromDb.map((item) => (
                                    <ServicedVehicleItemListComponent key={item.id} id={item.id} vehicleId={item.vehicleId} vehicleName={item.vehicleName} vehicleProduction={item.vehicleProduction} serviceDate={item.serviceDate} />
                                ))}
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>

            <AddItemButtonComponent page='Services' category='VehicleService' additionalOptions={`?serviceId=${id}`} />
        </>
    )
}

export default ServicedVehicles