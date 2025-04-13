import React, { useEffect, useState, useMemo } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useLocation, useParams } from 'react-router'
import AddEditBaseForm from '../../components/common/AddEditBaseForm'
import { IRentalForPost } from '../../interfaces/IRental'
import { IReservedDates } from '../../interfaces/IReservedDates'
import { ApiService } from '../../classes/ApiService'
import CustomerSelectorWithLabel from '../../components/inputs/CustomerSelectorWithLabel'
import VehicleSelectorWithLabel from '../../components/inputs/VehicleSelectorWithLabel'
import FilteredDateInputWithLabel from '../../components/inputs/FilteredDateInputWithLabel'
import SubmitFormButton from '../../components/inputs/SubmitFormButton'

// Converting Date to string format
const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
}

const RentalAddEditForm = () => {
    const apiService = new ApiService('Rental');

    const querySearch = new URLSearchParams(useLocation().search);
    const queryCustomerId = querySearch.get("customerId");
    const queryVehicleId = querySearch.get("vehicleId");

    const { id } = useParams()

    const [reservedDates, setReservedDates] = useState<IReservedDates[]>([])

    const [rentalObj, setRentalObj] = useState<IRentalForPost>({
        id: 0,
        customerId: -1,
        vehicleId: -1,
        beginDate: "",
        endDate: "",
    })

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    setRentalObj(await apiService.get<IRentalForPost>(`/Rentals/DTO/${id}`));
                }
                catch { }
            }
            fetchData()
        }
        else {
            if (queryCustomerId) {
                try {
                    setRentalObj((prevState) => ({
                        ...prevState,
                        customerId: parseInt(queryCustomerId),
                    }));
                }
                catch { }
            }
            if (queryVehicleId) {
                try {
                    setRentalObj((prevState) => ({
                        ...prevState,
                        vehicleId: parseInt(queryVehicleId),
                    }));
                }
                catch { }
            }
        }
    }, [id])

    useEffect(() => {
        setRentalObj(prev => ({
            ...prev,
            beginDate: "",
            endDate: ""
        }))
        if (rentalObj.vehicleId > 0) {
            const fetchReservedDatesOfVehicle = async () => {
                try {
                    if (id) {
                        try {
                            setReservedDates(await apiService.get<IReservedDates[]>(`/Rentals/GetFutureRentalsDatesOfVehicleWithoutSpecificOne/${id}/${rentalObj.vehicleId}`));
                        }
                        catch { }
                    }
                    else {
                        try {
                            setReservedDates(await apiService.get<IReservedDates[]>(`/Rentals/FutureRentalsOfTheVehicle/${rentalObj.vehicleId}`));
                        }
                        catch { }
                    }
                } catch { }
            }
            fetchReservedDatesOfVehicle()
        }
    }, [rentalObj.vehicleId])

    const isDateAvailable = (date: Date): boolean => {
        const reservedRanges = reservedDates.map(range => ({
            start: new Date(new Date(range.beginDate).setDate(new Date(range.beginDate).getDate() - 1)),
            end: new Date(range.endDate),
        }))
        return reservedRanges.every(range => date < range.start || date > range.end)
    }

    const nextReservedStartDate = useMemo(() => {
        if (!rentalObj.beginDate) return null
        const selectedBegin = new Date(rentalObj.beginDate)
        const futureReservations = reservedDates
            .map(r => new Date(r.beginDate))
            .filter(d => d > selectedBegin)
        if (futureReservations.length === 0) return null
        return new Date(Math.min(...futureReservations.map(d => d.getTime())))
    }, [rentalObj.beginDate, reservedDates]);

    const maxEndDate = useMemo(() => {
        if (!nextReservedStartDate) return null
        const maxDate = new Date(nextReservedStartDate)
        maxDate.setDate(maxDate.getDate() - 1)
        return maxDate
    }, [nextReservedStartDate]);

    const handleBeginDateChange = (date: Date | null) => {
        if (date) {
            if (!isDateAvailable(date)) {
                alert("Selected begin date is not available!\nPlease select available one!");
                return
            }
            setRentalObj(prev => ({
                ...prev,
                beginDate: formatDate(date),
                endDate: ""
            }))
        }
    }

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            if (!isDateAvailable(date)) {
                alert("Selected end date is not available!\nPlease select available one!");
                return
            }

            if (maxEndDate && date > maxEndDate) {
                alert(`End date cannot be greater than: ${formatDate(maxEndDate)}.`)
                return
            }
            setRentalObj(prev => ({
                ...prev,
                endDate: formatDate(date)
            }))
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setRentalObj(prevState => ({
            ...prevState,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (rentalObj.vehicleId === -1) {
            alert("Please select a valid vehicle.")
            return
        }
        if (rentalObj.customerId === -1) {
            alert("Please select a valid customer.")
            return
        }
        if (rentalObj.beginDate > rentalObj.endDate) {
            alert("Begin date cannot be greater or equal end date")
            return
        }

        if (!rentalObj.id || rentalObj.id === 0) {
            try {
                await apiService.post<IRentalForPost>(`Rentals/DTO`, rentalObj)
                    .then(() => window.location.href = '/Rentals/List');
            }
            catch { }
        } else {
            try {
                await apiService.put<IRentalForPost>(`Rentals/DTO/${id}`, rentalObj)
                    .then(() => window.location.href = '/Rentals/List');
            }
            catch { }
        }
    }

    return (
        <>
            <PageHeader title='Rental Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <CustomerSelectorWithLabel
                        name='customerId'
                        value={rentalObj.customerId}
                        onChange={handleSelectChange}
                    />

                    <VehicleSelectorWithLabel
                        name='vehicleId'
                        value={rentalObj.vehicleId}
                        onChange={handleSelectChange}
                    />
                    
                    <FilteredDateInputWithLabel
                        labelTitle='Begin Date'
                        name='beginDate'
                        selectedDate={rentalObj.beginDate}
                        onChange={handleBeginDateChange}
                        filterDate={isDateAvailable}
                        minDate={new Date()}
                        required
                    />
                    
                    <FilteredDateInputWithLabel
                        labelTitle='End Date'
                        name='endDate'
                        selectedDate={rentalObj.endDate}
                        onChange={handleEndDateChange}
                        filterDate={isDateAvailable}
                        minDate={rentalObj.beginDate}
                        maxDate={maxEndDate}
                        required
                    />

                    <SubmitFormButton id={id} title='Rental' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default RentalAddEditForm
