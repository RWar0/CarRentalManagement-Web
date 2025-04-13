import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import { RentalListComponentWithoutButtons } from './RentalListComponent';
import { IRental } from '../../interfaces/IRental';
import { ApiService } from '../../classes/ApiService';

const RentalInformationCardComponent = ({ id }: { id: number }) => {
    const [objectData, setObjectData] = useState<IRental>();
    const apiService = new ApiService('Rental');
    useEffect(() => {
        const fetchobjectData = async () => {
            try {
                setObjectData(await apiService.get<IRental>(`/Rentals/GetFullDTO/${id}`));
            }
            catch { }
        }
        fetchobjectData();
    }, [id]);

    return (
        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Information about rental'>
            <RentalListComponentWithoutButtons key={objectData?.id ?? 0} id={objectData?.id ?? 0} customerId={objectData?.customerId ?? 0} customerName={objectData?.customerName ?? ""} vehicleId={objectData?.vehicleId ?? 0} vehicleName={objectData?.vehicleName ?? ""} beginDate={objectData?.beginDate ?? ""} endDate={objectData?.endDate ?? ""} />
        </Card>
    )
}

export default RentalInformationCardComponent