import React from 'react'
import { ApiService } from '../../classes/ApiService';

type DeleteButtonComponentProps = {
    id: number,
    apiPage: string,
}

const DeleteButtonComponent = (props: DeleteButtonComponentProps) => {
    const apiService = new ApiService(`${props.apiPage}`);
    async function handleDeleteButton() {
        await apiService.delete(`/${props.apiPage}/${props.id}`)
            .then(() => window.location.reload());
    }

    return (
        <button className='deleteVehicleOnListButton' onClick={() => handleDeleteButton()}>Delete</button>
    )
}

export default DeleteButtonComponent