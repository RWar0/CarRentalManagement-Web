import React, { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useParams } from 'react-router';
import { useState } from 'react'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IVehicleToPost } from '../../interfaces/IVehicle';
import { ApiService } from '../../classes/ApiService';
import BaseTextInputWithLabel from '../../components/inputs/BaseTextInputWithLabel';
import BaseNumericInputWithLabel from '../../components/inputs/BaseNumericInputWithLabel';
import CategorySelectorWithLabel from '../../components/inputs/CategorySelectorWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const VehicleAddEditForm = () => {
    const currentYear = new Date().getFullYear()
    const apiService = new ApiService('Vehicle');
    const { id } = useParams();

    const [vehicleObj, setVehicleObj] = useState<IVehicleToPost>({
        id: 0,
        brand: '',
        model: '',
        vehicleCategyId: -1,
        production: 0,
        color: '',
    });

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                try {
                    setVehicleObj(await apiService.get<IVehicleToPost>(`/Vehicles/${id}`));
                }
                catch { }
            }
            fetch();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (vehicleObj.vehicleCategyId === -1) {
            alert("Please select a valid category.");
            return;
        }

        // Creating new object
        if (!vehicleObj.id || vehicleObj.id === 0) {
            try {
                await apiService.post<IVehicleToPost>(`Vehicles/DTO`, vehicleObj)
                    .then(() => window.location.href = '/Vehicles/List');
            }
            catch { }
        }
        // Editing object
        else {
            try {
                await apiService.put<IVehicleToPost>(`Vehicles/DTO/${id}`, vehicleObj)
                    .then(() => window.location.href = '/Vehicles/List');
            }
            catch { }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVehicleObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVehicleObj((prevState) => ({
            ...prevState,
            [name]: parseInt(value),
        }));
    };

    return (
        <>
            <PageHeader title='Vehicle Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <BaseTextInputWithLabel
                        labelTitle='Brand'
                        name='brand'
                        value={vehicleObj.brand}
                        onChange={handleInputChange}
                        required
                    />

                    <BaseTextInputWithLabel
                        labelTitle='Model'
                        name='model'
                        value={vehicleObj.model}
                        onChange={handleInputChange}
                        required
                    />

                    <BaseNumericInputWithLabel
                        labelTitle='Production Year'
                        name='production'
                        value={vehicleObj.production}
                        onChange={handleInputChange}
                        required
                        minNumber={1850}
                        maxNumber={currentYear}
                    />

                    <CategorySelectorWithLabel
                        name='vehicleCategyId'
                        value={vehicleObj.vehicleCategyId}
                        onChange={handleSelectChange}
                    />

                    <BaseTextInputWithLabel
                        labelTitle='Color'
                        name='color'
                        value={vehicleObj.color ?? ""}
                        onChange={handleInputChange}
                    />

                    <SubmitFormButton id={id} title='Vehicle' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default VehicleAddEditForm