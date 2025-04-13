import React from 'react'

type SubmitFormButtonProps = {
    id: string | undefined;
    title: string;
}

const SubmitFormButton = (props: SubmitFormButtonProps) => {
    return (
        <div className="d-flex justify-content-center pt-3">
            <button type='submit' className='btn btn-primary'>Save {props.title} {props.id && " - ID: " + props.id}</button>
        </div>
    )
}

export default SubmitFormButton