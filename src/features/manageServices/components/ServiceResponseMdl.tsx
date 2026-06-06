import { ErrorMessage } from 'formik';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { PlusCircle, Trash } from 'lucide-react';
import toastNotify from '../../../services/notification/tostNotify';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';
import Textfield from '../../../common/components/ui/TextField/TextInput';



type ServiceResponseMdlProps = {
  setFieldValue: any;
  index: number;
  values: any;
  setFieldTouched: any;
  apiResponseFlag: string;
  flag: string
  tabIndex: any;
};

const dataType = [
  { label: 'Boolean', value: 'B' },
  { label: 'String', value: 'S' },
  { label: 'Integer', value: 'I' },
]

const allCheckFlagOptions = [
  { label: 'HTTP Response', value: 'H' },
  { label: 'API Response', value: 'R' },
];

const ServiceResponseMdl: React.FC<ServiceResponseMdlProps> = ({ setFieldValue, index, values, setFieldTouched, flag, tabIndex }) => {

  const fieldType = (flag === "S" && "successData") || (flag === "F" && "failedData") || (flag === "E" && "exceptionData") || "";
  const currentFieldsArray = values.steps[index]?.[fieldType] || [];


  return (
    <>
      <div className="" key={index}>
        <fieldset className="border rounded-3 p-2 px-3 mb-3">
          <legend className="float-none w-auto px-2 text-primary mb-0 text-xs fw-medium">{(flag === "S" && "Success") || (flag === "F" && "Failed") || (flag === "E" && "Exception")}</legend>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className='text-sm m-0 text-slate-600 ps-1'>Please press "Enter" after inserting a integer or string <span className='text-primary'>response value</span></p>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-decoration-none text-primary text-xs ms-auto fw-semibold me-2"
              disabled={values.steps[index][fieldType].filter((r: any) => r?.deleteFlag !== "Y").length === 3}
              onClick={() => {
                const currentFields = [...(values.steps?.[index]?.[fieldType] || [])];

                // 1. Filter active records for validation
                const activeRecords = currentFields.filter((r: any) => r?.deleteFlag !== "Y");
                const lastRecord = activeRecords[activeRecords.length - 1];

                // 2. Validation check (only on visible records)
                if (activeRecords.length > 0) {
                  if (
                    !lastRecord?.checkFlag ||
                    !lastRecord?.type ||
                    !lastRecord?.respMsgType ||
                    !lastRecord?.customeMessage
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
                  type: "I",
                  typeLbl: "Integer",
                  value: "",
                  checkFlag: "H",
                  checkFlagLbl: "HTTP Response",
                  respMsgType: "C",
                  respMsgTypeLbl: "Custom Message",
                  customeMessage: "",
                  flag: "",
                  existFlag: "N",
                  deleteFlag: "N",
                  setValue: ""
                };
                setFieldValue(`steps.${index}.${fieldType}`, [...currentFields, newField]);
              }}

            > <PlusCircle style={{ marginBottom: "3px" }} size={15} /> Add Field
            </Button>

          </div>


          {(currentFieldsArray).filter((r: any) => r?.deleteFlag !== "Y").map((field: any, renderIndex: number) => {
            const absoluteIndex = currentFieldsArray.findIndex((f: any) => f.id === field.id);

            if (absoluteIndex === -1) return null;
            const namePath = `steps.${index}.${fieldType}[${absoluteIndex}]`;
            const fieldReference = values.steps[index][fieldType][absoluteIndex];

            return (
              <React.Fragment key={field.id}>
                <Row className="g-2 mb-2">

                  {/* Resposne Type SelectField */}
                  <Col md={3} className='mb-2'>
                    <SelectField
                      label='Response Type'
                      placeholder="Select Response Type"
                      tabIndex={tabIndex()}
                      options={allCheckFlagOptions}
                      isDisabled={values.steps[index]?.apiResponseFlag === "N"}
                      name={`${namePath}.checkFlag`}
                      value={
                        fieldReference?.checkFlag
                          ? {
                            value: fieldReference.checkFlag,
                            label: fieldReference.checkFlagLbl
                          } : null
                      }
                      onChange={(option: any) => {
                        setFieldValue(`${namePath}.checkFlag`, option.value);
                        setFieldValue(`${namePath}.checkFlagLbl`, option.label);

                        if (option.value === 'H') {
                          setFieldValue(`${namePath}.type`, 'I');
                          setFieldValue(`${namePath}.typeLbl`, 'Integer');
                          setFieldValue(`${namePath}.respMsgType`, 'C');
                          setFieldValue(`${namePath}.respMsgTypeLbl`, 'Custom Message');
                        } else {
                          setFieldValue(`${namePath}.type`, '');
                          setFieldValue(`${namePath}.typeLbl`, '');
                        }
                        setFieldValue(`${namePath}.value`, '');
                        setFieldValue(`${namePath}.valueLbl`, '');
                      }}
                      onBlur={() => setFieldTouched(`${namePath}.checkFlag`, true)}
                    />
                    <ErrorMessage name={`${namePath}.checkFlag`} component="div" className="ErrorMessage" />
                  </Col>

                  {/* Data Type SelectField */}
                  <Col md={3}>
                    <SelectField
                      placeholder="Select Data Type"
                      label='Data Type'
                      options={dataType}
                      isDisabled={field.checkFlag === 'H' || values.steps[index]?.apiResponseFlag === "N"}
                      name={`${namePath}.type`}
                      value={
                        fieldReference?.type
                          ? {
                            value: fieldReference.type,
                            label: fieldReference.typeLbl
                          } : null
                      }
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

                  {/* Object Key Textfield / Disabled Placeholder */}
                  {field.checkFlag === "H" ? (
                    // ... (Disabled Field for CheckFlag H - no change needed here)
                    <Col md={3}>
                      <Textfield
                        className="rounded-1 w-100"
                        // label='Disabled'
                        name={`demo-${field.id}`} // Use ID for unique, non-Formik name
                        type="text"
                        style={{ height: "35px", paddingLeft: "15px" }}
                        disabled
                      />
                    </Col>
                  ) : (
                    <Col md={3}>
                      <Textfield
                        placeholder='Enter Object Key'
                        label={field.checkFlag === "R" ? "Object Key" : "Disabled"}
                        type="text"
                        tabIndex={tabIndex()}
                        name={`${namePath}.key`}
                        value={field.key}
                        minLength={1}
                        maxLength={15}
                        onKeyDown={(e: any) => e.key === " " && e.preventDefault()}
                        disabled={field.checkFlag === 'H' || values.steps[index]?.apiResponseFlag === "N"}
                        onChange={(e) => {
                          const regex = /^[A-Za-z%\s]*$/;
                          if (regex.test(e.target.value)) { setFieldValue(`${namePath}.key`, e.target.value) }
                        }}
                        onBlur={() => setFieldTouched(`${namePath}.key`, true)}
                      />
                      <ErrorMessage name={`${namePath}.key`} component="div" className="ErrorMessage" />
                    </Col>
                  )}


                  <Col md={3}>
                    {/* Response Value Textfield (for I/S) or SelectField (for B) */}
                    {(field.type === 'I' || field.type === 'S') ? (
                      <>
                        <Col md={12}>
                          <Textfield
                            label="Response Value"
                            name={`${namePath}.value`}
                            placeholder='Enter Response Value'
                            type="text"
                            required
                            minLength={1}
                            tabIndex={tabIndex()}
                            maxLength={field.type === 'I' ? 4 : 15}
                            onBlur={() => setFieldTouched(`${namePath}.value`, true)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();

                                const findInd = absoluteIndex;

                                if (field.type === "I" && !/^\d+$/.test(value)) return;

                                const insertedField = values.steps?.[index]?.[fieldType]?.[findInd]?.value ? String(values.steps[index][fieldType][findInd].value).split(",") : [];

                                if (insertedField.includes(value)) { toastNotify("Value already exists.", "error"); return; }
                                if (insertedField.length >= 3) { toastNotify("Max 3 values allowed.", "error"); return; }

                                insertedField.push(value);
                                setFieldValue(`${namePath}.value`, insertedField.toString());
                                e.currentTarget.value = "";
                              }
                            }}
                            onChange={() => { }}
                          />

                          <ul className="tag-list ps-0 mt-2 mb-0 d-flex flex-wrap">
                            {(field?.value !== "" ? String(field.value).split(",") : []).map((num: string, idx: number) => (
                              <li key={idx} className="tag d-flex align-items-center" style={{ fontSize: "12px" }} >
                                <span className="ms-2">{num}</span>
                                <button type="button" className="tag-close-btn ms-2 p-0 px-1"
                                  onClick={() => {
                                    // const findInd = values.steps?.[index]?.[fieldType].findIndex((f: any) => f.id === field.id); // Redundant
                                    const findInd = absoluteIndex; // Use the pre-calculated absolute index
                                    const arr = String(field.value).split(",");
                                    const updated = arr.filter((_: any, i: any) => i !== idx);
                                    setFieldValue(`${namePath}.value`, updated.toString());
                                  }}>
                                  ×
                                </button>
                              </li>
                            ))}
                          </ul>
                        </Col>
                      </>
                    ) : (
                      <Col md={12}>
                        {/* Response Value SelectField (Boolean) */}
                        <SelectField
                          placeholder="Select Value"
                          label='Select Value'
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
                          onBlur={() => setFieldTouched(`${namePath}.value`, true)} // 🚨 Use namePath
                        />
                      </Col>
                    )}
                    <ErrorMessage name={`${namePath}.value`} component="div" className="ErrorMessage" />
                  </Col>

                  {/* Response Message Type SelectField */}
                  <Col md={4} className="mt-2">
                    <SelectField
                      placeholder="select Response Message Type"
                      label='Response Message Type'
                      options={[
                        { label: 'API Response Message', value: 'A' },
                        { label: 'Custom Message', value: 'C' },
                      ]}
                      isDisabled={field.checkFlag === 'H' || values.steps[index]?.apiResponseFlag === "N"}
                      tabIndex={tabIndex()}
                      name={`${namePath}.respMsgType`}
                      value={
                        fieldReference?.respMsgType
                          ? {
                            value: fieldReference.respMsgType || "",
                            label: fieldReference.respMsgTypeLbl || ""
                          } : null
                      }
                      onChange={(option: any) => {
                        setFieldValue(`${namePath}.respMsgType`, option.value);
                        setFieldValue(`${namePath}.respMsgTypeLbl`, option.label);
                      }}
                      onBlur={() => setFieldTouched(`${namePath}.respMsgType`, true)}
                    />
                    <ErrorMessage name={`${namePath}.respMsgType`} component="div" className="ErrorMessage" />
                  </Col>

                  {/* Custom Message / Object Key Textfield */}
                  <Col md={7} className='mt-2'>
                    <Textfield
                      label={values.steps?.[index]?.[fieldType]?.[absoluteIndex]?.respMsgType === 'C' ? 'Custom Message' : 'Object Key'}
                      type="text"
                      placeholder={`Enter ${values.steps?.[index]?.[fieldType]?.[absoluteIndex]?.respMsgType === 'C' ? 'Custom Message' : 'Object Key'}`}
                      tabIndex={tabIndex()}
                      id={`${namePath}.customeMessage`}
                      name={`${namePath}.customeMessage`}
                      value={field.customeMessage}
                      minLength={5}
                      maxLength={55}
                      onChange={(e) => { setFieldValue(`${namePath}.customeMessage`, e.target.value) }}
                      onBlur={() => setFieldTouched(`${namePath}.customeMessage`, true)}
                    />
                    <ErrorMessage name={`${namePath}.customeMessage`} component="div" className="ErrorMessage" />
                  </Col>


                  {/* Delete Button (Deletion logic already uses the ID lookup, which is robust) */}
                  {currentFieldsArray.filter((item: any) => item.deleteFlag !== "Y").length > 1 &&
                    <Col md={1} className="text-end mt-2 ps-2 ms-0 d-grid justify-content-start" style={{ height: "35px" }}>
                      <Button
                        variant="outline-danger"
                        className="btn-sm"
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
                {/* The separator logic below seems unrelated to the fix, but keeping the original code structure */}
                {renderIndex !== currentFieldsArray.filter((r: any) => r.deleteFlag !== "Y").length - 1 && (<hr />)}
              </React.Fragment>
            )
          })}

        </fieldset>
      </div>
    </>
  )
}

export default ServiceResponseMdl;
