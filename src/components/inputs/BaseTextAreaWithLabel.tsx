import React from 'react'

type BaseTextAreaWithLabelProps = {
    labelTitle: string;
    name: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    required?: boolean;
    width?: number;
    maxHeight?: number;
    rows: number;
}

const BaseTextAreaWithLabel = (props: BaseTextAreaWithLabelProps) => {
    return (
        <div className='form-group pb-3 fs-5 fw-semibold' style={{ width: props.width ? `${props.width}px` : undefined }} >
            <label htmlFor={props.name}>
                {props.labelTitle}
                {props.required && (<span style={{ color: '#DD3333' }}>*</span>)}
            </label>

            <textarea
                className='form-control'
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                rows={props.rows}
                style={{ maxHeight: props.maxHeight ? `${props.maxHeight}px` : undefined }}
            />
        </div>
    )
}

export default BaseTextAreaWithLabel