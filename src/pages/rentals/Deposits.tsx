import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import DepositListComponent, { CurrentDepositListComponent } from '../../components/rentals/DepositListComponent';
import { IDeposit } from '../../interfaces/IDeposits';
import { ApiService } from '../../classes/ApiService';

const Deposits = () => {
    const apiService = new ApiService('Deposits');
    const [activeDeposits, setActiveDeposits] = useState<IDeposit[]>([]);
    const [dataFromDb, setDataFromDb] = useState<IDeposit[]>([]);

    useEffect(() => {
        const fetchActive = async () => {
            try {
                setActiveDeposits(await apiService.get<IDeposit[]>(`/Deposits/Active`));
            }
            catch { }
        };

        const fetchAll = async () => {
            try {
                setDataFromDb(await apiService.get<IDeposit[]>(`/Deposits`));
            }
            catch { }
        };

        fetchActive();
        fetchAll();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Rentals' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Current / Active Deposits'>
                            {activeDeposits.map((item) => (
                                <CurrentDepositListComponent key={item.id} id={item.id} price={item.price} rentalId={item.rentalId} customerId={item.customerId} customerName={item.customerName} vehicleId={item.vehicleId} vehicleName={item.vehicleName} rentalBeginDate={item.beginDate} rentalEndDate={item.endDate} />
                            ))}
                        </Card>

                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='All Deposits'>
                            {dataFromDb.map((item) => (
                                <DepositListComponent key={item.id} id={item.id} price={item.price} rentalId={item.rentalId} customerId={item.customerId} customerName={item.customerName} vehicleId={item.vehicleId} vehicleName={item.vehicleName} rentalBeginDate={item.beginDate} rentalEndDate={item.endDate} status={item.status} />
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Rentals' category='Deposit' />
        </>
    )
}

export default Deposits