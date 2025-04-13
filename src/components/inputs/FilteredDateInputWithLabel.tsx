import React from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type FilteredDateInputWithLabelProps = {
    labelTitle: string;
    name: string;
    selectedDate?: string;
    onChange: (date: Date | null) => void;
    filterDate: (date: Date) => boolean;

    required?: boolean;
    minDate?: string | Date;
    maxDate?: Date | null;
}

const FilteredDateInputWithLabel = (props: FilteredDateInputWithLabelProps) => {
    return (
        <div className='form-group pb-3 fs-5 fw-semibold' style={{ width: '300px' }}>
            <label htmlFor={props.name}>
                {props.labelTitle}
                {props.required && (<span style={{ color: '#DD3333' }}>*</span>)}
            </label>
            <DatePicker
                selected={props.selectedDate ? new Date(props.selectedDate) : null}
                onChange={props.onChange}
                filterDate={props.filterDate}
                dateFormat="yyyy-MM-dd"
                placeholderText='yyyy-mm-dd'
                className='form-control'
                id={props.name}
                autoComplete='off'
                required
                wrapperClassName="d-block"
                minDate={props.minDate ? (typeof props.minDate === 'string' ? new Date(props.minDate) : props.minDate) : undefined}
                maxDate={props.maxDate || undefined}
            />
        </div>
    )
}

export default FilteredDateInputWithLabel