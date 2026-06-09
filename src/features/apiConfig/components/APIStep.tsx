import React from 'react'
import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import { CircleX, PlusCircle, Trash, GripVertical, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';
import RequestPayloadEditor from './RequestPayloadEditor';
import APIResponseConfig from './APIResponseConfig';
import { serviceStepProps } from '../types/ApiConfigData';
import { SweetAlerts } from '../../../services/notification/sweetAlert';
import toastNotify from '../../../services/notification/tostNotify';


type ServiceMdlProps = {
    values: any;
    setFieldValue: any;
    handleBlur: any;
    handleChange: any;
    setFieldTouched: any;
    servicesDtlData: any;
    getNextTabIndex: any;
}

const reqTypeOptions = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "DELETE", value: "DELETE" },
    { label: "HEAD", value: "HEAD" },
    { label: "OPTIONS", value: "OPTIONS" },
    { label: "TRACE", value: "TRACE" },
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
    { label: "NONE", value: "NONE" },
    { label: "Basic", value: "BASIC" },
    { label: "Bearer", value: "BEARER" },
];

const APIStep: React.FC<ServiceMdlProps> = ({ values, setFieldValue, handleChange, handleBlur, setFieldTouched, getNextTabIndex }) => {

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        if (sourceIndex === destinationIndex) return;

        const filteredSteps = values.steps.filter((s: serviceStepProps) => s.deleteFlag !== "Y");
        const reorderedSteps = Array.from(filteredSteps);
        const [movedStep] = reorderedSteps.splice(sourceIndex, 1);
        reorderedSteps.splice(destinationIndex, 0, movedStep);
        const updatedSteps = reorderedSteps.map((step: any, index: number) => ({ ...step, ExecOrder: index + 1 }));
        const deletedSteps = values.steps.filter((s: serviceStepProps) => s.deleteFlag === "Y");
        const finalSteps = [...updatedSteps, ...deletedSteps];

        setFieldValue("steps", finalSteps);
        SweetAlerts("Success", "Step order updated successfully", "success");
    };

    const filteredSteps = values.steps.filter((s: serviceStepProps) => s.deleteFlag !== "Y");

    return (
        <div>
            {/* Step Content with Drag and Drop */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="steps-list" isDropDisabled={filteredSteps.length === 0 || false} isCombineEnabled={false} ignoreContainerClipping={true}>
                    {(provided: any) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {filteredSteps.map((step: serviceStepProps, visibleIndex: number) => {
                                const index = values.steps.findIndex((s: serviceStepProps) => s.id === step.id);
                                const stepNumber = visibleIndex + 1;

                                return (
                                    <Draggable
                                        key={step.id.toString()}
                                        draggableId={step.id.toString()}
                                        index={visibleIndex}
                                    >
                                        {(provided: any, snapshot: any) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} className={`mb-3 ${snapshot.isDragging ? 'dragging-item' : ''}`}>
                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Item eventKey={visibleIndex.toString()}>
                                                        <Accordion.Header>
                                                            <div className="d-flex align-items-center w-100">
                                                                {/* Drag Handle */}
                                                                <div {...provided.dragHandleProps} className="drag-handle me-2 p-1 cursor-grab" title="Drag to reorder" >
                                                                    <GripVertical size={20} className="text-muted" />
                                                                </div>

                                                                <div className="p-2 bg-light text-primary rounded me-3">
                                                                    <span className='fw-bold px-1'>{stepNumber}</span>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <h6 className="m-0 fw-semibold text-dark">Step {stepNumber} for Service Configuration</h6>
                                                                    <small className="text-muted text-md">{step.StepName || `Configure how service attributes are handled for Step ${stepNumber}`}</small>
                                                                </div>

                                                                {(stepNumber > 1) && (
                                                                    <CircleX size={20} className="bg-light me-2 primary rounded-4 cursor-pointer"
                                                                        onClick={(e: any) => {
                                                                            e.stopPropagation();
                                                                            const update = [...values.steps];
                                                                            const findInd = values.steps.findIndex((f: any) => f.id === step.id);

                                                                            if (step.existFlag === "Y") {
                                                                                update[findInd].deleteFlag = "Y";
                                                                                setFieldValue("steps", update);
                                                                            } else {
                                                                                update.splice(findInd, 1);
                                                                                setFieldValue("steps", update);
                                                                            }
                                                                            // Update ExecOrder for remaining steps
                                                                            const remainingSteps = update.filter((s: any) => s.deleteFlag !== "Y");
                                                                            const updatedSteps = remainingSteps.map((s: any, idx: number) => ({ ...s, ExecOrder: idx + 1 }));
                                                                            const deletedSteps = update.filter((s: any) => s.deleteFlag === "Y");
                                                                            setFieldValue("steps", [...updatedSteps, ...deletedSteps]);
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
                                                                        placeholder='Step Name'
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
                                                                        placeholder='API Path'
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
                                                                        name={`steps[${index}].reqType`}
                                                                        label="Request Method"
                                                                        required
                                                                        placeholder="Request Method"
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
                                                                    />
                                                                    <ErrorMessage name={`steps[${index}].reqType`} component="div" className="ErrorMessage" />
                                                                </Col>

                                                                <Col md={4} className="mb-3">
                                                                    <SelectField
                                                                        label="Request Content Type"
                                                                        placeholder="Request Content Type"
                                                                        required
                                                                        options={contentTypeOptions}
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
                                                                        label="Response Content Type"
                                                                        placeholder="Response Content Type"
                                                                        required
                                                                        options={responseTypeOptions}
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
                                                                        placeholder="Auth Type"
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

                                                                {step.authType === "BASIC" && (
                                                                    <>
                                                                        <Col md={4} className="mb-3">
                                                                            <Textfield
                                                                                label="Username"
                                                                                placeholder="Username"
                                                                                name={`steps[${index}].username`}
                                                                                type={"password"}
                                                                                maxLength={55}
                                                                                tabIndex={getNextTabIndex()}
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
                                                                                placeholder="Password"
                                                                                name={`steps[${index}].password`}
                                                                                type={"password"}
                                                                                maxLength={55}
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

                                                                {step.authType === "BEARER" && (
                                                                    <>
                                                                        <Col md={8} className="mb-3">
                                                                            <Textfield
                                                                                label="Token"
                                                                                placeholder="Token"
                                                                                name={`steps[${index}].authValue`}
                                                                                type={"password"}
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

                                                                                return (
                                                                                    <div key={header.id}>
                                                                                        <div className="mb-2 d-flex align-items-center gap-2 pt-2">
                                                                                            <Col md={3} className="ps-0 mb-2">
                                                                                                <Textfield
                                                                                                    label="Key"
                                                                                                    placeholder="Enter Key"
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
                                                                                                    placeholder="Enter Value"
                                                                                                    type={"password"}
                                                                                                    tabIndex={getNextTabIndex()}
                                                                                                    name={`${namePath}.value`}
                                                                                                    value={header.value}
                                                                                                    maxLength={255}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                />
                                                                                            </Col>

                                                                                            <Col md={1} className="d-flex p-0 mt-2">
                                                                                                <Button
                                                                                                    variant=""
                                                                                                    className="btn-sm icon-wrapper-delete rounded-2"
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
                                                                                                ><Trash size={16} /></Button>
                                                                                            </Col>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </fieldset>
                                                                    }
                                                                </div>

                                                                <div>
                                                                    <RequestPayloadEditor
                                                                        contentType={step.contentType}
                                                                        getTabIndex={getNextTabIndex}
                                                                        setFieldValue={setFieldValue}
                                                                        type='Request Payload'
                                                                        name={`steps[${index}].reqPayload`}
                                                                        index={index}
                                                                        value={values.steps[index]?.reqPayload || ""}
                                                                        onChange={(updatedJson: string) => setFieldValue(`steps[${index}].reqPayload`, updatedJson, true)}
                                                                    />
                                                                    <ErrorMessage name={`steps[${index}].reqPayload`} component="div" className="ErrorMessage" />
                                                                </div>

                                                                <div>
                                                                    <RequestPayloadEditor
                                                                        contentType={step.responseType}
                                                                        getTabIndex={getNextTabIndex}
                                                                        setFieldValue={setFieldValue}
                                                                        index={index}
                                                                        type='Response Payload'
                                                                        name={`steps[${index}].respPayload`}
                                                                        value={values.steps[index]?.respPayload || ""}
                                                                        onChange={(updatedJson: string) => setFieldValue(`steps[${index}].respPayload`, updatedJson, true)}

                                                                    />
                                                                    <ErrorMessage name={`steps[${index}].respPayload`} component="div" className="ErrorMessage" />
                                                                </div>

                                                                {/* Response payload */}
                                                                <div className="flex-grow-1 mt-3">
                                                                    <div className='d-flex'>
                                                                        <div>
                                                                            <h6 className="text-primary text-sm ps-2 fw-semibold ">Response Config</h6>
                                                                            {/* <Checkbox
                                                                                name={`steps[${index}].isFinalStep`}
                                                                                label="Is this Final Step ?"
                                                                                checked={values.steps[index]?.isFinalStep === "Y"}
                                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                    setFieldValue(`steps[${index}].isFinalStep`, e.target.checked ? "Y" : "N");
                                                                                }}
                                                                            /> */}
                                                                        </div>
                                                                    </div>

                                                                    <div className='animate-slide-up' style={{ animationDelay: "0s" }}>
                                                                        <APIResponseConfig
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
                                                                        <APIResponseConfig
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
                                                            </Row>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="d-flex justify-content-center align-items-center mt-3 w-100">
                <Button
                    size="sm"
                    className="text-xs text-primary border-2 fw-semibold text-base w-100 py-3 border-dashed"
                    variant=""
                    onClick={() => {
                        const currentTabSteps = values.steps.filter((st: any) => st.deleteFlag !== "Y");
                        const lastStepData = currentTabSteps[currentTabSteps.length - 1];

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
                            if (!s.checkFlag || !s.type || !s.internalVal) {
                                toastNotify("Fill success response fields before adding.", "error");
                                return;
                            }
                            if ((s.checkFlag === "INTEGER" || s.checkFlag === "STRING") && (!s.value)) {
                                toastNotify("Fill success values before adding.", "error");
                                return;
                            }
                        }

                        // failedData validation
                        for (const s of lastStepData.failedData || []) {
                            if (!s.checkFlag || !s.type) {
                                toastNotify("Fill failed response fields before adding.", "error");
                                return;
                            }
                            if ((s.checkFlag === "INTEGER" || s.checkFlag === "STRING") && (!s.value || s.value.length === 0)) {
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

                        // Calculate the next ExecOrder (based on the number of non-deleted steps + 1)
                        const nextExecOrder = currentTabSteps.length + 1;

                        setFieldValue("steps", [...values.steps, {
                            apiUrl: "",
                            reqType: "",
                            contentType: "",
                            authType: "B",
                            authTypeLbl: "BASIC",
                            username: "",
                            password: "",
                            authValue: "",
                            reqPayload: "",
                            respPayload: "",
                            existFlag: "N",
                            apiResponseFlag: "Y",
                            deleteFlag: "N",
                            isFinalStep: "N",
                            ExecOrder: nextExecOrder,
                            successData: [{ key: "", type: "INTEGER", typeLbl: "INTEGER", value: '', customeMessage: "", internalVal: "", existFlag: "N", deleteFlag: "N", flag: "S", }],
                            failedData: [{ key: "", type: "INTEGER", typeLbl: "INTEGER", value: '', customeMessage: "", internalVal: "", existFlag: "N", deleteFlag: "N", flag: "F", }],
                            headerData: [],
                            StatusMapData: [{
                                DataType: "",
                                Keyword: "",
                                Value: "",
                                DisplayValue: "",
                                ExistFlag: "N",
                            }],
                            id: Math.max(...values.steps.map((m: any) => m.id)) + 1
                        }])
                    }}
                >
                    <Plus size={18} strokeWidth={3} className='me-1' /> Add Next Step
                </Button>
            </div>
        </div>
    )
}

export default APIStep