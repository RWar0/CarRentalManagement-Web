import React, { useEffect, useState } from 'react'
import { IFollowingRental } from '../../interfaces/IRental';
import { ApiService } from '../../classes/ApiService';

type ReservationComponentProps = {
  person: string;
  car: string;
  date: string;
}

const ReservationComponent = (props: ReservationComponentProps) => {
  return (
    <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
      <span className="material-symbols-outlined fs-1 pe-3" style={{ color: 'var(--additionalColor1)' }}>person_pin_circle</span>

      <div className="d-flex flex-column">
        <h5 className='m-0 p-0'>{props.person} - {props.car}</h5>

        <p className='fs-5 m-0 p-0'>{props.date}</p>
      </div>
    </div>
  )
}

const FollowingReservationsComponent = ({ quantityOfReservations }: { quantityOfReservations: number }) => {
  const apiService = new ApiService('Following Rentals');
  const [followingRentalsObj, setFollowingRentalsObj] = useState<IFollowingRental[]>([]);

  async function fetchData() {
    try {
      setFollowingRentalsObj(await apiService.get<IFollowingRental[]>(`/Rentals/Following/${quantityOfReservations}`));
    }
    catch { }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid m-0 p-0 pb-3">
      {followingRentalsObj.map((item, index) => (
        <ReservationComponent key={index} person={item.customerFullName} car={item.vehicleName} date={item.beginDate} />
      ))}
    </div>
  )
}

export default FollowingReservationsComponent