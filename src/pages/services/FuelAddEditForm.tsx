import React, { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useLocation, useParams } from 'react-router';
import { useState } from 'react'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IFuelingForPost } from '../../interfaces/IFueling';
import { ApiService } from '../../classes/ApiService';
import VehicleSelectorWithLabel from '../../components/inputs/VehicleSelectorWithLabel';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import BaseNumericInputWithLabel from '../../components/inputs/BaseNumericInputWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const FuelAddEditForm = () => {
    const querySearch = new URLSearchParams(useLocation().search);
    const queryVehicleId = querySearch.get("vehicleId");
    const apiService = new ApiService('Fueling');
    const { id } = useParams();

    const [fuelingObj, setFuelingObj] = useState<IFuelingForPost>({
        id: 0,
        vehicleId: -1,
        fuelingDate: '',
        quantity: 0,
    });

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    setFuelingObj(await apiService.get<IFuelingForPost>(`/Fuelings/DTO/${id}`));
                }
                catch { }
            };
            fetchData();
        }
        else {
            if (queryVehicleId) {
                try {
                    setFuelingObj((prevState) => ({
                        ...prevState,
                        vehicleId: parseInt(queryVehicleId),
                    }));
                }
                catch { }
            }
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (fuelingObj.vehicleId === -1) {
            alert("Please select a valid vehicle.");
            return;
        }

        if (fuelingObj.quantity <= 0) {
            alert("Quantity of fuel has to be positive");
            return;
        }

        const fuelingObjToParse = {
            ...fuelingObj,
            price: fuelingObj.price ? fuelingObj.price : -1,
        };

        // Creating object
        if (!fuelingObjToParse.id || fuelingObjToParse.id === 0) {
            try {
                await apiService.post<IFuelingForPost>(`Fuelings/DTO`, fuelingObjToParse)
                    .then(() => window.location.href = '/Services/Fuelings');
            } catch { }
        }
        // Editing object
        else {
            try {
                await apiService.put<IFuelingForPost>(`Fuelings/DTO/${id}`, fuelingObjToParse)
                    .then(() => window.location.href = '/Services/Fuelings');
            } catch { }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFuelingObj((prevState) => ({
            ...prevState,
            [name]: name === 'price' && value === '' ? undefined : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFuelingObj((prevState) => ({
            ...prevState,
            [name]: parseInt(value),
        }));
    };

    return (
        <>
            <PageHeader title='Fueling Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <VehicleSelectorWithLabel
                        labelTitle='Refueled vehicle'
                        name='vehicleId'
                        value={fuelingObj.vehicleId}
                        onChange={handleSelectChange}

                    />

                    <BaseDateInputWithLabel
                        labelTitle='Date of fueling'
                        name='fuelingDate'
                        value={fuelingObj.fuelingDate}
                        onChange={handleInputChange}
                        maxDate={new Date().toISOString().split('T')[0]}
                        required
                        width={300}
                    />

                    <div className="d-flex flex-wrap">
                        <BaseNumericInputWithLabel
                            labelTitle='Quantity'
                            name='quantity'
                            value={fuelingObj.quantity}
                            onChange={handleInputChange}
                            width={250}
                            minNumber={1}
                            required
                        />

                        <div className="ms-5"></div>

                        <BaseNumericInputWithLabel
                            labelTitle='Price'
                            name='price'
                            value={fuelingObj.price ?? ""}
                            onChange={handleInputChange}
                            width={250}
                            minNumber={1}
                            stepValue={0.01}
                        />

                    </div>

                    <SubmitFormButton id={id} title='Fueling' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default FuelAddEditForm