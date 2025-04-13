import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import FuelingListComponent from '../../components/services/FuelingListComponent';
import { IFueling } from '../../interfaces/IFueling';
import { useParams } from 'react-router';
import VehicleInformationCardComponent from '../../components/vehicles/VehicleInformationCardComponent';
import { ApiService } from '../../classes/ApiService';


const FuelingsOfVehicle = () => {
    const { id } = useParams();
    const [dataFromDb, setDataFromDb] = useState<IFueling[]>([]);
    const apiService = new ApiService("Fuelings of Vehicle");

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IFueling[]>(`/Fuelings/FuelingsOfVehicle/${id}`));
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
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Fuelings of Vehicle'>
                            <VehicleInformationCardComponent id={Number(id)} />
                            <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Fueling List'>
                                {dataFromDb.map((item) => (
                                    <FuelingListComponent key={item.id} id={item.id} vehicleId={item.vehicleId} vehicleName={item.vehicleName} date={item.fuelingDate} quantity={item.quantity} price={item.price} />
                                ))}
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Services' category='Fueling' additionalOptions={`?vehicleId=${id}`} />
        </>
    )
}
export default FuelingsOfVehicle