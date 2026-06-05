import { ErrorMessage } from 'formik';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Checkbox from '../../../components/ui/checkBox/Checkbox';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import Textfield from '../../../components/ui/TextField/TextInput';
import { PlusCircle, Trash } from 'lucide-react';
import TextArea from '../../../components/ui/textArea/TextArea';
import toastNotify from '../../../utils/tostNotify';


type IntegServiceResponseMdlProps = {
  setFieldValue: any;
  index: number;
  values: any;
  setFieldTouched: any;
  apiResponseFlag?: string;
  flag: string;
  tabIndex: any;
};

const dataType = [
  { label: 'Boolean', value: 'B' },
  { label: 'String', value: 'S' },
  { label: 'Integer', value: 'I' },
]

const allCheckFlagOptions = [
  { label: 'Success', value: 'S' },
  { label: 'Failed', value: 'F' },
];

const IntegServiceResponseMdl: React.FC<IntegServiceResponseMdlProps> = ({ setFieldValue, index, values, setFieldTouched, flag, tabIndex }) => {

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

                    {/* Resposne Type SelectField */}
                    <Col md={3} className='mb-2'>
                      <SelectField
                        label='Category'
                        placeholder="Status Category"
                        tabIndex={tabIndex()}
                        options={allCheckFlagOptions}
                        isDisabled
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
                        }}
                        onBlur={() => setFieldTouched(`${namePath}.checkFlag`, true)}
                      />
                      <ErrorMessage name={`${namePath}.checkFlag`} component="div" className="ErrorMessage" />
                    </Col>

                    {/* Data Type SelectField */}
                    <Col md={2}>
                      <SelectField
                        label='Data Type'
                        placeholder="Select Data Type"
                        options={dataType}
                        // isDisabled={field.checkFlag === 'H' || values.steps[index]?.apiResponseFlag === "N"}
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
                        label={"Object Key"}
                        placeholder='Enter Obkect Key'
                        type="text"
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
                      {(field.type === 'I' || field.type === 'S') ? (
                        <Col md={12}>
                          <Textfield
                            label="Response Value"
                            placeholder='Enter Response Value'
                            name={`${namePath}.value`}
                            type="text"
                            required
                            minLength={1}
                            tabIndex={tabIndex()}
                            value={field.value}
                            maxLength={field.type === 'I' ? 4 : 15}
                            onKeyDown={(e: any) => e.key === " " && e.preventDefault()}
                            // disabled={field.checkFlag === 'H' || values.steps[index]?.apiResponseFlag === "N"}
                            onChange={(e) => {
                              setFieldValue(`${namePath}.value`, e.target.value)
                            }}
                            onBlur={() => setFieldTouched(`${namePath}.value`, true)}
                          />
                        </Col>
                      ) : (
                        <Col md={12}>
                          {/* Response Value SelectField (Boolean) */}
                          <SelectField
                            label='Value'
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

                    {/* Custom Message / Object Key Textfield */}
                    {((fieldReference?.checkFlag !== "S" && values.steps[index]?.isFinalStep === "N") || (fieldReference?.checkFlag === "S" && values.steps[index]?.isFinalStep === "Y") || (fieldReference?.checkFlag === "F" && values.steps[index]?.isFinalStep === "Y")) &&
                      <Col md={12} className='mt-2'>
                        <Textfield
                          label='Message Shown to User'
                          placeholder='Enter Message Shown to User'
                          type="text"
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
                    }

                    {((fieldReference?.checkFlag === "F" && values.steps[index]?.isFinalStep === "N") || (fieldReference?.checkFlag === "S" && values.steps[index]?.isFinalStep === "Y") || (fieldReference?.checkFlag === "F" && values.steps[index]?.isFinalStep === "Y")) &&
                      <>
                        <Col md={12} className="m-3 p-3 mt-3 ms-0 mb-1 border rounded-3">
                          <Checkbox
                            name={`${namePath}.BankMsgStatus`}
                            label="Do you want to Show Message to Bank Team?"
                            id={`${namePath}BankMsgStatus`}
                            // tabIndex={getNextTabIndex()}
                            checked={field.BankMsgStatus === "Y"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setFieldValue(`${namePath}.BankMsgStatus`, e.target.checked ? "Y" : "N");
                            }}
                          />

                          {field.BankMsgStatus === "Y" && (
                            <Col md={12} className="mt-4 animate-slide-up" style={{ animationDelay: "0s" }}>
                              <TextArea
                                label="Message for Bank Team"
                                placeholder='Enter Message for Bank Team'
                                name={`${namePath}.BankMessage`}
                                value={field.BankMessage}
                                required
                                tabIndex={tabIndex}
                                size="small"
                                maxLength={300}
                                onChange={(e) => { setFieldValue(`${namePath}.BankMessage`, e.target.value) }}
                                onBlur={() => setFieldTouched(`${namePath}.BankMessage`, true)}
                              />
                              <ErrorMessage name={`BankMessage`} className="ErrorMessage" component="div" />
                            </Col>
                          )}
                        </Col>
                      </>
                    }

                    {((fieldReference?.checkFlag === "S" && values.steps[index]?.isFinalStep === "Y")) &&
                      <Col md={12} className="m-3 p-3 mt-3 ms-0 mb-1 border rounded-3">
                        <Checkbox
                          name={`${namePath}.CustomerMessageStatus`}
                          label="Do you want to Show Message to Customer?"
                          id={`${namePath}.CustomerMessageStatus`}
                          // tabIndex={getNextTabIndex()}
                          checked={field.CustomerMessageStatus === "Y"}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue(`${namePath}.CustomerMessageStatus`, e.target.checked ? "Y" : "N");
                          }}
                        />

                        {field.CustomerMessageStatus === "Y" && (
                          <Col md={12} className="mt-4">
                            <TextArea
                              label="Customer Message"
                              placeholder='Enter Customer Message'
                              name={`${namePath}.CustomerMessage`}
                              value={field.CustomerMessage}
                              required
                              tabIndex={tabIndex()}
                              size="small"
                              maxLength={300}
                              onChange={(e) => { setFieldValue(`${namePath}.CustomerMessage`, e.target.value) }}
                              onBlur={() => setFieldTouched(`${namePath}.CustomerMessage`, true)}
                            />
                            <ErrorMessage name={`${namePath}.CustomerMessage`} className="ErrorMessage" component="div" />
                          </Col>
                        )}
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
              className="text-xs fw-semibold text-sm w-100 py-2 dashed-border"
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
                    !lastRecord?.key ||
                    !lastRecord?.value ||
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
                  checkFlag: "F",
                  checkFlagLbl: values.steps[index]?.apiResponseFlag === "Y" && values.steps[index]?.isFinalStep === "N" ? "Failed" : "Success",
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

            > <PlusCircle style={{ marginBottom: "3px" }} size={15} /> Add Conditions
            </Button>
          </div>
        }

      </div>
    </>
  )
}

export default IntegServiceResponseMdl;
