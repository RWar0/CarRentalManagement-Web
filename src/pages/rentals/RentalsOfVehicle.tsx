import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import RentalListComponent from '../../components/rentals/RentalListComponent';
import { IRental } from '../../interfaces/IRental';
import { useParams } from 'react-router';
import VehicleInformationCardComponent from '../../components/vehicles/VehicleInformationCardComponent';
import { ApiService } from '../../classes/ApiService';

const RentalsOfVehicle = () => {
    const { id } = useParams();
    const [dataFromDb, setDataFromDb] = useState<IRental[]>([]);
    const apiService = new ApiService('Rentals of Vehicle');
    
    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IRental[]>(`/Rentals/VehicleRentals/${id}`));
            }
            catch { }
        }
        fetch();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Rentals' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Rentals Of Vehicle'>
                            <VehicleInformationCardComponent id={Number(id)} />
                            <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Rental List'>
                                {dataFromDb.map((item) => (
                                    <RentalListComponent key={item.id} id={item.id} customerId={item.customerId} customerName={item.customerName} vehicleId={item.vehicleId} vehicleName={item.vehicleName} beginDate={item.beginDate} endDate={item.endDate} />
                                ))}
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Rentals' category='Rental' additionalOptions={`?vehicleId=${id}`} />
        </>
    )
}

export default RentalsOfVehicle