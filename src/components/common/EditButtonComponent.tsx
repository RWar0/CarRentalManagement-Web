import React from 'react'
import { Link } from 'react-router';

type EditButtonComponentProp = {
    id: number,
    category: string,
    page: string,
}

const EditButtonComponent = (props: EditButtonComponentProp) => {
    return (
        <Link className='editVehicleOnListButton' to={`/${props.category}/${props.page}/${props.id}`}>
            Edit
        </Link>
    )
}

export default EditButtonComponent