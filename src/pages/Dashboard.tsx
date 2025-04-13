import React from 'react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card.js'
import IncomesComponent from '../components/dashboard/IncomesComponent.js';
import BestVehicleComponent from '../components/dashboard/BestVehicleComponent.js';
import BestCustomerComponent from '../components/dashboard/BestCustomerComponent.js';
import FollowingReservationsComponent from '../components/dashboard/FollowingReservationsComponent.js';
import RentedCardChart from '../components/dashboard/RentedCardChart';

function Dashboard() {    
    return (
        <div className='m-0 p-0 w-100'>
            <PageHeader title='Dashboard' />
            <div className='container-fluid m-0 p-0 w-100 pb-5'>

                <div className="row m-0 p-0 gap-0">
                    <div className="row m-0 p-0 row-gap-3 pb-3">
                        <Card md={7} lg={7} xl={8} title='Chart of rented vehicles' height='100%'><RentedCardChart /></Card>
                        <Card md={5} lg={5} xl={4} title='The following reservations' height='100%'><FollowingReservationsComponent quantityOfReservations={6} /></Card>
                    </div>
                    <div className="row m-0 p-0 row-gap-3">
                        <Card title='Best Vehicle' height='100%'><BestVehicleComponent /></Card>
                        <Card title='Best Customer' height='100%'><BestCustomerComponent /></Card>

                        <Card title='Incomes in this month' height='100%'><IncomesComponent /></Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard