import React from 'react'

type BaseDateInputWithLabelProps = {
    labelTitle: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    width?: number;
    maxDate?: string;
    minDate?: string;
}

const BaseDateInputWithLabel = (props: BaseDateInputWithLabelProps) => {
    return (
        <div className='form-group pb-3 fs-5 fw-semibold me-5' style={{ width: props.width ? `${props.width}px` : undefined }}>
            <label htmlFor={props.name}>
                {props.labelTitle}
                {props.required && (<span style={{ color: '#DD3333' }}>*</span>)}
            </label>
            <input
                type='date'
                className='form-control'
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                max={props.maxDate}
                min={props.minDate}
                required={props.required}
            />
        </div>
    )
}

export default BaseDateInputWithLabel