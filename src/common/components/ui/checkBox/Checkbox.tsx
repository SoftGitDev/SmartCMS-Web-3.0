import React from 'react';
import './Checkbox.css';

type checkboxPros = {
    label?: any,
    name?: string,
    value?: any,
    onChange?: any,
    onBlur?: any,
    onClick?: any,
    checked?: any,
    disabled?: boolean,
    className?: string
    tabIndex?: number
    description?: any
    textclass?: string,
    required?: boolean
    id?: any
}

const Checkbox = ({ label, name, id, value, onChange, onBlur, onClick, checked, disabled, className, tabIndex, textclass, required }: checkboxPros) => {
    return (
        <div className={`${label ? "d-flex gap-1" : ""} ${className || ""}`}>
            <label className="checkbox bounce">
                <input type="checkbox" tabIndex={tabIndex} id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} onClick={onClick} checked={checked} disabled={disabled} />
                <svg viewBox="0 0 21 21">
                    <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
            </label>
            <label htmlFor={label} className={`ps-1 text-md ${required ? 'required' : ''} ${textclass} `}>{label}</label>
        </div>
    )
}

export default Checkbox
