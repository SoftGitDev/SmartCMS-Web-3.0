import React from "react";
import Select, { components, MenuProps } from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import "./Select.css"; // Common CSS

type OptionType = {
    label: string;
    value: string | boolean;
};

type SelectFieldProps = {
    label?: string;
    placeholder?: string;
    name?: string;
    options?: OptionType[];
    value?: any;
    onChange?: (value: any) => void;
    isSearchable?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    required?: boolean;
    isMulti?: boolean;
    autoFocus?: boolean;
    onBlur?: any;
    tabIndex?: any;
    styles?: any;
    labelIcon?: React.ReactNode;
};

// Custom animated Menu component
const AnimatedMenu = (props: MenuProps<OptionType, boolean>) => {
    return (
        <AnimatePresence>
            {props.selectProps.menuIsOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0, ease: "easeOut" }}
                >
                    <components.Menu {...props}>{props.children}</components.Menu>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const customStyles = {
    menu: (provided: any) => ({
        ...provided,
        zIndex: 99999,
    }),
    menuPortal: (provided: any) => ({
        ...provided,
        zIndex: 99999,
    }),
};

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    placeholder = "Select",
    name,
    options,
    value,
    onChange,
    isSearchable = true,
    isDisabled = false,
    isLoading = false,
    required = false,
    isMulti = false,
    onBlur,
    autoFocus,
    tabIndex,
    styles,
    labelIcon
}) => {
    return (
        <div className={required ? "select-required" : ""} style={styles}>
            {label && (
                <label className={`input-label ps-1 text-sm d-flex align-items-center  gap-1 ${required ? 'required' : ''} ${labelIcon ? 'mb-2' : ''}`}>
                    {labelIcon && (
                        <span className="icon-wrapper-xs">
                            {labelIcon}
                        </span>
                    )}
                    {label}
                </label>
            )}
            <Select
                className="select-form"
                name={name}
                placeholder={placeholder}
                styles={{ ...customStyles, ...styles }}
                options={options}
                required={required}
                autoFocus={autoFocus}
                isSearchable={isSearchable}
                isDisabled={isDisabled}
                isMulti={isMulti}
                isLoading={isLoading}
                value={value}
                onChange={(selected: any) => {
                    if (isMulti) {
                        onChange?.(selected as OptionType[]);
                    } else {
                        onChange?.(selected as OptionType);
                    }
                }}
                onBlur={onBlur}
                tabIndex={tabIndex}
                components={{
                    Menu: AnimatedMenu, // override menu with animation
                }}
            />
        </div>
    );
};

export default SelectField;
