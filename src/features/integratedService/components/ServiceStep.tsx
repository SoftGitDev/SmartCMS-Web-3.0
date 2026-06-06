import React, { useState } from 'react'
import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import RequestPayloadEditor from './RequestPayloadEditor';
import { PlusCircle, Trash, XCircle } from 'lucide-react';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';
import toastNotify from '../../../services/notification/tostNotify';
import Checkbox from '../../../common/components/ui/checkBox/Checkbox';
import IntegServiceResponseMdl from './IntegServiceResponseMdl';
import ResponseMappingMdl from './ResponseMappingMdl';


type ServiceMdlProps = {
    values: any;
    setFieldValue: any;
    handleBlur: any;
    handleChange: any;
    setFieldTouched: any;
    servicesDtlData: any;
    activeTab: string;
    statusData: any;
    stepType: string;
    getNextTabIndex: any;
}

const reqTypeOptions = [
    { label: "GET", value: "G" },
    { label: "POST", value: "I" },
    { label: "PUT", value: "P" },
    { label: "DELETE", value: "D" },
    { label: "HEAD", value: "H" },
    { label: "OPTIONS", value: "O" },
    { label: "TRACE", value: "T" },
];

const contentTypeOptions = [
    { label: "application/json", value: "J" },
    { label: "text/plain", value: "P" },
    { label: "text/html", value: "H" },
    { label: "application/xml", value: "X" },
];

const responseTypeOptions = [
    { label: "application/json", value: "J" },
    { label: "text/plain", value: "P" },
    { label: "application/xml", value: "X" },
];

const authTypeOptions = [
    { label: "None", value: "N" },
    { label: "Basic", value: "B" },
    { label: "Bearer", value: "J" },
];

const ServiceStep: React.FC<ServiceMdlProps> = ({ values, setFieldValue, handleChange, handleBlur, setFieldTouched, stepType, statusData, getNextTabIndex, activeTab, }) => {

    const [showHeaderFields, setShowHeaderFields] = useState<{ [key: number]: boolean }>({});

    const toggleShowHeader = (i: number) => { setShowHeaderFields((prev) => ({ ...prev, [i]: !prev[i], })) };

    return (
        <div>
            {/* Step Content */}
            {values.steps.map((step: any, index: number) => {

                if (step.fieldType !== stepType || step.deleteFlag === "Y") return null;

                const filteredSteps = values.steps.filter((s: any) => s.deleteFlag !== "Y" && s.fieldType === stepType);
                const stepNumber = filteredSteps.findIndex((s: any) => s.id === step.id) + 1;

                return (
                    <>
                        <Accordion defaultActiveKey={['0', '1', '2']} className="mt-3" alwaysOpen>
                            <>
                                {step.fieldType === stepType &&
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                        <Accordion.Header>
                                            <div className="d-flex align-items-center">
                                                <div className="p-2 bg-theme text-primary rounded me-2">
                                                    <span className='fw-bold px-1'>{stepNumber}</span>
                                                </div>
                                                <div>
                                                    <h6 className="m-0 fw-bold text-dark">Step {stepNumber} for Service Configuration</h6>
                                                    <small className="text-muted">Configure how service attributes are handled for Step {stepNumber}</small>
                                                </div>
                                                {(stepNumber > 1) && (
                                                    <XCircle
                                                        size={20}
                                                        className="bg-light me-2 primary rounded-4 cursor-pointer position-absolute end-0 me-5"
                                                        onClick={(e: any) => {
                                                            e.stopPropagation();
                                                            const updatedSteps = values.steps.filter((_: any, i: number) => i !== index);
                                                            setFieldValue("steps", updatedSteps);
                                                            const update = [...values.steps];
                                                            const findInd = values.steps.findIndex((f: any) => f.id === step.id);

                                                            if (step.existFlag === "Y") {
                                                                update[findInd].deleteFlag = "Y";
                                                                setFieldValue("steps", update);
                                                            } else {
                                                                update.splice(findInd, 1);
                                                                setFieldValue("steps", update);
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Row className="mt-2">
                                                <Col md={12} className="mb-3">
                                                    <Textfield
                                                        label="Step Name"
                                                        placeholder='Enter Step Name'
                                                        name={`steps[${index}].StepName`}
                                                        type="text"
                                                        maxLength={500}
                                                        minLength={8}
                                                        value={step.StepName}
                                                        tabIndex={getNextTabIndex()}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        required
                                                    />
                                                    <ErrorMessage name={`steps[${index}].StepName`} component="div" className="ErrorMessage" />
                                                </Col>

                                                <Col md={12} className="mb-3">
                                                    <Textfield
                                                        label="API Path"
                                                        placeholder='Enter API path'
                                                        name={`steps[${index}].apiUrl`}
                                                        type="text"
                                                        maxLength={500}
                                                        minLength={8}
                                                        value={step.apiUrl}
                                                        tabIndex={getNextTabIndex()}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        required
                                                    />
                                                    <ErrorMessage name={`steps[${index}].apiUrl`} component="div" className="ErrorMessage" />
                                                </Col>

                                                <Col md={4} className="mb-3">
                                                    <SelectField
                                                        label='Request Method'
                                                        name={`steps[${index}].reqType`}
                                                        placeholder="Select Request Method"
                                                        options={reqTypeOptions}
                                                        value={step.reqType ? reqTypeOptions.find(opt => opt.value === step.reqType) || null : null}
                                                        tabIndex={getNextTabIndex()}
                                                        onChange={(option: any) => {
                                                            if (option && !Array.isArray(option)) {
                                                                setFieldValue(`steps[${index}].reqType`, option.value);
                                                                setFieldValue(`steps[${index}].reqTypeLbl`, option.label);
                                                            }
                                                        }}
                                                        onBlur={() => setFieldTouched(`steps[${index}].reqType`, true)}
                                                        required
                                                    />
                                                    <ErrorMessage name={`steps[${index}].reqType`} component="div" className="ErrorMessage" />
                                                </Col>

                                                <Col md={4} className="mb-3">
                                                    <SelectField
                                                        label='Request Content Type'
                                                        placeholder="Select Request Content Type"
                                                        options={contentTypeOptions}
                                                        required
                                                        tabIndex={getNextTabIndex()}
                                                        value={step.contentType ? contentTypeOptions.find((opt: any) => opt.value === step.contentType) || null : null}
                                                        onChange={(option: any) => {
                                                            if (option && !Array.isArray(option)) {
                                                                setFieldValue(`steps[${index}].contentType`, option.value);
                                                                setFieldValue(`steps[${index}].contentTypeLbl`, option.label);
                                                            }
                                                        }}
                                                        onBlur={() => setFieldTouched(`steps[${index}].contentType`, true)}
                                                    />
                                                    <ErrorMessage name={`steps[${index}].contentType`} component="div" className="ErrorMessage" />
                                                </Col>

                                                <Col md={4} className="mb-3">
                                                    <SelectField
                                                        label='Response Content Type'
                                                        placeholder="Select Response Content Type"
                                                        options={responseTypeOptions}
                                                        required
                                                        tabIndex={getNextTabIndex()}
                                                        value={step.responseType ? responseTypeOptions.find((opt: any) => opt.value === step.responseType) || null : null}
                                                        onChange={(option: any) => {
                                                            if (option && !Array.isArray(option)) {
                                                                setFieldValue(`steps[${index}].responseType`, option.value);
                                                                setFieldValue(`steps[${index}].responseTypeLbl`, option.label);
                                                            }
                                                        }}
                                                        onBlur={() => setFieldTouched(`steps[${index}].responseType`, true)}
                                                    />
                                                    <ErrorMessage name={`steps[${index}].responseType`} component="div" className="ErrorMessage" />
                                                </Col>

                                                <Col md={4} className="mb-2">
                                                    <SelectField
                                                        placeholder="Select Auth Type"
                                                        label='Auth Type'
                                                        options={authTypeOptions}
                                                        required
                                                        tabIndex={getNextTabIndex()}
                                                        value={step.authType ? authTypeOptions.find(opt => opt.value === step.authType) || null : null}
                                                        onChange={(option: any) => {
                                                            if (option && !Array.isArray(option)) {
                                                                setFieldValue(`steps[${index}].authType`, option.value);
                                                                setFieldValue(`steps[${index}].authTypeLbl`, option.label);
                                                            }
                                                        }}
                                                        onBlur={() => setFieldTouched(`steps[${index}].authType`, true)}
                                                    />
                                                    <ErrorMessage name={`steps[${index}].authType`} component="div" className="ErrorMessage" />
                                                </Col>

                                                {step.authType === "B" && (
                                                    <>
                                                        <Col md={4} className="mb-3">
                                                            <Textfield
                                                                label="Username"
                                                                placeholder='Enter Username'
                                                                name={`steps[${index}].username`}
                                                                type={step?.isShowUserNm ? "text" : "password"}
                                                                maxLength={55}
                                                                tabIndex={getNextTabIndex()}
                                                                minLength={8}
                                                                // IconProp={() => (
                                                                //     <Button variant='' className='p-0' onClick={() => {
                                                                //         const updateVal = [...values.steps];
                                                                //         updateVal[index].isShowUserNm = !updateVal[index].isShowUserNm;
                                                                //         setFieldValue("steps", updateVal);
                                                                //     }}>
                                                                //         {step?.isShowUserNm ? <IoEyeSharp className="text-slate-500" /> : <BsEyeSlashFill className="text-slate-500" />}
                                                                //     </Button>
                                                                // )}
                                                                value={step.username}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            <ErrorMessage name={`steps[${index}].username`} component="div" className="ErrorMessage" />
                                                        </Col>

                                                        <Col md={4} className="mb-3">
                                                            <Textfield
                                                                label="Password"
                                                                placeholder='Enter password'
                                                                name={`steps[${index}].password`}
                                                                type={step?.isShowPassword ? "text" : "password"}
                                                                minLength={8}
                                                                maxLength={55}
                                                                // IconProp={() => (
                                                                //     <Button variant='' className='p-0' onClick={() => {
                                                                //         const updateVal = [...values.steps];
                                                                //         updateVal[index].isShowPassword = !updateVal[index].isShowPassword;
                                                                //         setFieldValue("steps", updateVal);
                                                                //     }}>
                                                                //         {step?.isShowPassword ? <IoEyeSharp className="text-slate-500" /> : <BsEyeSlashFill className="text-slate-500" />}
                                                                //     </Button>
                                                                // )}
                                                                tabIndex={getNextTabIndex()}
                                                                value={step.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            <ErrorMessage name={`steps[${index}].password`} component="div" className="ErrorMessage" />
                                                        </Col>
                                                    </>
                                                )}

                                                {step.authType === "J" && (
                                                    <>
                                                        <Col md={8} className="mb-3">
                                                            <Textfield
                                                                label="Token"
                                                                placeholder='Enter Token'
                                                                name={`steps[${index}].authValue`}
                                                                type={step.isShowAuthValue ? "text" : "password"}
                                                                // IconProp={() => (
                                                                //     <Button variant='' className='p-0' onClick={() => {
                                                                //         const updateVal = [...values.steps];
                                                                //         updateVal[index].isShowAuthValue = !updateVal[index].isShowAuthValue;
                                                                //         setFieldValue("steps", updateVal);
                                                                //     }}>
                                                                //         {step.isShowAuthValue ? <IoEyeSharp /> : <BsEyeSlashFill />}
                                                                //     </Button>
                                                                // )}
                                                                minLength={5}
                                                                maxLength={300}
                                                                tabIndex={getNextTabIndex()}
                                                                value={step.authValue}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            <ErrorMessage name={`steps[${index}].authValue`} component="div" className="ErrorMessage" />
                                                        </Col>
                                                    </>
                                                )}

                                                {/* {step.authType === "N" && (
                                                    <>
                                                        <Col md={8} className="mb-3">
                                                            <Textfield
                                                                className="rounded-1 w-100 bg-light disable"
                                                                label=""
                                                                type="text"
                                                                style={{ height: "35px", backgroundColor: "rgb(227 227 227)" }}
                                                                disabled
                                                            />
                                                        </Col>
                                                    </>
                                                )} */}

                                                {/* Add Header Section  */}
                                                <div className="d-flex justify-content-start rounded-3 w-90 text-xs fw-medium mx-3 ms-1">
                                                    <Button
                                                        variant="link"
                                                        className="text-primary fw-semibold text-xs p-0 pe-1 text-decoration-none"
                                                        onClick={() => {
                                                            const currentHeaders = values.steps[index].headerData || [];
                                                            if (currentHeaders.filter((r: any) => r?.deleteFlag !== "Y").length >= 3) return;

                                                            if (currentHeaders[currentHeaders.length - 1]?.key === '' || currentHeaders[currentHeaders.length - 1]?.value === "") {
                                                                toastNotify("Please fill existing header fields before adding a new one.", "error");
                                                                return;
                                                            }

                                                            const nextSrCode = (currentHeaders.length + 1).toString();
                                                            const maxId = values.steps[index].headerData.length > 0
                                                                ? Math.max(...values.steps[index].headerData.map((m: any) => m.id))
                                                                : 0;

                                                            const newHeader = {
                                                                key: "",
                                                                value: "",
                                                                existFlag: "N",
                                                                deleteFlag: "N",
                                                                srCode: nextSrCode,
                                                                id: maxId + 1
                                                            };

                                                            const updatedHeaders = [...currentHeaders, newHeader];
                                                            setFieldValue(`steps.${index}.headerData`, updatedHeaders);
                                                        }}
                                                    >
                                                        <PlusCircle style={{ marginBottom: "3px" }} size={15} /> Add More Header
                                                    </Button>

                                                </div>

                                                <div>
                                                    {step.headerData.filter((r: any) => r?.deleteFlag !== "Y").length > 0 &&
                                                        <fieldset className="border rounded-3 px-3 mb-3">
                                                            <legend className="float-none w-auto px-2 text-primary mb-0 text-xs fw-medium">Headers</legend>
                                                            {(step.headerData || []).filter((h: any) => h.deleteFlag !== "Y").map((header: any) => {

                                                                const FindIndex = values.steps[index].headerData.findIndex((f: any) => f.id === header.id);
                                                                if (FindIndex === -1) return null;

                                                                const namePath = `steps[${index}].headerData[${FindIndex}]`;
                                                                const headerIndex = (step.headerData || []).filter((h: any) => h.deleteFlag !== "Y").findIndex((f: any) => f.id === header.id);

                                                                return (
                                                                    <div key={header.id}>
                                                                        <div className="mb-2 d-flex align-items-center gap-2 pt-2">
                                                                            <Col md={3} className="ps-0 mb-2">
                                                                                <Textfield
                                                                                    label="Key"
                                                                                    type="text"
                                                                                    name={`${namePath}.key`}
                                                                                    value={header.key}
                                                                                    tabIndex={getNextTabIndex()}
                                                                                    maxLength={45}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                />
                                                                            </Col>

                                                                            <Col md={8} className="p-0 mb-2">
                                                                                <Textfield
                                                                                    label="Value"
                                                                                    type={showHeaderFields[headerIndex] ? "text" : "password"}
                                                                                    // IconProp={() => (<Button variant="" className="p-0" onClick={() => toggleShowHeader(headerIndex)}> {showHeaderFields[headerIndex] ? <IoEyeSharp /> : <BsEyeSlashFill />} </Button>)}
                                                                                    tabIndex={getNextTabIndex()}
                                                                                    name={`${namePath}.value`}
                                                                                    value={header.value}
                                                                                    maxLength={255}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                />
                                                                            </Col>

                                                                            <Col md={1} className="d-flex p-0 mb-2">
                                                                                <Button
                                                                                    variant="outline-danger"
                                                                                    className="btn-sm rounded-2 border-1 pe-0"
                                                                                    onClick={() => {
                                                                                        const currentHeaders = [...values.steps[index].headerData];
                                                                                        const findInd = currentHeaders.findIndex((f: any) => f.id === header.id);

                                                                                        if (findInd === -1) return;

                                                                                        if (header.existFlag === "Y") {
                                                                                            currentHeaders[findInd] = { ...currentHeaders[findInd], deleteFlag: "Y" };
                                                                                        } else {
                                                                                            currentHeaders.splice(findInd, 1);
                                                                                        }
                                                                                        setFieldValue(`steps[${index}].headerData`, currentHeaders);
                                                                                    }}
                                                                                ><Trash className="me-2" /></Button>
                                                                            </Col>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </fieldset>}
                                                </div>


                                                <RequestPayloadEditor
                                                    contentType={step.contentType}
                                                    getTabIndex={getNextTabIndex}
                                                    type='Request Payload'
                                                    value={values.steps[index]?.reqPayload || ""}
                                                    onChange={(updatedJson: string) => setFieldValue(`steps[${index}].reqPayload`, updatedJson)}
                                                />

                                                <RequestPayloadEditor
                                                    contentType={step.responseType}
                                                    getTabIndex={getNextTabIndex}
                                                    type='Response Payload'
                                                    value={values.steps[index]?.respPayload || ""}
                                                    onChange={(updatedJson: string) => setFieldValue(`steps[${index}].respPayload`, updatedJson)}
                                                />

                                                {/* Response payload */}
                                                <div className="flex-grow-1 mt-3">
                                                    <div className='d-flex'>
                                                        <div>
                                                            <h6 className="text-primary text-sm ps-2 fw-semibold ">Response Config</h6>
                                                            <Checkbox
                                                                name={`steps[${index}].isFinalStep`}
                                                                id={`steps[${index}].isFinalStep`}
                                                                label="Is this Final Step ?"
                                                                checked={values.steps[index]?.isFinalStep === "Y"}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    setFieldValue(`steps[${index}].isFinalStep`, e.target.checked ? "Y" : "N");
                                                                    if (e.target.checked) {
                                                                        const successVal = values.steps[index]?.successData.map((s: any, index: number) => ({ ...s, checkFlag: "S", checkFlagLbl: "Success", type: "", typeLbl: "", respMsgType: "", respMsgTypeLbl: "" }));
                                                                        const failedVal = values.steps[index]?.failedData.map((s: any, index: number) => ({ ...s, checkFlag: "F", checkFlagLbl: "Failed", type: "", typeLbl: "", respMsgType: "", respMsgTypeLbl: "" }));
                                                                        setFieldValue(`steps[${index}].successData`, successVal);
                                                                        setFieldValue(`steps[${index}].failedData`, failedVal);
                                                                    } else {
                                                                        const successVal = values.steps[index]?.successData.map((s: any, index: number) => ({ ...s, checkFlag: "S", checkFlagLbl: "Success", type: "", typeLbl: "", key: "", respMsgType: "C", respMsgTypeLbl: "Custom Message" }));
                                                                        const failedVal = values.steps[index]?.failedData.map((s: any, index: number) => ({ ...s, checkFlag: "F", checkFlagLbl: "Failed", type: "", typeLbl: "", key: "", respMsgType: "C", respMsgTypeLbl: "Custom Message" }));
                                                                        setFieldValue(`steps[${index}].successData`, successVal);
                                                                        setFieldValue(`steps[${index}].failedData`, failedVal);
                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                        {/* <div className="ms-auto pe-3">
                                                        <Checkbox
                                                            name={`steps[${index}].apiResponseFlag`}
                                                            id={`steps[${index}].apiResponseFlag`}
                                                            label="Do you want to check API Response"
                                                            checked={values.steps[index]?.apiResponseFlag === "Y"}
                                                            // disabled={
                                                            //     values.steps.filter((s: any) => s.deleteFlag !== "Y" && s.fieldType === stepType).findIndex((s: any) => s.id === step.id) <= values.steps.filter((s: any) => s.deleteFlag !== "Y" && s.fieldType === stepType).length - 1
                                                            // }
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                setFieldValue(`steps[${index}].apiResponseFlag`, e.target.checked ? "Y" : "N");
                                                                if (e.target.checked) {
                                                                    const successVal = values.steps[index]?.successData.map((s: any, index: number) => ({ ...s, checkFlag: "", checkFlagLbl: "", type: "", typeLbl: "", respMsgType: "", respMsgTypeLbl: "" }));
                                                                    const failedVal = values.steps[index]?.failedData.map((s: any, index: number) => ({ ...s, checkFlag: "", checkFlagLbl: "", type: "", typeLbl: "", respMsgType: "", respMsgTypeLbl: "" }));
                                                                    const exceptionVal = values.steps[index]?.exceptionData.map((s: any, index: number) => ({ ...s, checkFlag: "", checkFlagLbl: "", type: "", typeLbl: "", respMsgType: "", respMsgTypeLbl: "" }));
                                                                    setFieldValue(`steps[${index}].successData`, successVal);
                                                                    setFieldValue(`steps[${index}].failedData`, failedVal);
                                                                    setFieldValue(`steps[${index}].exceptionData`, exceptionVal);
                                                                } else {
                                                                    const successVal = values.steps[index]?.successData.map((s: any, index: number) => ({ ...s, checkFlag: "H", checkFlagLbl: "HTTP Response", type: "I", typeLbl: "Integer", key: "", respMsgType: "C", respMsgTypeLbl: "Custom Message" }));
                                                                    const failedVal = values.steps[index]?.failedData.map((s: any, index: number) => ({ ...s, checkFlag: "H", checkFlagLbl: "HTTP Response", type: "I", typeLbl: "Integer", key: "", respMsgType: "C", respMsgTypeLbl: "Custom Message" }));
                                                                    const exceptionVal = values.steps[index]?.exceptionData.map((s: any, index: number) => ({ ...s, checkFlag: "H", checkFlagLbl: "HTTP Response", type: "I", typeLbl: "Integer", key: "", respMsgType: "C", respMsgTypeLbl: "Custom Message" }));
                                                                    setFieldValue(`steps[${index}].successData`, successVal);
                                                                    setFieldValue(`steps[${index}].failedData`, failedVal);
                                                                    setFieldValue(`steps[${index}].exceptionData`, exceptionVal);
                                                                }
                                                            }}
                                                        />
                                                    </div> */}

                                                        {/* <div className="ms-auto pe-3">
                                                            <Checkbox
                                                                name={`steps[${index}].apiResponseFlag`}
                                                                id={`steps[${index}].apiResponseFlag`}
                                                                label="Enable response validation and status mapping"
                                                                checked={values.steps[index]?.apiResponseFlag === "Y"}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    setFieldValue(`steps[${index}].apiResponseFlag`, e.target.checked ? "Y" : "N");
                                                                }}
                                                            />
                                                        </div> */}
                                                    </div>


                                                    <div className='animate-slide-up' style={{ animationDelay: "0s" }}>
                                                        <IntegServiceResponseMdl
                                                            flag="S"
                                                            setFieldValue={setFieldValue}
                                                            apiResponseFlag={values.steps[index]?.apiResponseFlag}
                                                            index={index}
                                                            values={values}
                                                            setFieldTouched={setFieldTouched}
                                                            tabIndex={getNextTabIndex}
                                                        />
                                                    </div>



                                                    <div className='animate-slide-up' style={{ animationDelay: "0s" }}>
                                                        <IntegServiceResponseMdl
                                                            flag="F"
                                                            setFieldValue={setFieldValue}
                                                            apiResponseFlag={values.steps[index]?.apiResponseFlag}
                                                            index={index}
                                                            values={values}
                                                            setFieldTouched={setFieldTouched}
                                                            tabIndex={getNextTabIndex}
                                                        />
                                                    </div>

                                                </div>

                                                {(values.steps[index]?.isFinalStep === "Y") &&
                                                    <div className='mt-3'>
                                                        <ResponseMappingMdl
                                                            setFieldValue={setFieldValue}
                                                            index={index}
                                                            values={values}
                                                            setFieldTouched={setFieldTouched}
                                                            getTabIndex={getNextTabIndex}
                                                        />
                                                    </div>
                                                }

                                                {/* {stepType !== "REPL" &&
                                                <div className="p-3">
                                                    <p className="text-sm text-success">
                                                        <span>If you want to enable ticket reply please check the checkbox, </span>
                                                        If you execute the service directly then ticket will automatically generate.
                                                    </p>

                                                    <Row>
                                                        <Col md={4} className="mb-3">
                                                            <Checkbox
                                                                name={`steps[${index}].ticketReplyApi`}
                                                                label="You want to enable Ticket Reply"
                                                                id={`steps[${index}].ticketReplyApi`}
                                                                checked={values.steps[index]?.ticketReplyApi === "Y"}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    setFieldValue(`steps[${index}].ticketReplyApi`, e.target.checked ? "Y" : "N");
                                                                }}
                                                            />
                                                        </Col>

                                                        {step.ticketReplyApi === "Y" &&
                                                            <>
                                                                <Col md={4} className="mb-3">
                                                                    <SelectField
                                                                        placeholder="Ticket Reply Type"
                                                                        options={replyTypeOptions}
                                                                        required
                                                                        tabIndex={getNextTabIndex()}
                                                                        value={
                                                                            step.ticketReplyType ? replyTypeOptions.find(opt => opt.value === step.ticketReplyType) || null : null
                                                                        }
                                                                        onChange={(option: any) => {
                                                                            if (option && !Array.isArray(option)) {
                                                                                setFieldValue(`steps[${index}].ticketReplyType`, option.value);
                                                                                setFieldValue(`steps[${index}].ticketReplyTypeLbl`, option.label);
                                                                            }
                                                                        }}
                                                                        onBlur={() => setFieldTouched(`steps[${index}].ticketReplyType`, true)}
                                                                    />
                                                                    <ErrorMessage name={`steps[${index}].ticketReplyType`} component="div" className="ErrorMessage" />
                                                                </Col>

                                                                <Col md={4}>
                                                                    <SelectField
                                                                        name={`steps[${index}].ticketTmpValue`}
                                                                        placeholder="Ticket Template"
                                                                        options={[
                                                                            { value: "", label: "Select Template" }, ...getTemplateDropdownData.map((item: any) => ({ value: item.TranCode, label: item.TemplateName, }))
                                                                        ]}
                                                                        value={getTemplateDropdownData.find(
                                                                            (item: any) => item.TranCode === values.steps[index].ticketTmpValue
                                                                        )
                                                                            ? {
                                                                                value: values.steps[index].ticketTmpValue,
                                                                                label: getTemplateDropdownData.find((item: any) => item.TranCode === values.steps[index].ticketTmpValue)?.TemplateName || "",
                                                                            }
                                                                            : null
                                                                        }
                                                                        onChange={(option: any) => {
                                                                            setFieldValue(`steps[${index}].ticketTmpValue`, option?.value || "");
                                                                            setFieldValue(`steps[${index}].ticketTmpLabel`, option?.label || "");
                                                                        }}
                                                                        onBlur={() => setFieldTouched(`steps[${index}].ticketTmpValue`, true)}
                                                                    />
                                                                    <ErrorMessage name={`steps[${index}].ticketTmpValue`} className="ErrorMessage" component="div" />
                                                                </Col>
                                                            </>
                                                        }
                                                    </Row>
                                                </div>
                                            } */}
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                }
                            </>
                        </Accordion>
                    </>
                )
            })}

            <div className="d-flex justify-content-center align-items-center mt-3 w-100">

                <Button
                    size="sm"
                    className="text-xs fw-semibold text-base w-100 py-3 dashed-border"
                    variant="outline-orange"
                    // disabled={values.steps.isFinalStep === "Y"}
                    onClick={() => {

                        const tabStepType = activeTab === "PUSH" ? "PUSH" : activeTab === "REPL" ? "REPL" : activeTab === "PULL" ? "PULL" : "";
                        const currentTabSteps = values.steps.filter((st: any) => st.fieldType === tabStepType && st.deleteFlag !== "Y");
                        const lastStepData = currentTabSteps[currentTabSteps.length - 1];

                        console.log(currentTabSteps);


                        if (!lastStepData?.apiUrl || !lastStepData?.reqType || !lastStepData.contentType || !lastStepData.authType) {
                            toastNotify("Please fill all fields in this tab before adding a new one.", "error");
                            return;
                        }

                        if ((lastStepData.authType === "B" && (!lastStepData.username || !lastStepData.password)) || (lastStepData.authType === "J" && !lastStepData.authValue)) {
                            toastNotify("Please fill authentication fields before adding a new one.", "error");
                            return;
                        }

                        // successData validation
                        for (const s of lastStepData.successData || []) {
                            if (!s.checkFlag || !s.type) {
                                toastNotify("Fill success response fields before adding.", "error");
                                return;
                            }
                            if ((s.checkFlag === "I" || s.checkFlag === "S") && (!s.value)) {
                                toastNotify("Fill success values before adding.", "error");
                                return;
                            }
                        }

                        // failedData validation
                        for (const s of lastStepData.failedData || []) {
                            if (!s.checkFlag || !s.type || !s.customeMessage) {
                                toastNotify("Fill failed response fields before adding.", "error");
                                return;
                            }
                            if ((s.checkFlag === "I" || s.checkFlag === "S") && (!s.value || s.value.length === 0)) {
                                toastNotify("Fill failed values before adding.", "error");
                                return;
                            }
                        }

                        // headerData validation
                        for (const s of lastStepData.headerData || []) {
                            if (!s.key || !s.value) {
                                toastNotify("Fill existing header fields before adding.", "error");
                                return;
                            }
                        }

                        // reqData validation
                        // for (const s of lastStepData.reqData || []) {
                        //     if (!s.type && !s.payloadVal) {
                        //         toastNotify("Fill existing payload fields before adding.", "error");
                        //         return;
                        //     }
                        // }

                        setFieldValue("steps", [...values.steps, {
                            apiUrl: "",
                            reqType: "",
                            contentType: "",
                            authType: "B",
                            authTypeLbl: "Basic",
                            username: "",
                            password: "",
                            authValue: "",
                            reqPayload: "",
                            respPayload: "",
                            existFlag: "N",
                            apiResponseFlag: "Y",
                            fieldType: stepType,
                            deleteFlag: "N",
                            isFinalStep: "N",
                            successData: [{ key: "", type: "I", typeLbl: "Integer", value: '', customeMessage: "", checkFlag: "S", checkFlagLbl: "Success", existFlag: "N", deleteFlag: "N", flag: "S", }],
                            failedData: [{ key: "", type: "I", typeLbl: "Integer", value: '', customeMessage: "", checkFlag: "F", checkFlagLbl: "Failed", existFlag: "N", deleteFlag: "N", flag: "F", }],
                            headerData: [],
                            StatusMapData: [{
                                DataType: "",
                                Keyword: "",
                                Value: "",
                                DisplayValue: "",
                                ExistFlag: "N",
                            }],
                            // reqData: [{ type: "", typeLbl: "", payloadVal: "", },],
                            id: Math.max(...values.steps.map((m: any) => m.id)) + 1
                        }])

                    }
                    } > <PlusCircle style={{ marginBottom: "3px" }} size={20} /> Add Next Step
                </Button>
            </div>

        </div >
    )
}

export default ServiceStep
