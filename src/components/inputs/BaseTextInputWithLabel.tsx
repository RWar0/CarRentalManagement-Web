import React from 'react'

type BaseTextInputWithLabelProps = {
    labelTitle: string;
    name: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    inputType?: string;
    width?: number;
    
    placeholder?: string;
}

const BaseTextInputWithLabel = (props: BaseTextInputWithLabelProps) => {
    return (
        <div className='form-group pb-3 fs-5 fw-semibold' style={props.width ? { width: `${props.width}px` } : undefined}>
            <label htmlFor={props.name}>
                {props.labelTitle}
                {props.required && (<span style={{ color: '#DD3333' }}>*</span>)}
            </label>
            <input
                type={props.inputType ? props.inputType : 'text'}
                className='form-control'
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default BaseTextInputWithLabel