import React, { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useState } from 'react'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IPaymentForPost, IPaymentForPostCombined } from '../../interfaces/IPayment';
import { useLocation } from 'react-router';
import { ApiService } from '../../classes/ApiService';
import BaseNumericInputWithLabel from '../../components/inputs/BaseNumericInputWithLabel';
import CheckBoxWithLabel from '../../components/inputs/CheckBoxWithLabel';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const PaymentAddForm = () => {
    const querySearch = new URLSearchParams(useLocation().search);
    const queryInvoiceId = querySearch.get("invoiceId");
    const apiService = new ApiService('Payment');

    const [maximumId, setMaximumId] = useState<number>(0);
    const [paymentObj, setPaymentObj] = useState<IPaymentForPostCombined>({
        id: 0,
        invoiceTitle: "",
        isFinalized: false,
        finalizationDate: '',
    });

    useEffect(() => {
        const fetchMaximumId = async () => {
            try {
                setMaximumId(await apiService.get<number>(`/Invoices/MaximumId`));
            }
            catch { }
        }

        fetchMaximumId();

        if (queryInvoiceId) {
            try {
                setPaymentObj((prevState) => ({
                    ...prevState,
                    invoiceId: parseInt(queryInvoiceId),
                }));
            }
            catch { }
        }

    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const invoiceTitle = await apiService.get<string>(`/Invoices/Title/${paymentObj.invoiceId}`);
                setPaymentObj((prev) => ({
                    ...prev,
                    invoiceTitle: invoiceTitle !== "" ? invoiceTitle : "Does not exist",
                }))
            }
            catch { }
        }

        if (paymentObj.invoiceId && paymentObj.invoiceId !== 0) {
            getData();
        }
        else {
            setPaymentObj((prev) => ({
                ...prev,
                invoiceTitle: "",
            }))
        }

    }, [paymentObj.invoiceId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (paymentObj.invoiceTitle === "Does not exist" || paymentObj.invoiceTitle == "") {
            alert("Select existing invoice for payment!");
            return;
        }

        let paymentToPase = { ...paymentObj };

        if (!paymentObj.isFinalized) {
            paymentToPase.finalizationDate = null;
        }

        try {
            await apiService.post<IPaymentForPost>(`Payments/DTO/`, paymentToPase)
                .then(() => window.location.href = '/Rentals/Payments');
        }
        catch { }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleIsFinalizationCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentObj((prevState) => ({
            ...prevState,
            isFinalized: e.target.checked,
        }));

        setPaymentObj((prevState) => ({
            ...prevState,
            finalizationDate: "",
        }));
    };

    return (
        <>
            <PageHeader title='Payment Add Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>

                    <BaseNumericInputWithLabel
                        labelTitle='ID of the invoice'
                        name='invoiceId'
                        additionalLabelBeforeInput='#'
                        value={paymentObj.invoiceId ?? ""}
                        onChange={handleInputChange}
                        required
                        minNumber={1}
                        maxNumber={maximumId}
                        width={200}
                    />

                    <span className='fs-5 d-flex align-items-center'>
                        Title of invoice: <span className='ps-2 fw-semibold fs-4'>{paymentObj.invoiceTitle}</span>
                    </span>

                    <BaseNumericInputWithLabel
                        labelTitle='Price'
                        name='paymentTotal'
                        additionalLabelAfterInput='$'
                        value={paymentObj.paymentTotal ?? ""}
                        onChange={handleInputChange}
                        required
                        minNumber={1}
                        stepValue={0.01}
                        width={220}
                    />

                    <CheckBoxWithLabel
                        labelTitle='Is Finalized?'
                        name='isFinalized'
                        value={paymentObj.isFinalized}
                        onChange={handleIsFinalizationCheckboxChange}
                    />

                    {paymentObj.isFinalized && (
                        <BaseDateInputWithLabel
                            labelTitle='Finalization Date'
                            name='finalizationDate'
                            value={paymentObj.finalizationDate ?? ""}
                            onChange={handleInputChange}
                            maxDate={new Date().toISOString().split('T')[0]}
                            required={paymentObj.isFinalized}
                            width={300}
                        />
                    )}
                    
                    <SubmitFormButton id={undefined} title='Payment' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default PaymentAddForm