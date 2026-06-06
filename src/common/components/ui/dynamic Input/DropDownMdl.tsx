import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { ErrorMessage } from "formik";
import Textfield from "../TextField/TextInput";
import { Trash } from "lucide-react";


type DropDownMdlProps = {
    show: boolean;
    onClose: () => void;
    optionData?: any;
    setInitialFieldValue: any;
    stepIndex: number;
    values: any;
    setFieldValue: any;
    payloadIndex: number;
    mainInitialFieldValue: any;
};

const DropDownMdl: React.FC<DropDownMdlProps> = ({ show, onClose, values, setInitialFieldValue, stepIndex, payloadIndex, mainInitialFieldValue, }) => {

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-lg fw-semibold w-100">Add <span className="text-primary"> Dropdown Values</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p className="text-xs fw-medium">** The dropdown values are filled automatically, you don’t need to click or select anything.</p>

                <Row>
                    {values.columnData?.filter((c: any) => c.deleteFlag !== "Y").map((element: any, id: number) => {
                        return (
                            <Col md={6} key={id} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Textfield
                                        name={`columnData[${id}].val`}
                                        label="Value"
                                        value={element.val}
                                        required
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const update = [...mainInitialFieldValue.steps];
                                            const findInd = update[stepIndex].reqData[payloadIndex].columnData.findIndex((f: any) => f.id === element.id);
                                            update[stepIndex].reqData[payloadIndex].columnData[findInd].val = e.target.value;

                                            if ((id === values.columnData.filter((c: any) => c.deleteFlag !== "Y").length - 1 && e.target.value.trim() !== "") || (id === 0 && values.columnData.filter((c: any) => c.deleteFlag !== "Y").length === 1)) {
                                                update[stepIndex].reqData[payloadIndex].columnData.push({ val: "", id: Math.max(...values.columnData.map((m: any) => m.id)) + 1 });
                                            }
                                            setInitialFieldValue("steps", update)
                                        }}
                                    />
                                    {values.columnData.filter((c: any) => c.deleteFlag !== "Y").length > 1 &&
                                        <Button variant="transparent"
                                            className="btn-sm rounded-2 ms-2"
                                            disabled={values.columnData.length === 1}
                                            onClick={() => {
                                                const update = [...mainInitialFieldValue.steps];
                                                const findInd = update[stepIndex].reqData[payloadIndex].columnData.findIndex((f: any) => f.id === element.id);

                                                if (element.existFlag === "Y") {
                                                    update[stepIndex].reqData[payloadIndex].columnData[findInd].deleteFlag = "Y";
                                                    setInitialFieldValue("steps", update);
                                                } else {
                                                    update[stepIndex].reqData[payloadIndex].columnData.splice(findInd, 1);
                                                    setInitialFieldValue("steps", update);
                                                }
                                            }}>
                                            <Trash />
                                        </Button>
                                    }
                                </div>
                                <ErrorMessage name={`columnData[${id}].val`} className="ErrorMessage" component="div" />
                            </Col>
                        )
                    })}
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default DropDownMdl;
