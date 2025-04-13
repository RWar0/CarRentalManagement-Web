import React from 'react'
import EditButtonComponent from '../common/EditButtonComponent';
import DeleteButtonComponent from '../common/DeleteButtonComponent';
import ActionsButtonComponent, { ActionButtonSubmenuComponent, ActionButtonSubmenuDividerComponent } from '../common/ActionsButtonComponent';


type VehicleListComponentWithoutButtons = {
    id: number,
    brand: string,
    model: string,
    production: number,
    color?: string,
}

export const VehicleListComponentWithoutButtons = (props: VehicleListComponentWithoutButtons) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>directions_car</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <h5 className='m-0 p-0'>{props.brand} {props.model}</h5>
                <span className='fw-semibold'>{props.production}<span className='fw-normal'>, color: {props.color ?? "N/A"}</span></span>
            </div>
        </div>
    )
}

type CarListComponentProp = {
    id: number,
    brand: string,
    model: string,
    production: number,
    category: string,
    color?: string,
}

const CarListComponent = (props: CarListComponentProp) => {
    return (
        <div className="m-0 p-0 mt-2 pb-2 ms-2 d-flex flex-row align-items-center border-bottom">
            <span className="material-symbols-outlined fs-1 pe-2" style={{ color: 'var(--additionalColor1)' }}>directions_car</span>
            <h4 style={{ color: 'var(--additionalColor1)' }}>#{props.id}</h4>
            <div className="d-flex flex-column fw-medium ps-3">
                <h5 className='m-0 p-0'>{props.brand} {props.model} - ({props.category})</h5>
                <span className='fw-semibold'>{props.production}<span className='fw-normal'>, color: {props.color ?? "N/A"}</span></span>
            </div>
            <div className='ps-4'>
                <ActionsButtonComponent buttonTitle='Check'>
                    <ActionButtonSubmenuComponent subButtonTitle='Rentals of Vehicle' onClickMethod={() => window.location.href = `/Rentals/RentalsOfVehicle/${props.id}`} />
                    <ActionButtonSubmenuDividerComponent />
                    <ActionButtonSubmenuComponent subButtonTitle='Fuelings of Vehicle' onClickMethod={() => window.location.href = `/Services/FuelingsOfVehicle/${props.id}`} />
                    <ActionButtonSubmenuComponent subButtonTitle='Insurances of Vehicle' onClickMethod={() => window.location.href = `/Vehicles/InsurancesOfVehicle/${props.id}`} />
                    <ActionButtonSubmenuComponent subButtonTitle='Services of Vehicle' onClickMethod={() => window.location.href = `/Services/ServicesOfVehicle/${props.id}`} />
                </ActionsButtonComponent>

                <EditButtonComponent id={props.id} category='Vehicles' page='editVehicle' />
                <DeleteButtonComponent id={props.id} apiPage='Vehicles' />
            </div>
        </div>
    )
}

export default CarListComponent