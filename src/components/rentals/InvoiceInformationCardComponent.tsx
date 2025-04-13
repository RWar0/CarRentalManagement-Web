import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import axios from 'axios';
import { IInvoice } from '../../interfaces/IInvoice';
import { InvoiceListComponentWithoutButtons } from './InvoiceListComponent';
import { ApiService } from '../../classes/ApiService';

const InvoiceInformationCardComponent = ({ id }: { id: number }) => {
    const [objectData, setObjectData] = useState<IInvoice>();
    const apiService = new ApiService('Invoice');
    useEffect(() => {
        const fetchobjectData = async () => {
            try {
                setObjectData(await apiService.get<IInvoice>(`/Invoices/DTO/${id}`));
            }
            catch { }
        }
        fetchobjectData();
    }, [id]);

    return (
        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Information about invoice'>
            <InvoiceListComponentWithoutButtons key={objectData?.id ?? 0} id={objectData?.id ?? 0} date={objectData?.invoiceDate ?? ""} invoiceTitle={objectData?.title ?? ""} rentalId={objectData?.rentalId ?? 0} price={objectData?.price ?? 0} />
        </Card>
    )
}

export default InvoiceInformationCardComponent