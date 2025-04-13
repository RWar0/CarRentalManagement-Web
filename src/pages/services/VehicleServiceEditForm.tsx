import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PageHeader from '../../components/common/PageHeader';
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IVehicleServiceBase, IVehicleServiceWithVehicleName } from '../../interfaces/IVehicleService';
import { ApiService } from '../../classes/ApiService';
import ServiceSelectorWithLabel from '../../components/inputs/ServiceSelectorWithLabel';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const VehicleServiceEditForm = () => {
    const { id } = useParams();
    const apiService = new ApiService("Vehicle Service");
    const [vehicleServiceObj, setVeicleServiceObj] = useState<IVehicleServiceWithVehicleName>({
        id: 0,
        vehicleId: -1,
        vehicleName: '',
        serviceId: -1,
        serviceDate: '',
    });

    useEffect(() => {
        const fetchObj = async () => {
            try {
                setVeicleServiceObj(await apiService.get<IVehicleServiceWithVehicleName>(`VehicleServices/DTOWithVehicleName/${id}`));
            } catch { }
        };
        fetchObj();
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

        const { vehicleName, ...vehicleServiceObjToParse } = vehicleServiceObj;
        try {
            await apiService.put<IVehicleServiceWithVehicleName>(`VehicleServices/DTO/${id}`, vehicleServiceObjToParse)
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
                    <h4 className="fw-bold pt-2" style={{ color: 'var(--additionalColor1)' }}>Vehicle information</h4>
                    <div className="d-flex align-items-center ms-3" >
                        <span className="material-symbols-outlined" style={{ color: 'var(--additionalColor2)' }}>
                            double_arrow
                        </span>
                        <span className='fs-4 fw-bolder d-flex align-items-center ms-1 mb-2'>{vehicleServiceObj.vehicleName} <span className='fs-5 fw-normal text-black-50 ps-2'>(#{vehicleServiceObj.vehicleId})</span></span>
                    </div>



                    <h4 className="fw-bold pt-2" style={{ color: 'var(--additionalColor1)' }}>Service details</h4>
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


                    <SubmitFormButton id={id} title='Vehicle Service' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default VehicleServiceEditForm