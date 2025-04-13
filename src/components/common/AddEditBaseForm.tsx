import React, { ReactNode } from 'react'


type BaseFormProps = {
    children: ReactNode;
}

const AddEditBaseForm = (props: BaseFormProps) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
            <div className='p-4' style={{ width: '100%', maxWidth: '1000px', border: '1px solid var(--mainColor3)', borderRadius: '20px', background: 'rgb(251, 251, 251)' }}>
                <div className='container'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AddEditBaseForm