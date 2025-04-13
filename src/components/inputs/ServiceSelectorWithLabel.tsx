import React, { useEffect, useState } from 'react'
import BaseSelectorWithLabel from './BaseSelectorWithLabel'
import { ApiService } from '../../classes/ApiService'
import { IService } from '../../interfaces/IService';

type ServiceSelectorWithLabelProps = {
    labelTitle?: string;

    name?: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;

    width?: number;
}


const ServiceSelectorWithLabel = (props: ServiceSelectorWithLabelProps) => {
    const apiService = new ApiService('Services Selector');
    const [servicesList, setServicesList] = useState<IService[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setServicesList(await apiService.get<IService[]>(`/Services`));
            } catch { }
        }
        fetch();
    }, []);

    return (
        <BaseSelectorWithLabel
            labelTitle={props.labelTitle ?? 'Service'}
            name={props.name ?? 'serviceId'}
            nonSelectedItemName='service'
            nonSelectedItemNumericValue={-1}
            value={props.value}
            onChange={props.onChange}
            objectsData={servicesList.map((item) => (
                {
                    value: item.id,
                    label: `#${item.id} | ${item.title} ` + (item.description ? `(${item.description})` : ""),
                }
            ))}

            width={props.width}
        />
    )
}

export default ServiceSelectorWithLabel