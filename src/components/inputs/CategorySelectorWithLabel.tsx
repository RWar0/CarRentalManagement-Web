import React, { useEffect, useState } from 'react'
import BaseSelectorWithLabel from './BaseSelectorWithLabel'
import { ApiService } from '../../classes/ApiService'
import { IVehicleCategory } from '../../interfaces/IVehicleCategory';

type CategorySelectorWithLabelProps = {
    name?: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    
    width?: number;
}


const CategorySelectorWithLabel = (props: CategorySelectorWithLabelProps) => {
    const apiService = new ApiService('Vehicle Category Selector');
    const [categoryList, setCategoryList] = useState<IVehicleCategory[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setCategoryList(await apiService.get<IVehicleCategory[]>(`/VehicleCategies`));
            } catch { }
        }
        fetch();
    }, []);

    return (
        <BaseSelectorWithLabel
            labelTitle='Category'
            name={props.name ?? 'categoryId'}
            nonSelectedItemName='vehicle category'
            nonSelectedItemNumericValue={-1}
            value={props.value}
            onChange={props.onChange}
            objectsData={categoryList.map((item) => (
                {
                    value: item.id,
                    label: `#${item.id} | ${item.title}`,
                }
            ))}
            
            width={props.width}
        />
    )
}

export default CategorySelectorWithLabel