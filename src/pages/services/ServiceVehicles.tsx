import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import VehicleServiceListComponents, { VehicleItemListComponent } from '../../components/services/VehicleServiceListComponents';
import { IVehicleServiceBase, IVehicleService } from '../../interfaces/IVehicleService';
import { IVehicle } from '../../interfaces/IVehicle';
import { IService, IServiceWithDate } from '../../interfaces/IService';
import { ApiService } from '../../classes/ApiService';

const ServiceVehicles = () => {
    const [dataFromDb, setDataFromDb] = useState<IVehicleServiceBase[]>([]);
    const [outputData, setOutputData] = useState<IVehicleService[]>([]);

    const [vehiclesList, setVehiclesList] = useState<IVehicle[]>([]);
    const [servicesList, setServicesList] = useState<IService[]>([]);

    const apiService = new ApiService('Vehicle Services');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [services, vehicles, vehicleServices] = await Promise.all([
                    apiService.get<IService[]>(`Services`),
                    apiService.get<IVehicle[]>(`Vehicles`),
                    apiService.get<IVehicleServiceBase[]>(`VehicleServices`)
                ]);

                setServicesList(services);
                setVehiclesList(vehicles);
                setDataFromDb(vehicleServices);
            } catch { }
        };

        fetchAll();
    }, []);

    useEffect(() => {
        const transformData = (): IVehicleService[] => {
            return vehiclesList.map((vehicle) => {
                const vehicleServices = dataFromDb.filter((dbItem) => dbItem.vehicleId === vehicle.id);

                const servicesWithDate: IServiceWithDate[] = vehicleServices
                    .map((dbItem) => {
                        const service = servicesList.find((s) => s.id === dbItem.serviceId);
                        if (!service) return null;

                        const serviceWithDate: IServiceWithDate = {
                            id: dbItem.id,
                            serviceId: dbItem.serviceId,
                            title: service.title,
                            serviceDate: dbItem.serviceDate,
                        };

                        if (service.description !== undefined) {
                            serviceWithDate.description = service.description;
                        }

                        return serviceWithDate;
                    })
                    .filter((service): service is IServiceWithDate => service !== null);

                return {
                    id: vehicle.id,
                    vehicle: vehicle,
                    services: servicesWithDate,
                };
            });
        };

        setOutputData(transformData());
    }, [dataFromDb, vehiclesList, servicesList]);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Services' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Services of vehicles'>
                            {outputData.map(item => (
                                <VehicleItemListComponent
                                    key={item.vehicle.id}
                                    vehicleId={item.vehicle.id}
                                    vehicleName={`${item.vehicle.brand} ${item.vehicle.model}`}
                                    vehicleCategory={item.vehicle.categoryName}
                                    vehicleProduction={item.vehicle.production}
                                    vehicleColor={item.vehicle.color ?? ""}
                                >

                                    {item.services
                                        .sort((a, b) => b.id - a.id)
                                        .map(service => (
                                            <VehicleServiceListComponents
                                                key={service.id}
                                                id={service.id}
                                                serviceId={service.serviceId}
                                                serviceTitle={service.title}
                                                serviceDescription={service.description}
                                                serviceDate={service.serviceDate}
                                            />
                                        ))}

                                </VehicleItemListComponent>
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Services' category='VehicleService' />
        </>
    )
}

export default ServiceVehicles