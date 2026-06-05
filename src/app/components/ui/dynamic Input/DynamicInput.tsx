
// Component     : Dynamic Column Compoenent
// Purpose       : this is reusable dynamic column component.
// Created by    : Prateek
// Created Date  : 01-09-2025
// Description   : this is reusable dynamic column component.

import { Row, Col } from "react-bootstrap";
import { ErrorMessage } from "formik";
import { useState } from "react";
import DropDownModal from "./DropDownMdl";
import SelectField from "../SelectBox/SelectField";
import Textfield from "../TextField/TextInput";
import Checkbox from "../checkBox/Checkbox";

const baseTypeOptions = [
    { label: "DROPDOWN", value: "D" },
    { label: "TEXT", value: "T" },
    { label: "CHECKBOX", value: "C" },
    { label: "NUMBER", value: "N" },
    { label: "TEXTAREA", value: "TA" },
    { label: "DATE", value: "DT" },
    { label: "RADIO", value: "R" },
];
interface DynamicInputProps {
    values: any;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
    nameIndex: string;
    totalSteps: number;
    stepIndex: number;
    payloadIndex: number;
    mainInitialFieldValue: any
    tabIndex: any;

}

const DynamicInput: React.FC<DynamicInputProps> = ({ values, handleBlur, setFieldValue, setFieldTouched, nameIndex, totalSteps, stepIndex, payloadIndex, mainInitialFieldValue, tabIndex }) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const columnsTypeOption = totalSteps > 1
        ? [...baseTypeOptions, { label: "PREVIOUS RESPONSE", value: "P" }]
        : baseTypeOptions;

    return (
        <>
            <Row>
                <Col md={3} className="mt-md-0 mt-2">
                    <SelectField
                        placeholder="Select Input Type"
                        required
                        label="Input Type"
                        options={columnsTypeOption}
                        name={`${nameIndex}.type`}
                        value={values.type ? columnsTypeOption.find((opt: any) => opt.value === values.type) || null : null}
                        tabIndex={tabIndex()}
                        onChange={(e: any) => {
                            setFieldValue("type", e.value);
                            setFieldValue("typeLbl", e.label);

                            if (["D", "R", "C"].includes(e.value)) {
                                setShowModal(true);
                                setFieldValue("columnData", [{ val: "", id: 0 }])
                            } else {
                                setFieldValue("columnData", [{ val: "" }]);
                            }
                        }}
                        onBlur={() => setFieldTouched("type", true)}
                    />
                    <ErrorMessage name={`${nameIndex}.type`} className="ErrorMessage" component="div" />

                    {["D", "R", "C"].includes(values.type) && (
                        <>
                            {values?.columnData?.filter((c: any) => c.deleteFlag !== "Y" && c.val.trim() !== "")?.length > 0 ? (
                                <span className="text-xs text-success ps-2">
                                    {values.columnData.filter((c: any) => c.deleteFlag !== "Y" && c.val.trim() !== "").length}{" "} values inserted{" "}
                                    <span className="text-danger text-sm" style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}  > Edit </span>
                                </span>
                            ) : (
                                <span className="text-orange text-sm" style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}  >
                                    Add Options
                                </span>
                            )}
                        </>
                    )}
                </Col>


                {(values.type !== "P") ? (

                    <Col md={3} >
                        <Textfield
                            label="Input Label Name"
                            placeholder="Enter Input Label Name"
                            name={`${nameIndex}.label`}
                            type="text"
                            tabIndex={tabIndex()}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setFieldValue(`label`, e.target.value);
                            }}
                            required
                            maxLength={25}
                            onBlur={() => { setFieldTouched("label", true) }}
                            value={values.label}
                        />
                        <ErrorMessage name={`${nameIndex}.label`} className="ErrorMessage" component="div" />
                    </Col>
                ) : (
                    <Col md={3}>
                        <Textfield
                            className="rounded-1 w-100"
                            name={`demo`}
                            label="Label"
                            type="text"
                            disabled
                            onBlur={handleBlur}
                        />
                    </Col>
                )
                }

                <Col md={2}>
                    <Textfield
                        label={"Input Key"}
                        placeholder="Enter Input Key"
                        name={`${nameIndex}.payloadVal`}
                        id="payloadVal"
                        type="text"
                        tabIndex={tabIndex()}
                        value={values.payloadVal}
                        onChange={(e) => {
                            setFieldValue(`payloadVal`, e.target.value);
                        }}
                        maxLength={25}
                        onBlur={() => { setFieldTouched("payloadVal", true) }}
                        required
                    />
                    <ErrorMessage name={`${nameIndex}.payloadVal`} className='ErrorMessage' component="div" />
                </Col>

                {(values?.type === "T" || values?.type === "N" || values?.type === "TA" || values?.type === "DT" || values?.type === "C") &&
                    <>
                        {(values.type === "T" || values.type === "N" || values.type === "TA" || values.type === "DT") &&
                            <>
                                <Col md={2}>
                                    <Textfield
                                        label={values.type === 'DT' ? "Min Days" : "Min Length"}
                                        name="minLength"
                                        placeholder={`Enter ${values.type === 'DT' ? "Min Days" : "Min Length"}`}
                                        type="text"
                                        id="minLength"
                                        // placeholder={values.type === 'DATE' ? "Min Days" : "Min Length"}
                                        value={values.minLength}
                                        maxLength={2}
                                        tabIndex={tabIndex()}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            e.preventDefault();
                                            const { value } = e.target;
                                            const regex = /^[0-9]*[.,]?[0-9]*$/;
                                            if (regex.test(value.toString())) {
                                                setFieldValue("minLength", value);
                                            }
                                        }}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <ErrorMessage name={`${nameIndex}.minLength`} className='ErrorMessage' component="div" />
                                </Col>
                                <Col md={2}>
                                    <Textfield
                                        label={values.type === 'DT' ? "Max Days" : "Max Length"}
                                        name="maxLength"
                                        placeholder={`Enter ${values.type === 'DT' ? "Max Days" : "Max Length"}`}
                                        type="text"
                                        id="maxLength"
                                        tabIndex={tabIndex()}
                                        // placeholder={values.type === 'DATE' ? "Max Days" : "Min Length"}
                                        value={values.maxLength}
                                        maxLength={3}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            e.preventDefault();
                                            const { value } = e.target;
                                            const regex = /^[0-9]*[.,]?[0-9]*$/;
                                            if (regex.test(value.toString())) {
                                                setFieldValue("maxLength", value);
                                            }
                                        }}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <ErrorMessage name={`${nameIndex}.maxLength`} className="ErrorMessage" component="div" />
                                </Col>
                            </>
                        }

                        {/* {values.type !== "DT" && values.type !== "C" && ( */}
                        <>


                            {/* <Col md={2} className='mt-3'>
                                <Checkbox
                                    label="Encryption"
                                    name='SecureFlag'
                                    checked={values.SecureFlag === "Y"}
                                    onChange={(e: any) => {
                                        setFieldValue("SecureFlag", e.target.checked ? "Y" : "N");
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Col>
                            <Col md={2} className='mt-3'>
                                <Checkbox
                                    label="Masking"
                                    name='MaskFlag'
                                    checked={values.MaskFlag === "Y"}
                                    onChange={(e: any) => {
                                        setFieldValue("MaskFlag", e.target.checked ? "Y" : "N");
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Col> */}
                        </>
                        {/* )} */}
                    </>
                }

                <Col md={6} className="pt-2 ps-3">
                    <Checkbox
                        name='required'
                        label="Required"
                        id={`${nameIndex}.required`}
                        tabIndex={tabIndex()}
                        checked={values.required === "Y"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue("required", e.target.checked ? "Y" : "N");
                        }}
                    />
                </Col>

            </Row>

            <DropDownModal
                show={showModal}
                onClose={() => setShowModal(false)}
                setInitialFieldValue={setFieldValue} // use for Formik set field Value
                mainInitialFieldValue={mainInitialFieldValue} // in this store whole form formik values
                stepIndex={stepIndex}
                values={values}
                setFieldValue={setFieldValue}
                payloadIndex={payloadIndex}
                optionData={values.columnData}
            />
        </>
    );
};

export default DynamicInput;
