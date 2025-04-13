import React from 'react'

type BaseNumericInputWithLabelProps = {
    labelTitle: string;

    name: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    width?: number;

    minNumber?: number;
    maxNumber?: number;
    stepValue?: number;
    
    additionalLabelBeforeInput?: string;
    additionalLabelAfterInput?: string;
}

const BaseNumericInputWithLabel = (props: BaseNumericInputWithLabelProps) => {
    return (
        <div className='form-group pb-3 fs-5 fw-semibold' style={props.width ? { width: `${props.width}px` } : undefined}>
            <label htmlFor={props.name}>
                {props.labelTitle}
                {props.required && (<span style={{ color: '#DD3333' }}>*</span>)}
            </label>
            <div className="d-flex align-items-center">
                {props.additionalLabelBeforeInput && (
                    <h5 style={{ transform: 'translateY(3px)', paddingRight: '5px' }}>{props.additionalLabelBeforeInput}</h5>
                )}
                <input
                    type={'number'}
                    className='form-control'
                    id={props.name}
                    name={props.name}
                    value={props.value}
                    min={props.minNumber}
                    max={props.maxNumber}
                    step={props.stepValue}
                    onChange={props.onChange}
                    required={props.required}
                />
                {props.additionalLabelAfterInput && (
                    <h5 style={{ transform: 'translateY(3px)', paddingLeft: '5px' }}>{props.additionalLabelAfterInput}</h5>
                )}
            </div>
        </div>
    )
}

export default BaseNumericInputWithLabel