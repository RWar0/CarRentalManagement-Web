import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useParams } from 'react-router';
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { ICustomer } from '../../interfaces/ICustomer';
import { ApiService } from '../../classes/ApiService';
import BaseTextInputWithLabel from '../../components/inputs/BaseTextInputWithLabel';
import BaseDateInputWithLabel from '../../components/inputs/BaseDateInputWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const CustomerAddEditForm = () => {
  const { id } = useParams();
  const apiService = new ApiService('Customer');
  const [customerObj, setCustomerObj] = useState<ICustomer>({
    id: 0,
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    placeOfBirth: '',
    pesel: '',
  });

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          setCustomerObj(await apiService.get<ICustomer>(`/Customers/${id}`));
        }
        catch { }
      }
      fetch();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (customerObj.pesel.length !== 11) {
      alert("Please correct PESEL!\nValid PESEL has 11 characters!");
      return;
    }

    // Pesel check for letters
    if (!/^\d+$/.test(customerObj.pesel)) {
      alert("Please correct PESEL!\nPESEL can contain only numbers!");
      return;
    }

    // Creating new object
    if (!customerObj.id || customerObj.id === 0) {
      try {
        await apiService.post<ICustomer>(`Customers`, customerObj)
          .then(() => window.location.href = '/Customers/List');
      }
      catch { }
    }
    // Editing object
    else {
      try {
        await apiService.put<ICustomer>(`Customers/${id}`, customerObj)
          .then(() => window.location.href = '/Customers/List');
      }
      catch { }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <PageHeader title='Customer Form' />
      <AddEditBaseForm>
        <form onSubmit={handleSubmit}>
          <h4 className="fw-bold" style={{ color: 'var(--additionalColor1)' }}>Personal Data</h4>
          <BaseTextInputWithLabel
            labelTitle='Firstname'
            name='firstname'
            value={customerObj.firstname}
            onChange={handleInputChange}
            required
          />

          <BaseTextInputWithLabel
            labelTitle='Lastname'
            name='lastname'
            value={customerObj.lastname}
            onChange={handleInputChange}
            required
          />

          <BaseTextInputWithLabel
            labelTitle='PESEL'
            name='pesel'
            value={customerObj.pesel}
            onChange={handleInputChange}
            inputType='number'
            required
          />

          <h4 className="fw-bold" style={{ color: 'var(--additionalColor1)' }}>Birth information</h4>
          <div className="d-flex flex-wrap">
            <BaseDateInputWithLabel
              labelTitle='Date of birth'
              name='dateOfBirth'
              value={customerObj.dateOfBirth}
              onChange={handleInputChange}
              required
              maxDate={new Date().toISOString().split('T')[0]}
              width={250}
            />

            <BaseTextInputWithLabel
              labelTitle='Place of birth'
              name='placeOfBirth'
              value={customerObj.placeOfBirth}
              onChange={handleInputChange}
              required
              width={300}
            />
          </div>

          <SubmitFormButton id={id} title='Customer' />
        </form>
      </AddEditBaseForm>
    </>
  )
}

export default CustomerAddEditForm
