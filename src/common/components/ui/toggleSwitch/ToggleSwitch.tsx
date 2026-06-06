import React from 'react'
import './ToggleSwitch.css'

type ToggleSwitchProps = {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    title?: string;
    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    defaultChecked?: boolean;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onChange, name, id, onClick, defaultChecked, checked, disabled, className, title }: any) => {
    return (
        <div>
            <div className={`checkbox_item citem_1 d-flex gap-1 ${className}`}>
                <label className="checkbox_wrap">
                    <input type="checkbox" name={name} id={id} value={value} title={title} onChange={onChange} onClick={onClick} className="checkbox_inp" defaultChecked={defaultChecked} checked={checked} disabled={disabled} />
                    <span className={`checkbox_mark ${disabled ? 'disable' : ""}`}></span>
                </label>
            </div>
        </div>
    )
}

export default ToggleSwitch
