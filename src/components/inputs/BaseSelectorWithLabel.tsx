import React from 'react'

type BaseSelectorWithLabelProps = {
    labelTitle: string;
    name: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    width?: number;
    
    objectsData: Array<{ value: string | number, label?: string }>;
    nonSelectedItemName: string;
    nonSelectedItemNumericValue?: number;
}

const BaseSelectorWithLabel = (props: BaseSelectorWithLabelProps) => {
    return (
        <div className='form-group pb-3 fs-5 fw-semibold' style={props.width ? { width: `${props.width}px` } : undefined}>
            <label htmlFor={props.name}>
                {props.labelTitle}
                <span style={{ color: '#DD3333' }}>*</span>
            </label>
            <br />
            <select
                className='form-control'
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            >
                <option key="N/A" value={props.nonSelectedItemNumericValue ? props.nonSelectedItemNumericValue : "N/A"}>Select {props.nonSelectedItemName}</option>
                {props.objectsData.map((item) => (
                    <option key={item.value} value={item.value}>{item.label ?? item.value + ""}</option>
                ))}
            </select>
        </div>
    )
}

export default BaseSelectorWithLabel