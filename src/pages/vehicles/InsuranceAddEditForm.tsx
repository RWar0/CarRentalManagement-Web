import React, { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useLocation, useParams } from 'react-router';
import { useState } from 'react'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IInsuranceForPost } from '../../interfaces/IInsurance';
import { ApiService } from '../../classes/ApiService';
import VehicleSelectorWithLabel from '../../components/inputs/VehicleSelectorWithLabel';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';


const InsuranceAddEditForm = () => {
    const querySearch = new URLSearchParams(useLocation().search);
    const queryVehicleId = querySearch.get("vehicleId");
    const apiService = new ApiService('Insurance');
    const { id } = useParams();

    const [insuranceObj, setInsuranceObj] = useState<IInsuranceForPost>({
        id: 0,
        vehicleId: -1,
        beginDate: "",
        endDate: "",
    });

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    setInsuranceObj(await apiService.get<IInsuranceForPost>(`/Insurances/${id}`));
                }
                catch { }
            };
            fetchData();
        }
        if (queryVehicleId) {
            try {
                setInsuranceObj((prevState) => ({
                    ...prevState,
                    vehicleId: parseInt(queryVehicleId),
                }));
            }
            catch { }
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (insuranceObj.vehicleId === -1) {
            alert("Please select a valid vehicle.");
            return;
        }

        if (insuranceObj.beginDate > insuranceObj.endDate) {
            alert("Begin date cannot be greater than end date");
            return;
        }

        // Creating new object
        if (!insuranceObj.id || insuranceObj.id === 0) {
            try {
                await apiService.post<IInsuranceForPost>(`Insurances/DTO`, insuranceObj)
                    .then(() => window.location.href = '/Vehicles/Insurances');
            }
            catch { }
        }
        // Editing object
        else {
            try {
                await apiService.put<IInsuranceForPost>(`Insurances/DTO/${id}`, insuranceObj)
                    .then(() => window.location.href = '/Vehicles/Insurances');
            }
            catch { }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInsuranceObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInsuranceObj((prevState) => ({
            ...prevState,
            [name]: parseInt(value),
        }));
    };

    return (
        <>
            <PageHeader title='Insurance Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <VehicleSelectorWithLabel
                        name='vehicleId'
                        value={insuranceObj.vehicleId}
                        onChange={handleSelectChange}
                    />

                    <BaseDateInputWithLabel
                        labelTitle='Begin Date'
                        name='beginDate'
                        value={insuranceObj.beginDate}
                        onChange={handleInputChange}
                        required
                        width={300}
                    />

                    <BaseDateInputWithLabel
                        labelTitle='End Date'
                        name='endDate'
                        value={insuranceObj.endDate}
                        onChange={handleInputChange}
                        required
                        width={300}
                    />

                    <SubmitFormButton id={id} title='Insurance' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default InsuranceAddEditForm