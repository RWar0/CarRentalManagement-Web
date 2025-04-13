import React from 'react'

type CheckBoxWithLabelProps = {
    labelTitle: string;
    name: string;
    value: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckBoxWithLabel = (props: CheckBoxWithLabelProps) => {
    return (
        <div className='form-group pb-3 pt-1 fs-5 fw-semibold'>
            <input
                type='checkbox'
                className='form-check-input me-2'
                id={props.name}
                checked={props.value}
                onChange={props.onChange}
                style={{ border: '1px solid rgb(129, 129, 129)' }}
            />
            <label className='fs-5' htmlFor={props.name}>{props.labelTitle}</label>
        </div>
    )
}

export default CheckBoxWithLabel