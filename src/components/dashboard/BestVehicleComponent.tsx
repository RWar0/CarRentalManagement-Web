import React, { useEffect, useState } from 'react'
import { ApiService } from '../../classes/ApiService';

const BestVehicleComponent = () => {
  const apiService = new ApiService('Best Vehicle');
  const [vehicleStats, setVehicleStats] = useState({ vehicleName: '', rentalQuantity: 0 });

  async function fetchData() {
    try {
      setVehicleStats(await apiService.get<{ vehicleName: '', rentalQuantity: 0 }>('/Rentals/TopVehicle'));
    }
    catch { }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid m-0 p-0 pb-3">
      <h5 className='pt-2'>The most commonly rented car is</h5>
      <h3 className='pt-2 text-center fw-bold' style={{ color: 'var(--additionalColor1)', textShadow: '1px 1px 1px rgb(207, 207, 207)' }}>{vehicleStats.vehicleName}</h3>

      <h5 className='pt-3 ps-2 text-black-50'>Vehicle has been rented:</h5>
      <h4 className='pt-1 text-center fw-bold'>{vehicleStats.rentalQuantity} <span className='fw-medium' style={{ color: 'rgb(70, 70, 70)' }}>times</span></h4>
    </div>
  )
}

export default BestVehicleComponent