import React, { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useParams } from 'react-router';
import { useState } from 'react'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IVehicleCategory } from '../../interfaces/IVehicleCategory';
import { ApiService } from '../../classes/ApiService';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';
import BaseTextInputWithLabel from '../../components/inputs/BaseTextInputWithLabel';

const CategoryAddEditForm = () => {
    const apiService = new ApiService('Category');
    const { id } = useParams();

    const [categoryObj, setCategoryObj] = useState<IVehicleCategory>({
        id: 0,
        title: '',
    });

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                try {
                    setCategoryObj(await apiService.get<IVehicleCategory>(`/VehicleCategies/${id}`));
                }
                catch { }
            }
            fetch();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Creating new object
        if (!categoryObj.id || categoryObj.id === 0) {
            try {
                await apiService.post<IVehicleCategory>(`VehicleCategies/DTO`, categoryObj)
                    .then(() => window.location.href = '/Vehicles/Categories');
            }
            catch { }
        }
        // Editing object
        else {
            try {
                await apiService.put<IVehicleCategory>(`VehicleCategies/${id}`, categoryObj)
                    .then(() => window.location.href = '/Vehicles/Categories');
            }
            catch { }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <PageHeader title='Category Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <BaseTextInputWithLabel
                        labelTitle='Category Name'
                        name='title'
                        value={categoryObj.title}
                        onChange={handleInputChange}
                        required
                    />
                    <SubmitFormButton id={id} title='Category' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default CategoryAddEditForm