import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router';
import PageHeader from '../../components/common/PageHeader';
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IInvoice } from '../../interfaces/IInvoice';
import { ApiService } from '../../classes/ApiService';
import BaseTextInputWithLabel from '../../components/inputs/BaseTextInputWithLabel';
import BaseNumericInputWithLabel from '../../components/inputs/BaseNumericInputWithLabel';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const InvoiceAddEditForm = () => {
    const querySearch = new URLSearchParams(useLocation().search);
    const queryRentalId = querySearch.get("rentalId");
    const apiService = new ApiService('Invoice');

    const [maximumId, setMaximumId] = useState<number>(0);
    const { id } = useParams();

    const [invoiceObj, setInvoiceObj] = useState<IInvoice>({
        id: 0,
        invoiceDate: '',
        price: 0,
        rentalId: 0,
        title: '',
    });

    useEffect(() => {
        const fetchMaxId = async () => {
            try {
                setMaximumId(await apiService.get<number>(`/Rentals/GetMaxId`));
            }
            catch { }
        };

        const fetchObject = async () => {
            try {
                setInvoiceObj(await apiService.get<IInvoice>(`/Invoices/DTO/${id}`));
            }
            catch { }
        }

        fetchMaxId();
        if (id) {
            fetchObject();
        }
        else {
            if (queryRentalId) {
                try {
                    setInvoiceObj((prevState) => ({
                        ...prevState,
                        rentalId: parseInt(queryRentalId),
                    }));
                }
                catch { }
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Creating object
        if (!invoiceObj.id || invoiceObj.id === 0) {
            try {
                await apiService.post<IInvoice>(`Invoices/DTOAndPayment`, invoiceObj)
                    .then(() => window.location.href = '/Rentals/Invoices');
            }
            catch {
                alert("Check Rental_ID and connection!");
            }
        }
        // Editing object
        else {
            try {
                await apiService.put<IInvoice>(`Invoices/DTO/${id}`, invoiceObj)
                    .then(() => window.location.href = '/Rentals/Invoices');
            }
            catch {
                alert("Check Rental_ID and connection!");
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvoiceObj((prevState) => ({
            ...prevState,
            [name]: name === 'price' && value === '' ? undefined : value,
        }));
    };

    return (
        <>
            <PageHeader title='Invoice Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>

                    <BaseTextInputWithLabel
                        labelTitle='Invoice title'
                        placeholder='FV/____'
                        name='title'
                        value={invoiceObj.title}
                        onChange={handleInputChange}
                        required
                    />

                    <BaseNumericInputWithLabel
                        labelTitle='Rental_ID'
                        name='rentalId'
                        additionalLabelBeforeInput='#'
                        value={invoiceObj.rentalId}
                        onChange={handleInputChange}
                        required
                        minNumber={1}
                        maxNumber={maximumId}
                        width={150}
                    />


                    <BaseNumericInputWithLabel
                        labelTitle='Price'
                        name='price'
                        additionalLabelAfterInput='$'
                        value={invoiceObj.price}
                        onChange={handleInputChange}
                        required
                        minNumber={0}
                        width={220}
                    />

                    <BaseDateInputWithLabel
                        labelTitle='Invoice Date'
                        name='invoiceDate'
                        value={invoiceObj.invoiceDate}
                        onChange={handleInputChange}
                        width={300}
                        required
                    />

                    <SubmitFormButton id={id} title='Invoice' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default InvoiceAddEditForm