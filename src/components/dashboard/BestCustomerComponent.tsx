import React, { useEffect, useState } from 'react'
import { ApiService } from '../../classes/ApiService';

const BestCustomerComponent = () => {
    const apiService = new ApiService('Best Customer');
    const [customerStats, setCustomerStats] = useState({ customerName: '', rentalQuantity: 0 });

    async function fetchData() {
        try {
            setCustomerStats(await apiService.get<{ customerName: '', rentalQuantity: 0 }>(`/Rentals/TopCustomer`))
        }
        catch { }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid m-0 p-0 pb-3">
            <h5 className='pt-2'>The most involved customer is</h5>
            <h3 className='pt-2 text-center fw-bold' style={{ color: 'var(--additionalColor1)', textShadow: '1px 1px 1px rgb(207, 207, 207)' }}>{customerStats.customerName}</h3>

            <h5 className='pt-3 ps-2 text-black-50'>that has already rented:</h5>
            <h4 className='pt-1 text-center fw-bold'>{customerStats.rentalQuantity} <span className='fw-medium' style={{ color: 'rgb(70, 70, 70)' }}>vehicles</span></h4>
        </div>
    )
}

export default BestCustomerComponent