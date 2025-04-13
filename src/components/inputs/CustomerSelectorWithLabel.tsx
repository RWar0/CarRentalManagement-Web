import React, { useEffect, useState } from 'react'
import BaseSelectorWithLabel from './BaseSelectorWithLabel'
import { ApiService } from '../../classes/ApiService'
import { ICustomerSelector } from '../../interfaces/ICustomer';

type CustomerSelectorWithLabelProps = {
    name?: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    
    width?: number;
}


const CustomerSelectorWithLabel = (props: CustomerSelectorWithLabelProps) => {
    const apiService = new ApiService('Customers Selector');
    const [customerList, setCustomerList] = useState<ICustomerSelector[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setCustomerList(await apiService.get<ICustomerSelector[]>(`/Customers/SelectorList`));
            } catch { }
        }
        fetch();
    }, []);

    return (
        <BaseSelectorWithLabel
            labelTitle='Customer'
            name={props.name ?? 'customerId'}
            nonSelectedItemName='customer'
            nonSelectedItemNumericValue={-1}
            value={props.value}
            onChange={props.onChange}
            objectsData={customerList.map((item) => (
                {
                    value: item.id,
                    label: `#${item.id} | ${item.customerName}`,
                }
            ))}
            
            width={props.width}
        />
    )
}

export default CustomerSelectorWithLabel