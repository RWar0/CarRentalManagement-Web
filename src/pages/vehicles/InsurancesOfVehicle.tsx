import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'

import './stylesVehicles.css';
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import Card from '../../components/common/Card';
import InsuranceListComponent from '../../components/vehicles/InsuranceListComponent';
import { IInsurance } from '../../interfaces/IInsurance';
import VehicleInformationCardComponent from '../../components/vehicles/VehicleInformationCardComponent';
import { useParams } from 'react-router';
import { ApiService } from '../../classes/ApiService';


const InsurancesOfVehicle = () => {
    const apiService = new ApiService('Insurances of Vehicle');
    const { id } = useParams();
    const [dataFromDb, setDataFromDb] = useState<IInsurance[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setDataFromDb(await apiService.get<IInsurance[]>(`/Insurances/InsurancesOfVehicle/${id}`));
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
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Insurances of Vehicle'>
                            <VehicleInformationCardComponent id={Number(id)} />
                            <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Insurance List'>
                                {dataFromDb.map((item) => (
                                    <InsuranceListComponent key={item.id} id={item.id} vehicleName={item.vehicleName} vehicleId={item.vehicleId} beginDate={item.beginDate} endDate={item.endDate} />
                                ))}

                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Vehicles' category='Insurance' additionalOptions={`?vehicleId=${id}`} />
        </>
    )
}

export default InsurancesOfVehicle