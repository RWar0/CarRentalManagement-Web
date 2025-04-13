import React, { useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { useParams } from 'react-router';
import { useState } from 'react'
import AddEditBaseForm from '../../components/common/AddEditBaseForm';
import { IService } from '../../interfaces/IService';
import { ApiService } from '../../classes/ApiService';
import BaseTextInputWithLabel from '../../components/inputs/BaseTextInputWithLabel';
import BaseTextAreaWithLabel from '../../components/inputs/BaseTextAreaWithLabel';
import SubmitFormButton from '../../components/inputs/SubmitFormButton';

const ServiceAddEditForm = () => {
    const { id } = useParams();
    const apiService = new ApiService("Service");
    const [serviceObj, setServiceObj] = useState<IService>({
        id: 0,
        title: '',
        description: '',
    });


    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    setServiceObj(await apiService.get<IService>(`Services/DTO/${id}`));
                } catch { }
            };
            fetchData();
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Creating object
        if (!serviceObj.id || serviceObj.id === 0) {
            try {
                await apiService.post<IService>(`Services/DTO`, serviceObj)
                    .then(() => window.location.href = '/Services/List');
            } catch { }
        }
        // Editing object
        else {
            try {
                await apiService.put<IService>(`Services/DTO/${id}`, serviceObj)
                    .then(() => window.location.href = '/Services/List');
            } catch { }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServiceObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <PageHeader title='Service Form' />
            <AddEditBaseForm>
                <form onSubmit={handleSubmit}>
                    <BaseTextInputWithLabel
                        labelTitle='Service Title'
                        name='title'
                        value={serviceObj.title}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <BaseTextAreaWithLabel
                        labelTitle='Description'
                        name='description'
                        value={serviceObj.description ?? ""}
                        onChange={handleTextAreaChange}
                        rows={6}
                        maxHeight={250}
                        
                    />

                    <SubmitFormButton id={id} title='Service' />
                </form>
            </AddEditBaseForm>
        </>
    )
}

export default ServiceAddEditForm