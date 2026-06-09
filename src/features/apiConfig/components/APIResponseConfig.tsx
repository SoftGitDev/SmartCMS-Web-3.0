import { ErrorMessage } from 'formik';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Plus, Trash } from 'lucide-react';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';
import toastNotify from '../../../services/notification/tostNotify';



type APIResponseConfigProps = {
    setFieldValue: any;
    index: number;
    values: any;
    setFieldTouched: any;
    apiResponseFlag?: string;
    flag: string;
    tabIndex: any;
};

const dataType = [
    { label: 'BOOLEAN', value: 'BOOLEAN' },
    { label: 'STRING', value: 'STRING' },
    { label: 'INTEGER', value: 'INTEGER' },
]

const APIResponseConfig: React.FC<APIResponseConfigProps> = ({ setFieldValue, index, values, setFieldTouched, flag, tabIndex }) => {

    const fieldType = (flag === "S" && "successData") || (flag === "F" && "failedData") || (flag === "E" && "exceptionData") || "";
    const currentFieldsArray = values.steps[index]?.[fieldType] || [];

    return (
        <>
            <div className="" key={index}>
                {(currentFieldsArray).filter((r: any) => r?.deleteFlag !== "Y").map((field: any, renderIndex: number) => {
                    const absoluteIndex = currentFieldsArray.findIndex((f: any) => f.id === field.id);

                    if (absoluteIndex === -1) return null;
                    const namePath = `steps.${index}.${fieldType}[${absoluteIndex}]`;
                    const fieldReference = values.steps[index][fieldType][absoluteIndex];

                    return (
                        <>
                            <fieldset className={`${fieldReference?.checkFlag === "S" ? "border-success" : "border-danger"} border rounded-3 p-2 px-3 mb-3`}>
                                <legend className={`${fieldReference?.checkFlag === "S" ? "text-success" : fieldReference?.checkFlag === "F" ? "text-danger" : "text-danger"} float-none w-auto px-2 mb-0 text-xs fw-medium`}>
                                    {(fieldReference?.checkFlag === "S" && "Success") || (fieldReference?.checkFlag === "F" && "Failed") || (values.steps[index]?.isFinalStep !== "Y" && "Failed")}
                                </legend>

                                <React.Fragment key={field.id}>
                                    <Row className="g-2 mb-2 p-2">

                                        {/* Data Type SelectField */}
                                        <Col md={2}>
                                            <SelectField
                                                label="Data Type"
                                                placeholder="Data Type"
                                                options={dataType}
                                                name={`${namePath}.type`}
                                                value={fieldReference?.type ? {
                                                    value: fieldReference.type, label: fieldReference.typeLbl
                                                } : null}
                                                tabIndex={tabIndex()}
                                                onChange={(option: any) => {
                                                    setFieldValue(`${namePath}.type`, option.value);
                                                    setFieldValue(`${namePath}.typeLbl`, option.label);
                                                    setFieldValue(`${namePath}.value`, '');
                                                }}
                                                onBlur={() => setFieldTouched(`${namePath}.type`, true)}
                                            />
                                            <ErrorMessage name={`${namePath}.type`} component="div" className="ErrorMessage" />
                                        </Col>


                                        <Col md={3}>
                                            <Textfield
                                                label="Object Key"
                                                placeholder="Object Key"
                                                type="text"
                                                required
                                                tabIndex={tabIndex()}
                                                name={`${namePath}.key`}
                                                value={field.key}
                                                minLength={1}
                                                maxLength={15}
                                                onKeyDown={(e: any) => e.key === " " && e.preventDefault()}
                                                // disabled={field.checkFlag === 'H' || values.steps[index]?.apiResponseFlag === "N"}
                                                onChange={(e) => {
                                                    const regex = /^[A-Za-z%\s]*$/;
                                                    if (regex.test(e.target.value)) { setFieldValue(`${namePath}.key`, e.target.value) }
                                                }}
                                                onBlur={() => setFieldTouched(`${namePath}.key`, true)}
                                            />
                                            <ErrorMessage name={`${namePath}.key`} component="div" className="ErrorMessage" />
                                        </Col>


                                        <Col md={3}>
                                            {/* Response Value Textfield (for I/S) or SelectField (for B) */}
                                            {(field.type === 'INTEGER' || field.type === 'STRING') ? (
                                                <Col md={12}>
                                                    <Textfield
                                                        label="Response Value"
                                                        placeholder="Response Value"
                                                        name={`${namePath}.value`}
                                                        type="text"
                                                        required
                                                        minLength={1}
                                                        tabIndex={tabIndex()}
                                                        value={field.value}
                                                        maxLength={field.type === 'INTEGER' ? 3 : 15}
                                                        onKeyDown={(e: any) => e.key === " " && e.preventDefault()}
                                                        // disabled={field.checkFlag === 'H' || values.steps[index]?.apiResponseFlag === "N"}
                                                        onChange={(e: any) => {
                                                            e.preventDefault();
                                                            const { value } = e.target;
                                                            const regex = /^[0-9]*[.,-]?[0-9]*$/;
                                                            if (regex.test(value.toString())) {
                                                                setFieldValue(`${namePath}.value`, value.trim());
                                                            }
                                                        }}
                                                        onBlur={() => setFieldTouched(`${namePath}.value`, true)}
                                                    />
                                                </Col>
                                            ) : (
                                                <Col md={12}>
                                                    {/* Response Value SelectField (Boolean) */}
                                                    <SelectField
                                                        label="Select Value"
                                                        placeholder="Select Value"
                                                        options={[
                                                            { label: 'true', value: 'true' },
                                                            { label: 'false', value: 'false' },
                                                        ]}
                                                        tabIndex={tabIndex()}
                                                        name={`${namePath}.value`}
                                                        value={field.value === 'true' || field.value === 'false' ? { value: field.value, label: field.value } : null}
                                                        onChange={(option: any) => {
                                                            if (option && !Array.isArray(option)) {
                                                                setFieldValue(`${namePath}.value`, option.value);
                                                                setFieldValue(`${namePath}.valueLbl`, option.label);
                                                            }
                                                        }}
                                                        onBlur={() => setFieldTouched(`${namePath}.value`, true)}
                                                    />
                                                </Col>
                                            )}
                                            <ErrorMessage name={`${namePath}.value`} component="div" className="ErrorMessage" />
                                        </Col>

                                        <Col md={3}>
                                            <Textfield
                                                label={"Internal Value"}
                                                placeholder={"Internal Value"}
                                                type="text"
                                                tabIndex={tabIndex()}
                                                name={`${namePath}.internalVal`}
                                                value={field.internalVal}
                                                minLength={1}
                                                maxLength={15}
                                                onChange={(e: any) => {
                                                    setFieldValue(`${namePath}.internalVal`, e.target.value);
                                                }}
                                                onBlur={() => setFieldTouched(`${namePath}.internalVal`, true)}
                                            />
                                            <ErrorMessage name={`${namePath}.internalVal`} component="div" className="ErrorMessage" />
                                        </Col>

                                        {currentFieldsArray.filter((item: any) => item.deleteFlag !== "Y").length > 1 &&
                                            <Col md={1} className="text-end mt-4 ps-2 ms-0 d-grid justify-content-start" style={{ height: "35px" }}>
                                                <div className='mt-1'></div>
                                                <Button
                                                    variant=""
                                                    className="btn-sm icon-wrapper-delete rounded-2"
                                                    onClick={() => {
                                                        const update = [...values.steps];
                                                        const currentArray = update[index][fieldType];
                                                        const findInd = currentArray.findIndex((f: any) => f.id === field.id);

                                                        if (field.existFlag === "Y") {
                                                            update[index][fieldType][findInd].deleteFlag = "Y";
                                                        } else {
                                                            update[index][fieldType].splice(findInd, 1);
                                                        }
                                                        setFieldValue(`steps.${index}.${fieldType}`, update[index][fieldType]);
                                                    }}>
                                                    <Trash />
                                                </Button>
                                            </Col>
                                        }

                                    </Row>
                                </React.Fragment>
                            </fieldset>
                        </>
                    )
                })}

                {/* Add More Failed Case */}
                {(flag === "F") &&
                    <div className="d-flex justify-content-center align-items-center mt-3 w-100">
                        <Button
                            size="sm"
                            variant="outline-orange"
                            className="text-xs fw-semibold text-sm w-100 py-2 border-dashed"
                            disabled={values.steps[index][fieldType].filter((r: any) => r?.deleteFlag !== "Y").length === 3}
                            onClick={() => {
                                const currentFields = [...(values.steps?.[index]?.[fieldType] || [])];

                                // 1. Filter active records for validation
                                const activeRecords = currentFields.filter((r: any) => r?.deleteFlag !== "Y");
                                const lastRecord = activeRecords[activeRecords.length - 1];

                                // 2. Validation check (only on visible records)
                                if (activeRecords.length > 0) {
                                    if (
                                        !lastRecord?.type ||
                                        !lastRecord?.key ||
                                        !lastRecord?.value ||
                                        !lastRecord?.internalVal
                                    ) {
                                        toastNotify("Please fill existing response fields before adding a new one.", "error");
                                        return;
                                    }
                                }

                                const maxId =
                                    values.steps[index]?.[fieldType]?.length > 0
                                        ? Math.max(...values.steps[index][fieldType].map((m: any) => Number(m.id) || 0))
                                        : 0;

                                const newField = {
                                    id: maxId + 1,
                                    key: "",
                                    type: "INTEGER",
                                    typeLbl: "INTEGER",
                                    value: "",
                                    checkFlag: "F",
                                    checkFlagLbl: "Failed",
                                    internalVal: "",
                                    flag: "F",
                                    existFlag: "N",
                                    deleteFlag: "N",
                                };
                                setFieldValue(`steps.${index}.${fieldType}`, [...currentFields, newField]);
                            }}

                        > <Plus style={{ marginBottom: "3px" }} size={15} /> Add Conditions
                        </Button>
                    </div>
                }

            </div>
        </>
    )
}

export default APIResponseConfig;
