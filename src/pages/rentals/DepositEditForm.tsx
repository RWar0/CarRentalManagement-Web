import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router';
import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IDepositForPost } from '../../interfaces/IDeposits';
import { IRental } from '../../interfaces/IRental';
import { ApiService } from '../../classes/ApiService';
import BaseNumericInputWithLabel from '../../components/inputs/BaseNumericInputWithLabel';
import BaseSelectorWithLabel from '../../components/inputs/BaseSelectorWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const DepositEditForm = () => {
    const { id } = useParams();
    const querySearch = new URLSearchParams(useLocation().search);
    const queryRentalId = querySearch.get("rentalId");
    const apiService = new ApiService('Deposit');
    const [rentalData, setRentalData] = useState<IRental>({
        id: 0,
        customerId: 0,
        customerName: '',
        vehicleId: 0,
        vehicleName: '',
        beginDate: '',
        endDate: '',
    });

    const [depositObj, setDepositObj] = useState<IDepositForPost>({
        id: 0,
        price: 0,
        rentalId: 0,
        status: "Active",
    });

    useEffect(() => {
        const fetchRentalData = async () => {
            try {
                setRentalData(await apiService.get<IRental>(`/Rentals/GetFullDTO/${queryRentalId}`));
            }
            catch { }
        };

        const fetchDeposit = async () => {
            try {
                setDepositObj(await apiService.get<IDepositForPost>(`/Deposits/BaseDTO/${id}`));
            }
            catch { }
        };

        fetchRentalData();
        fetchDeposit();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await apiService.put<IDepositForPost>(`Deposits/DTO/${id}`, depositObj)
                .then(() => window.location.href = '/Rentals/Deposits');
        }
        catch { }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDepositObj((prevState) => ({
            ...prevState,
            [name]: name === 'price' && value === '' ? undefined : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDepositObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <PageHeader title='Deposit Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <h4 className="fw-bold" style={{ color: 'var(--additionalColor1)' }}>Rental information</h4>
                    <div className="d-flex flex-column gap-2">
                        <h5>RentalID: <span className='fw-bold'>#{rentalData.id}</span></h5>
                        <h5>Rental dates: <span className='fw-bold'>{rentalData.beginDate}</span> - <span className='fw-bold'>{rentalData.endDate}</span></h5>
                        <h5>Customer information: <span className='fw-bold'>{rentalData.customerName} <span className='fw-medium text-black-50'>(#{rentalData.customerId})</span></span></h5>
                        <h5>Vehicle information: <span className='fw-bold'>{rentalData.vehicleName}</span> <span className='fw-medium text-black-50'>(#{rentalData.vehicleId})</span></h5>
                    </div>

                    <h4 className="fw-bold pt-3" style={{ color: 'var(--additionalColor1)' }}>Deposit information</h4>

                    <BaseNumericInputWithLabel
                        labelTitle='Price'
                        name='price'
                        additionalLabelAfterInput='$'
                        value={depositObj.price}
                        onChange={handleInputChange}
                        required
                        minNumber={0}
                        width={220}
                    />

                    <BaseSelectorWithLabel
                        labelTitle='Deposit status'
                        name='status'
                        value={depositObj.status}
                        onChange={handleSelectChange}
                        nonSelectedItemName='status'
                        objectsData={[
                            { value: 'Active', label: 'Active deposit' },
                            { value: 'Kept' },
                            { value: 'Returned' },
                        ]}
                        width={300}
                    />

                    <SubmitFormButton id={id} title='Deposit' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default DepositEditForm