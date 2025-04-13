import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import VehicleInformationCardComponent from '../../components/vehicles/VehicleInformationCardComponent';
import { useParams } from 'react-router';
import { IServiceOfVehicle } from '../../interfaces/IVehicleService';
import VehicleServiceListComponents from '../../components/services/VehicleServiceListComponents';
import { ApiService } from '../../classes/ApiService';

const ServicesOfVehicle = () => {
    const { id } = useParams();
    const [dataFromDb, setDataFromDb] = useState<IServiceOfVehicle[]>([]);
    const apiService = new ApiService("Services of Vehicle");

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IServiceOfVehicle[]>(`Services/ServicesOfVehicle/${id}`));
            } catch { }
        }
        fetch();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Services of Vehicle' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Services of Vehicle'>
                            <VehicleInformationCardComponent id={Number(id)} />
                            <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Service List'>
                                {dataFromDb.map((item) => (
                                    <VehicleServiceListComponents
                                        key={item.id}
                                        id={item.id}
                                        serviceId={item.serviceId}
                                        serviceTitle={item.title}
                                        serviceDescription={item.description}
                                        serviceDate={item.serviceDate}
                                    />
                                ))}
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Services' category='VehicleService' additionalOptions={`?vehicleId=${id}`} />
        </>
    )
}

export default ServicesOfVehicle