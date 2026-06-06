import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

type ModeType = 'single' | 'multiple' | 'range';

interface DatepickerProps {
    value?: Date | Date[] | string | undefined;
    onChange?: (selectedDates: Date[]) => void;
    options?: Record<string, any>;
    mode?: ModeType; // Optional
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    tabIndex?: number;
    label?: string;
    className?: string;
    name?: string;
    size?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    style?: React.CSSProperties;
}

const Datepicker: React.FC<DatepickerProps> = ({
    value,
    onChange,
    options = {},
    mode = 'single',
    onBlur,
    tabIndex,
    label,
    className = '',
    name,
    required,
    disabled,
    placeholder,
    style,
}) => {
    return (
        <div className="textfield">
            {label && (
                <label
                    className={`input-label text-xs d-flex align-items-center gap-1 ${required ? 'required' : ''
                        }`}
                    style={{ fontSize: '12px', marginBottom: '2px' }}
                >
                    {label}
                </label>
            )}

            <Flatpickr
                id={name}
                className={`form-control form-control-sm ${className}`}
                value={value}
                placeholder={placeholder}
                name={name}
                style={{ height: '40px', ...style }}
                disabled={disabled}
                options={{
                    mode,
                    ...options,
                }}
                onBlur={onBlur}
                tabIndex={tabIndex}
                onChange={onChange}
            />
        </div>
    );
};

export default Datepicker;