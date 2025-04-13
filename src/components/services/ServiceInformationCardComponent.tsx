import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import { IService } from '../../interfaces/IService';
import { ServiceListComponentWithoutButtons } from './ServiceListComponent';
import { ApiService } from '../../classes/ApiService';

const ServiceInformationCardComponent = ({ id }: { id: number }) => {
    const [objectData, setObjectData] = useState<IService>();
    const apiService = new ApiService("Service");

    useEffect(() => {
        const fetchobjectData = async () => {
            try {
                setObjectData(await apiService.get<IService>(`Services/DTO/${id}`));
            } catch { }
        }
        fetchobjectData();
    }, [id]);

    return (
        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Information about service'>
            <ServiceListComponentWithoutButtons key={objectData?.id ?? 0} id={objectData?.id ?? 0} title={objectData?.title ?? ""} description={objectData?.description} />
        </Card>
    )
}

export default ServiceInformationCardComponent