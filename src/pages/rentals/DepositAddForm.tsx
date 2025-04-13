import React, { useEffect } from 'react'
import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IDepositForPost } from '../../interfaces/IDeposits';
import { useLocation } from 'react-router';
import { ApiService } from '../../classes/ApiService';
import BaseNumericInputWithLabel from '../../components/inputs/BaseNumericInputWithLabel';
import BaseSelectorWithLabel from '../../components/inputs/BaseSelectorWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const DepositAddForm = () => {
    const querySearch = new URLSearchParams(useLocation().search);
    const queryRentalId = querySearch.get("rentalId");

    const apiService = new ApiService('Deposit');
    const [maximumId, setMaximumId] = useState<number>(0);

    const [depositObj, setDepositObj] = useState<IDepositForPost>({
        id: 0,
        price: 0,
        rentalId: 0,
        status: "N/A",
    });

    useEffect(() => {
        const fetchMaxId = async () => {
            try {
                setMaximumId(await apiService.get<number>(`/Rentals/GetMaxId`));
            }
            catch { }
        };

        fetchMaxId();

        if (queryRentalId) {
            try {
                setDepositObj((prevState) => ({
                    ...prevState,
                    rentalId: parseInt(queryRentalId),
                }));
            }
            catch { }
        }
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (depositObj.status === "N/A") {
            alert("Please select a status.");
            return;
        }

        try {
            await apiService.post<IDepositForPost>(`Deposits/DTO`, depositObj)
                .then(() => window.location.href = '/Rentals/Deposits');
        }
        catch {
            alert("Check Rental_ID and connection!");
        }
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
                    <BaseNumericInputWithLabel
                        labelTitle='Rental_ID'
                        name='rentalId'
                        additionalLabelBeforeInput='#'
                        value={depositObj.rentalId}
                        onChange={handleInputChange}
                        required
                        minNumber={1}
                        maxNumber={maximumId}
                        width={150}
                    />

                    <h4 className="fw-bold pt-2" style={{ color: 'var(--additionalColor1)' }}>Deposit information</h4>

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

                    <SubmitFormButton id={undefined} title='Deposit' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default DepositAddForm