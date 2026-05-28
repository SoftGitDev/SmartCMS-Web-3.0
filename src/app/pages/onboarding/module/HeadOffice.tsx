// Purpose: OnBoarding Step Second - Head Office Component
// Created by: Harish
// Created Date: 21-05-2026

// Change History:
// 21-05-2026 | Harish | Created Head Office Component
// --------------------------------------------------------------

import React from 'react';
import { Row, Col, } from 'react-bootstrap';

import { Building2, Hash, Phone, MapPin, Map, Landmark, EarthIcon, } from 'lucide-react';

import { ErrorMessage as FormikErrorMessage } from 'formik';
import Textfield from '../../../components/ui/TextField/TextInput';
import SelectField from '../../../components/ui/SelectBox/SelectField';


// =========================
// Props Interface
// =========================
interface HeadOfficeProps {
    values: any;
    setFieldValue: (field: string, value: any) => void;
    ErrorMessage: typeof FormikErrorMessage;
    handleBlur: any;
    getNextTabIndex: () => number;
}


// =========================
// State Options
// =========================

const stateOptions = [

    {
        label: 'Rajasthan',
        value: 'rajasthan',
    },
    {
        label: 'Gujarat',
        value: 'gujarat',
    },
];


// =========================
// Component
// =========================

const HeadOffice: React.FC<HeadOfficeProps> = ({ values, setFieldValue, ErrorMessage, handleBlur, getNextTabIndex, }) => {

    return (
        <div className="p-4 pt-0">
            <Row className="g-3">
                {/* Branch Name */}
                <Col md={6}>
                    <Textfield
                        label="Branch Name"
                        name="branchName"
                        placeholder="Enter branch name"
                        required
                        maxLength={100}
                        value={values.branchName}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={Building2}
                        type='text'
                        onChange={(e) => {

                            const regex = /^[A-Za-z\s]*$/;

                            if (regex.test(e.target.value)
                            ) {
                                setFieldValue('branchName', e.target.value);
                            }
                        }}
                    />
                    <ErrorMessage name="branchName" component="div" className="ErrorMessage" />
                </Col>

                {/* Branch Code */}
                <Col md={6}>
                    <Textfield
                        label="Branch Code"
                        name="branchCode"
                        placeholder="Enter branch code"
                        required
                        maxLength={20}
                        type='text'
                        value={values.branchCode}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={Hash}
                        onChange={(e) => {
                            const regex = /^[A-Za-z0-9]*$/;
                            if (regex.test(e.target.value)) {
                                setFieldValue('branchCode', e.target.value.toUpperCase());
                            }
                        }}
                    />
                    <ErrorMessage name="branchCode" component="div" className="ErrorMessage" />
                </Col>

                {/* Contact Details */}
                <Col md={6}>
                    <Textfield
                        label="Contact Details"
                        name="contactNo"
                        placeholder="Enter contact number"
                        required
                        type='text'
                        maxLength={10}
                        value={values.contactNo}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={Phone}
                        onChange={(e) => {
                            const regex = /^[0-9]*$/;
                            if (regex.test(e.target.value)) {
                                setFieldValue('contactNo', e.target.value);
                            }
                        }}
                    />
                    <ErrorMessage name="contactNo" component="div" className="ErrorMessage" />
                </Col>
                {/* Address Line 1 */}
                <Col md={6}>
                    <Textfield
                        label="Address Line 1"
                        name="addressLine1"
                        placeholder="Enter address line 1"
                        required
                        type='text'
                        maxLength={200}
                        value={values.addressLine1}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={MapPin}
                        onChange={(e) => {
                            setFieldValue('addressLine1', e.target.value);
                        }}
                    />
                    <ErrorMessage name="addressLine1" component="div" className="ErrorMessage" />
                </Col>
                {/* Address Line 2 */}
                <Col md={6}>

                    <Textfield
                        label="Address Line 2"
                        name="addressLine2"
                        placeholder="Enter address line 2"
                        maxLength={200}
                        type='text'
                        value={values.addressLine2}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={Map}
                        onChange={(e) => { setFieldValue('addressLine2', e.target.value); }} />

                </Col>
                {/* Country */}
                <Col md={6}>
                    <Textfield
                        label="Country"
                        name="country"
                        placeholder="Enter country"
                        required
                        type='text'
                        maxLength={30}
                        value={values.country}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={EarthIcon}
                        onChange={(e) => { setFieldValue('country', e.target.value); }}
                    />
                    <ErrorMessage name="country" component="div" className="ErrorMessage" />
                </Col>
                {/* State */}
                <Col md={6}>
                    <SelectField
                        label="State"
                        placeholder="Select state"
                        required
                        options={stateOptions}
                        tabIndex={getNextTabIndex()}
                        value={values.state}
                        onChange={(selected) => { setFieldValue('state', selected); }}
                    />
                    <ErrorMessage name="state" component="div" className="ErrorMessage" />
                </Col>
                {/* City */}
                <Col md={3}>
                    <Textfield
                        label="City"
                        name="city"
                        placeholder="Enter city"
                        required
                        type='text'
                        maxLength={50}
                        value={values.city}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={Landmark}
                        onChange={(e) => {
                            const regex = /^[A-Za-z\s]*$/;
                            if (regex.test(e.target.value)) {
                                setFieldValue('city', e.target.value);
                            }
                        }}
                    />
                    <ErrorMessage name="city" component="div" className="ErrorMessage" />
                </Col>
                {/* Pin Code */}
                <Col md={3}>
                    <Textfield
                        label="Pin Code"
                        name="pinCode"
                        placeholder="Enter pin code"
                        required
                        type='text'
                        maxLength={6}
                        value={values.pinCode}
                        tabIndex={getNextTabIndex()}
                        onBlur={handleBlur}
                        IconProp={Hash}
                        onChange={(e) => {
                            const regex = /^[0-9]*$/;
                            if (regex.test(e.target.value)) {
                                setFieldValue('pinCode', e.target.value);
                            }
                        }}
                    />
                    <ErrorMessage name="pinCode" component="div" className="ErrorMessage" />
                </Col>

            </Row>

        </div>
    );
};

export default HeadOffice;