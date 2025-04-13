import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import { CustomerListComponentWithoutButtons } from './CustomerListComponent'
import { ICustomer } from '../../interfaces/ICustomer';
import { ApiService } from '../../classes/ApiService';

const CustomerInformationCardComponent = ({ id }: { id: number }) => {
    const [objectData, setObjectData] = useState<ICustomer>();
    const apiService = new ApiService('Customer');

    useEffect(() => {
        const fetchobjectData = async () => {
            try {
                setObjectData(await apiService.get<ICustomer>(`/Customers/${id}`));
            }
            catch { }
        }
        fetchobjectData();
    }, [id]);

    return (
        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Information about customer'>
            <CustomerListComponentWithoutButtons key={objectData?.id ?? 0} id={objectData?.id ?? 0} FirstName={objectData?.firstname ?? ""} LastName={objectData?.lastname ?? ""} DateOfBirth={objectData?.dateOfBirth ?? ""} PlaceOfBirth={objectData?.placeOfBirth ?? ""} Pesel={objectData?.pesel ?? ""} />
        </Card>
    )
}

export default CustomerInformationCardComponent