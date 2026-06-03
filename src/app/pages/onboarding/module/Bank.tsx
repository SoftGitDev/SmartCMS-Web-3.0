// Purpose: OnBoarding Step First - Organization  Details Component
// Created by: Harish
// Created Date: 21-05-2026

// Change History:
// 21-05-2026 | Harish | Created Organization  Details Component
// --------------------------------------------------------------

import React, { useRef } from 'react';
import { Row, Col, } from 'react-bootstrap';

import { Building2, ShieldCheck, KeyRound, Globe, Landmark, } from 'lucide-react';
import Textfield from '../../../components/ui/TextField/TextInput';
import DocumentCard from '../../../components/ui/documentUpload/DocumentCard';

// =========================
// Props Interface
// =========================

interface BankProps {
    values: any;
    setFieldValue: (field: string, value: any) => void;
    ErrorMessage: any;
    handleBlur: any;
    getNextTabIndex: () => number;
}

// =========================
// Component
// =========================

const Bank: React.FC<BankProps> = ({ values, setFieldValue, ErrorMessage, handleBlur, getNextTabIndex, }) => {
    // Ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="p-4 pt-0">
            <Row className="g-4">
                {/* =========================
                    Left Side Form
                ========================= */}
                <Col lg={8}>
                    <Row className="g-3">
                        {/* Organization  */}
                        <Col md={6}>
                            <Textfield
                                label="Organization Name "
                                name="bankName"
                                placeholder="Enter Organization  name"
                                required
                                type='text'
                                maxLength={100}
                                value={values.bankName}
                                onBlur={handleBlur}
                                tabIndex={getNextTabIndex()}
                                IconProp={Building2}
                                onChange={(e) => {
                                    const regex = /^[A-Za-z\s]*$/;
                                    if (regex.test(e.target.value)) {
                                        setFieldValue('bankName', e.target.value);
                                    }
                                }}
                            />
                            <ErrorMessage name="bankName" component="div" className="ErrorMessage" />
                        </Col>

                        {/* NPCI Code */}
                        <Col md={6}>
                            <Textfield
                                label="Organization  Code"
                                name="bankCode"
                                placeholder="Enter Organization  Code"
                                required
                                type='text'
                                maxLength={20}
                                value={values.bankCode}
                                onBlur={handleBlur}
                                tabIndex={getNextTabIndex()}
                                IconProp={Landmark}
                                onChange={(e) => {
                                    const regex = /^[A-Za-z0-9]*$/;
                                    if (regex.test(e.target.value
                                    )) {
                                        setFieldValue('bankCode', e.target.value.toUpperCase());
                                    }
                                }}
                            />
                            <ErrorMessage name="bankCode" component="div" className="ErrorMessage" />
                        </Col>

                        {/* <Col md={6}>
                            <Textfield
                                label="Product Key"
                                name="productKey"
                                placeholder="Enter product key"
                                required
                                type='text'
                                maxLength={100}
                                value={values.productKey}
                                onBlur={handleBlur}
                                tabIndex={getNextTabIndex()}
                                IconProp={KeyRound}
                                onChange={(e) => {
                                    const regex = /^[A-Za-z0-9-_]*$/;
                                    if (regex.test(e.target.value)) {
                                        setFieldValue('productKey', e.target.value);
                                    }
                                }}
                            />
                            <ErrorMessage name="productKey" component="div" className="ErrorMessage" />

                        </Col>
                        <Col md={6}>
                            <Textfield
                                label="Secret Key"
                                type="password"
                                name="secretKey"
                                placeholder="Enter secret key"
                                required
                                maxLength={100}
                                value={values.secretKey}
                                onBlur={handleBlur}
                                tabIndex={getNextTabIndex()}
                                IconProp={ShieldCheck}
                                onChange={(e) => {
                                    const regex = /^[A-Za-z0-9-_]*$/;
                                    if (regex.test(e.target.value)) {
                                        setFieldValue('secretKey', e.target.value);
                                    }
                                }}
                            />
                            <ErrorMessage name="secretKey" component="div" className="ErrorMessage" />
                        </Col> */}

                        {/* Admin Domain */}
                        <Col md={6}>
                            <Textfield
                                label="Admin Domain"
                                name="adminDomain"
                                placeholder="https://admin.domain.com"
                                required
                                type='text'
                                maxLength={200}
                                value={values.adminDomain}
                                onBlur={handleBlur}
                                tabIndex={getNextTabIndex()}
                                IconProp={Globe}
                                onChange={(e) => {
                                    setFieldValue('adminDomain', e.target.value);
                                }}
                            />
                            <ErrorMessage name="adminDomain" component="div" className="ErrorMessage" />
                        </Col>
                        {/* Client Domain */}
                        <Col md={6}>
                            <Textfield
                                label="Client Domain"
                                name="clientDomain"
                                placeholder="https://client.domain.com"
                                required
                                type='text'
                                maxLength={200}
                                value={values.clientDomain}
                                onBlur={handleBlur}
                                tabIndex={getNextTabIndex()}
                                IconProp={Globe}
                                onChange={(e) => {
                                    setFieldValue('clientDomain', e.target.value);
                                }}
                            />
                            <ErrorMessage name="clientDomain" component="div" className="ErrorMessage" />
                        </Col>
                    </Row>
                </Col>
                {/* =========================
                    Right Side Logo Upload
                ========================= */}
                <Col lg={4}>
                    <DocumentCard
                        title={"Organization Logo"}
                        imageBase64={values.logo}
                        isRequired
                        subdescTitle="Click here to upload Organization Logo"
                        descTitle="PNG, JPG supported"
                        fileInputRef={fileInputRef}
                        fileErrorName="logo"
                        maxSize={500}
                        onUploadClick={() => {
                            fileInputRef.current?.click();
                        }}
                        onFileChange={async (e: any) => {
                            setFieldValue("logo", e?.base64 || '');
                            setFieldValue("logoWidth", e?.width || 0);
                            setFieldValue("logoHeight", e?.height || 0);
                        }}
                        onFileBlur={handleBlur}
                    />
                    <ErrorMessage name="logo" component="div" className="ErrorMessage" />
                </Col>

            </Row>

        </div>
    );
};

export default Bank;