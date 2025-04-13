import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import PageHeader from '../../components/common/PageHeader';
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IVehicleServiceBase } from '../../interfaces/IVehicleService';
import { ApiService } from '../../classes/ApiService';
import ServiceSelectorWithLabel from '../../components/inputs/ServiceSelectorWithLabel';
import VehicleSelectorWithLabel from '../../components/inputs/VehicleSelectorWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';

const VehicleServiceAddForm = () => {
    const querySearch = new URLSearchParams(useLocation().search);
    const queryVehicleId = querySearch.get("vehicleId");
    const queryServiceId = querySearch.get("serviceId");
    const apiService = new ApiService('Vehicle Service');

    const [vehicleServiceObj, setVeicleServiceObj] = useState<IVehicleServiceBase>({
        id: 0,
        serviceDate: '',
        serviceId: -1,
        vehicleId: -1,
    });

    useEffect(() => {
        if (queryVehicleId) {
            try {
                setVeicleServiceObj((prevState) => ({
                    ...prevState,
                    vehicleId: parseInt(queryVehicleId),
                }));
            }
            catch { }
        }

        if (queryServiceId) {
            try {
                setVeicleServiceObj((prevState) => ({
                    ...prevState,
                    serviceId: parseInt(queryServiceId),
                }));
            }
            catch { }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (vehicleServiceObj.vehicleId === -1) {
            alert("Please select a valid vehicle.");
            return;
        }
        if (vehicleServiceObj.serviceId === -1) {
            alert("Please select a valid service.");
            return;
        }

        try {
            await apiService.post<IVehicleServiceBase>(`VehicleServices/DTO`, vehicleServiceObj)
                .then(() => window.location.href = '/Services/Vehicles');
        } catch { }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVeicleServiceObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVeicleServiceObj((prevState) => ({
            ...prevState,
            [name]: parseInt(value),
        }));
    };

    return (
        <>
            <PageHeader title='Vehicle Service Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <VehicleSelectorWithLabel
                        labelTitle='Serviced vehicle'
                        name='vehicleId'
                        value={vehicleServiceObj.vehicleId}
                        onChange={handleSelectChange}
                    />

                    <ServiceSelectorWithLabel
                        labelTitle='Service'
                        name='serviceId'
                        value={vehicleServiceObj.serviceId}
                        onChange={handleSelectChange}
                    />
                    
                    <BaseDateInputWithLabel
                        labelTitle='Service date'
                        name='serviceDate'
                        value={vehicleServiceObj.serviceDate}
                        onChange={handleInputChange}
                        minDate='1900-01-01'
                        width={300}
                        required
                    />

                    <SubmitFormButton id={undefined} title='Vehicle Service' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default VehicleServiceAddForm