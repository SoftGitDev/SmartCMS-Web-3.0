/************************************************************
// Component     :  Customers Modal
// Purpose       : In this we  Customers Edit Modal .
// Created by    : Harish
// Created Date  : 09-06-2026

************************************************************/


import React, { useCallback, useEffect, useState } from 'react'
import Textfield from '../../../common/components/ui/TextField/TextInput';
import { ErrorMessage, Formik } from 'formik';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import toastNotify from '../../../services/notification/tostNotify';
import { apiRequest } from '../../../services/api/apiRequest';
import * as urls from '../../../services/axios/url'
import * as Yup from "yup";
import { Loader2 } from 'lucide-react';


interface CustomerMdlProps {
    show: boolean;
    handleClose: () => void
    editTableData: any
}
const CustomerMdl: React.FC<CustomerMdlProps> = ({ show, handleClose, editTableData }) => {


    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>(editTableData);

    useEffect(() => {
        setFormData(editTableData);
    }, [editTableData])


    const saveModifyData = useCallback(async (val: any) => {
        try {
            if (JSON.stringify(editTableData) === JSON.stringify(formData)) {
                return toastNotify("You have not made any changes.", 'error');
            };

            setIsLoader(true);
            const payload = {
                TranCode: editTableData.TranCode,
                FirstName: val.firstNm,
                LastName: val.lastNm,
                MobileNo: val.mobileNo,
                EmailId: val.emailId,
            };
            const config = {};
            // .editClientDtl
            const result = await apiRequest("POST", urls, payload, config)
            if (result.STATUS === '0') {
                toastNotify(result.MESSAGE, 'success');
                handleClose();
            } else {
                toastNotify(result.MESSAGE, 'error');
            }
        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    }, [editTableData, formData])

    console.log('editTableData', editTableData);

    return (
        <>
            <Modal
                show={show}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-base'>Edit Customer</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        userNm: editTableData?.UserName || "",
                        firstNm: editTableData?.firstNm || "",
                        lastNm: editTableData?.lastNm || "",
                        mobileNo: editTableData?.MobileNo || "",
                        emailId: editTableData?.EmailId || "",
                    }}
                    validationSchema={Yup.object({
                        firstNm: Yup.string().required('First Name is required field'),
                        mobileNo: Yup.string().required('Mobile No. is required field').matches(/^[6-9][0-9]{9}$/, 'Must have valid contact no.'),
                        emailId: Yup.string().email('Email id must be a valid email').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Must have valid email id'),
                    })}
                    onSubmit={(values) => {
                        saveModifyData(values);
                    }}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <Modal.Body>
                                    <div>
                                        <div className='text-xs text-slate-500'>Username : <span className='text-sm text-primary ms-1'>{values.userNm}</span></div>
                                    </div>

                                    <Row className='mt-4'>
                                        <Col md={6}>
                                            <div>
                                                <Textfield
                                                    label="First Name"
                                                    placeholder='Enter First name'
                                                    name="firstNm"
                                                    id="firstNm"
                                                    size="sm"
                                                    tabIndex={2}
                                                    maxLength={50}
                                                    required
                                                    value={values.firstNm}
                                                    onChange={(e: any) => {
                                                        handleChange(e)
                                                        setFormData({ ...formData, FirstName: e.target.value })
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="firstNm" className='ErrorMessage' component="div" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div>
                                                <Textfield
                                                    label="Last Name"
                                                    name="lastNm"
                                                    placeholder='Enter Last name'

                                                    id="lastNm"
                                                    size="sm"
                                                    tabIndex={3}
                                                    maxLength={50}
                                                    value={values.lastNm}
                                                    onChange={(e: any) => {
                                                        handleChange(e)
                                                        setFormData({ ...formData, LastName: e.target.value })
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className='mt-3'>
                                        <Textfield
                                            label="Mobile No"
                                            name="mobileNo"
                                            placeholder='Enter Mobile number'

                                            id="mobileNo"
                                            size="sm"
                                            tabIndex={4}
                                            maxLength={10}
                                            required
                                            value={values.mobileNo}
                                            onChange={(e: any) => {
                                                handleChange(e)
                                                setFormData({ ...formData, MobileNo: e.target.value })
                                            }}
                                            onBlur={handleBlur}
                                        />
                                    </div>

                                    <div className='mt-3'>
                                        <Textfield
                                            label="Email Id"
                                            name="emailId"
                                            placeholder='Enter Email id'

                                            id="emailId"
                                            size="sm"
                                            tabIndex={5}
                                            maxLength={100}
                                            value={values.emailId}
                                            onChange={(e: any) => {
                                                handleChange(e)
                                                setFormData({ ...formData, EmailId: e.target.value })
                                            }}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="light" onClick={() => handleClose()} className='btn-sm'>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit' className='btn-sm' disabled={isLoader} >{!isLoader ? "Update" : <><Loader2 className='icon-loader text-white text-lg' /> Loading...</>}</Button>
                                </Modal.Footer>
                            </form>
                        )
                    }}
                </Formik>
            </Modal >
        </>
    )
}

export default CustomerMdl