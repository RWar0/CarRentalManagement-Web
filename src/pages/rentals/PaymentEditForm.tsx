import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import PageHeader from '../../components/common/PageHeader'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IPayment } from '../../interfaces/IPayment';
import { ApiService } from '../../classes/ApiService';
import BaseNumericInputWithLabel from '../../components/inputs/BaseNumericInputWithLabel';
import CheckBoxWithLabel from '../../components/inputs/CheckBoxWithLabel';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const PaymentEditForm = () => {
    const { id } = useParams();
    const apiService = new ApiService('Payment');

    const [paymentObj, setPaymentObj] = useState<IPayment>({
        id: 0,
        invoiceId: 24,
        invoiceTitle: "",
        isFinalized: false,
        paymentTotal: 0,
        finalizationDate: '',
    });

    useEffect(() => {
        const fetch = async () => {
            try {
                setPaymentObj(await apiService.get<IPayment>(`/Payments/DTO/${id}`));
            }
            catch { }
        }
        fetch();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let paymentToPase = { ...paymentObj };

        if (!paymentObj.isFinalized) {
            paymentToPase.finalizationDate = null;
        }

        await apiService.post<IPayment>(`Payments/DTO/`, paymentToPase)
            .then(() => window.location.href = '/Rentals/Payments');
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
            <PageHeader title='Payment Edit Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <h4 className="fw-bold" style={{ color: 'var(--additionalColor1)' }}>Invoice details</h4>
                    <div className="d-flex flex-column gap-2 ms-3">
                        <h5>Invoice Title: <span className='fw-bold'>{paymentObj.invoiceTitle}</span></h5>
                        <h5>Invoice_ID: <span className='fw-bold'>#{paymentObj.invoiceId}</span></h5>
                    </div>

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

                    <SubmitFormButton id={id} title='Payment' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default PaymentEditForm