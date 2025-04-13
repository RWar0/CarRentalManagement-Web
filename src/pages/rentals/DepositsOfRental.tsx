import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import AddItemButtonComponent from '../../components/common/AddItemButtonComponent';
import DepositListComponent from '../../components/rentals/DepositListComponent';
import { IDeposit } from '../../interfaces/IDeposits';
import RentalInformationCardComponent from '../../components/rentals/RentalInformationCardComponent';
import { useParams } from 'react-router';
import { ApiService } from '../../classes/ApiService';

const DepositsOfRental = () => {
    const { id } = useParams();
    const [dataFromDb, setDataFromDb] = useState<IDeposit[]>([]);
    const apiService = new ApiService('Deposits of Rental');

    useEffect(() => {
        const fetchDeposits = async () => {
            try {
                setDataFromDb(await apiService.get<IDeposit[]>(`/Deposits/DepositsOfRental/${id}`));
            }
            catch { }
        };

        fetchDeposits();
    }, []);

    return (
        <>
            <div className='m-0 p-0 w-100'>
                <PageHeader title='Rentals' />
                <div className='container-fluid m-0 p-0 w-100 pb-5'>
                    <div className="row m-0 p-0 gap-0">
                        <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Deposits of Rental'>
                            <RentalInformationCardComponent id={Number(id)} />
                            <Card xs={12} md={12} lg={12} xl={12} xxl={12} title='Deposits List'>
                                {dataFromDb.map((item) => (
                                    <DepositListComponent key={item.id} id={item.id} price={item.price} rentalId={item.rentalId} customerId={item.customerId} customerName={item.customerName} vehicleId={item.vehicleId} vehicleName={item.vehicleName} rentalBeginDate={item.beginDate} rentalEndDate={item.endDate} status={item.status} />
                                ))}
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            <AddItemButtonComponent page='Rentals' category='Deposit' additionalOptions={`?rentalId=${id}`} />
        </>
    )
}

export default DepositsOfRental