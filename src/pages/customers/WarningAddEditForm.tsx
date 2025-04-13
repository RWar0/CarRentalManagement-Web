import React, { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useLocation, useParams } from 'react-router';
import { useState } from 'react'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IWarningForPost } from '../../interfaces/IWarning';
import { ApiService } from '../../classes/ApiService';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import BaseTextAreaWithLabel from '../../components/inputs/BaseTextAreaWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';
import CustomerSelectorWithLabel from '../../components/inputs/CustomerSelectorWithLabel';

const WarningAddEditForm = () => {
    const querySearch = new URLSearchParams(useLocation().search);
    const queryCustomerId = querySearch.get("customerId");
    const apiService = new ApiService('Customer Warning');

    const { id } = useParams();
    const [warningObj, setWarningObj] = useState<IWarningForPost>({
        id: 0,
        customerId: -1,
        description: "",
        warningDate: "",
    });

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                try {
                    setWarningObj(await apiService.get<IWarningForPost>(`/Warnings/DTO/${id}`));
                }
                catch { }
            }
            fetch();
        }
        else {
            if (queryCustomerId) {
                try {
                    setWarningObj((prevState) => ({
                        ...prevState,
                        customerId: parseInt(queryCustomerId),
                    }));
                }
                catch { }
            }
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (warningObj.customerId === -1) {
            alert("Please select a valid customer.");
            return;
        }

        // Creating object
        if (!warningObj.id || warningObj.id === 0) {
            try {
                await apiService.post<IWarningForPost>(`/Warnings/DTO`, warningObj)
                    .then(() => window.location.href = '/Customers/Warnings');
            }
            catch { }
        }
        // Editing object
        else {
            try {
                await apiService.put<IWarningForPost>(`/Warnings/DTO/${id}`, warningObj)
                    .then(() => window.location.href = '/Customers/Warnings');
            }
            catch { }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWarningObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWarningObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setWarningObj((prevState) => ({
            ...prevState,
            [name]: parseInt(value),
        }));
    };

    return (
        <>
            <PageHeader title='Warning Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    
                    <CustomerSelectorWithLabel
                        name='customerId'
                        value={warningObj.customerId}
                        onChange={handleSelectChange}
                    />

                    <BaseDateInputWithLabel
                        labelTitle='Date of warning'
                        name='warningDate'
                        value={warningObj.warningDate}
                        onChange={handleInputChange}
                        maxDate={new Date().toISOString().split('T')[0]}
                        required
                        width={300}
                    />

                    <BaseTextAreaWithLabel
                        labelTitle='Description'
                        name='description'
                        value={warningObj.description}
                        onChange={handleTextAreaChange}
                        rows={6}
                        required
                        maxHeight={240}
                    />

                    <SubmitFormButton id={id} title='Warning' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default WarningAddEditForm