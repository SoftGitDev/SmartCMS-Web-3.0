import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import License from './License';

interface LicenceMdlProps {
    show: boolean;
    onHide: () => void;
    licenceDtl?: any;
}

const LicenceMdl: React.FC<LicenceMdlProps> = ({ show, onHide, licenceDtl, }) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            backdrop="static"
        >
            <Formik
                initialValues={{
                    licenseName: licenceDtl?.licenseName || "",
                    licenseKey: licenceDtl?.licenseKey || "",
                    expiryDate: licenceDtl?.expiryDate || "",
                    status: licenceDtl?.status || "ACTIVE",
                }}
                validationSchema={Yup.object({
                    licenseName: Yup.string().required("License name is required"),
                    licenseKey: Yup.string().required("License key is required"),
                })}
                enableReinitialize
                onSubmit={(values) => {
                    console.log("Submitted Values =>", values);
                }}
            >
                {({ values, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting, }) => {

                    return (
                        <Form onSubmit={handleSubmit}>

                            <Modal.Header closeButton>
                                <Modal.Title className="text-lg text-muted">
                                    Update License Configuration
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <License
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    mode={'licenseStep'}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            </Modal.Body>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default LicenceMdl;