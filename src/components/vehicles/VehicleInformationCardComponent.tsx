import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import { VehicleListComponentWithoutButtons } from './CarListComponent';
import { IVehicle } from '../../interfaces/IVehicle';
import { ApiService } from '../../classes/ApiService';

const VehicleInformationCardComponent = ({ id }: { id: number }) => {
    const apiService = new ApiService('Vehicle');
    const [objectData, setObjectData] = useState<IVehicle>();

    useEffect(() => {
        const fetchobjectData = async () => {
            try {
                setObjectData(await apiService.get<IVehicle>(`/Vehicles/${id}`));
            }
            catch { }
        }
        fetchobjectData();
    }, [id]);

    return (
        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Information about vehicle'>
            <VehicleListComponentWithoutButtons key={objectData?.id ?? 0}
                id={objectData?.id ?? 0}
                brand={objectData?.brand ?? ""}
                model={objectData?.model ?? ""}
                production={objectData?.production ?? 0}
                color={objectData?.color ?? ""} />
        </Card>
    )
}

export default VehicleInformationCardComponent