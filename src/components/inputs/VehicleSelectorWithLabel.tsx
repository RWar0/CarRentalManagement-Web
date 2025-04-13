import React, { useEffect, useState } from 'react'
import BaseSelectorWithLabel from './BaseSelectorWithLabel'
import { ApiService } from '../../classes/ApiService'
import { IVehicleSelector } from '../../interfaces/IVehicle';

type VehicleSelectorWithLabelProps = {
    labelTitle?: string;
    
    name?: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    
    width?: number;
}


const VehicleSelectorWithLabel = (props: VehicleSelectorWithLabelProps) => {
    const apiService = new ApiService('Vehicles Selector');
    const [vehiclesList, setVehiclesList] = useState<IVehicleSelector[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setVehiclesList(await apiService.get<IVehicleSelector[]>(`/Vehicles/SelectorList`));
            } catch { }
        }
        fetch();
    }, []);

    return (
        <BaseSelectorWithLabel
            labelTitle={props.labelTitle ?? 'Vehicle'}
            name={props.name ?? 'vehicleId'}
            nonSelectedItemName='vehicle'
            nonSelectedItemNumericValue={-1}
            value={props.value}
            onChange={props.onChange}
            objectsData={vehiclesList.map((item) => (
                {
                    value: item.id,
                    label: `#${item.id} | ${item.vehicleName} (${item.production})`,
                }
            ))}
            
            width={props.width}
        />
    )
}

export default VehicleSelectorWithLabel