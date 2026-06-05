// Purpose: OnBoarding Components
// Created by: Harish
// Created Date: 21-05-2026

// Change History:
// 21-05-2026 | Harish | Create an OnBoarding component
// --------------------------------------------------------------

import React, { useState } from 'react';
import SetupLayout from '../authentication/layout/SetupLayout';
import { Boxes, Building, Building2, Server, ShieldCheck, } from 'lucide-react';
import { Button, Card, CardBody, CardFooter, CardHeader, } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StepIndicator from '../../components/ui/wizad/StepIndicator';
import Bank from './module/Bank';
import HeadOffice from './module/HeadOffice';
import Module from './module/Module';
import License from './module/License';
import ServerHelthConfig from './module/ServerHelthConfig';


// Wizard Steps
const allSteps = [
    {
        step: 1,
        title: 'Organization  Details',
        subtitle: 'Manage bank information',
        icon: Building2,
    },
    {
        step: 2,
        title: 'Head Office',
        subtitle: 'Head office configuration',
        icon: Building,
    },
    {
        step: 3,
        title: 'Module Setup',
        subtitle: 'Manage modules & resources',
        icon: Boxes,
    },
    {
        step: 4,
        title: 'Server Monitoring',
        subtitle: 'Track server status & health metrics',
        icon: Server,
    },
    {
        step: 5,
        title: 'License Setup',
        subtitle: 'Activate and manage licenses',
        icon: ShieldCheck,
    },
];

// Initial Values
const initialValues = {
    // Step 1
    bankName: '',
    bankCode: '',

    adminDomain: '',
    clientDomain: '',
    logo: null,

    // STEP 2 - HEAD OFFICE
    branchName: '',
    branchCode: '',
    contactNo: '',
    emailId: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: null,
    pinCode: '',
    country: '',

    // STEP 3 - MODULE SETUP
    ticketAdminPanel: false,
    ticketClientPanel: false,
    ticketIntegService: false,
    serviceModule: false,
    mailModule: false,
    whatsappInteg: false,
    smsInteg: false,
    ivrInteg: false,

    // STEP 4 - Servicer SETUP
    isServerConfig: false,
    productKey: '',
    secretKey: '',

    // STEP 5 - LICENSE SETUP
    licenseKey: '',
    licenseType: null,
    expiryDate: '',
};


// =========================
// Step Validation Schemas
// =========================

const stepSchemas = [
    // STEP 1
    Yup.object().shape({
        bankName: Yup.string()
            .required('Organization  is required'),

        bankCode: Yup.string()
            .required('Organization Code is required'),



        adminDomain: Yup.string()
            .required('Admin domain is required'),

        clientDomain: Yup.string()
            .required('Client domain is required'),
    }),
    // STEP 2
    Yup.object().shape({

        branchName: Yup.string()
            .required('Branch name is required')
            .min(2, 'Minimum 2 characters'),

        branchCode: Yup.string()
            .required('Branch code is required'),

        contactNo: Yup.string()
            .required('Mobile number is required')
            .matches(
                /^[0-9]{10}$/,
                'Enter valid 10 digit mobile number'
            ),

        emailId: Yup.string()
            .email('Enter a valid email address')
            .required('Email is required'),

        addressLine1: Yup.string()
            .required('Address line 1 is required'),

        city: Yup.string()
            .required('City is required'),

        state: Yup.object()
            .nullable()
            .required('State is required'),

        pinCode: Yup.string()
            .required('Pin code is required')
            .matches(
                /^[0-9]{6}$/,
                'Enter valid 6 digit pin code'
            ),
        country: Yup.object().required('Country is required'),
    }),
    // STEP 3
    Yup.object().shape({}),

    // STEP 4
    Yup.object().shape({
        productKey: Yup.string().required('Product key is required'),
        secretKey: Yup.string().required('Secret key is required'),
    }),

    // STEP 5
    Yup.object().shape({}),
];



const Onboarding = () => {
    // Current Step
    const [currentStep, setCurrentStep] = useState<number>(0);

    // Tab click and step next
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;


    // Handle Previous
    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    // Handle Final Submit
    const handleSubmit = async (values: any) => {
        try {
            console.log('Final Payload:', values);
            // API CALL HERE
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <SetupLayout
                title="New Organization Onboard"
                subtitle="Configure workspace, administrative roles, and infrastructure settings."
            >
                <Card className="border-0 shadow-sm rounded-4">
                    {/* HEADER */}
                    <CardHeader className="bg-white border-0">
                        <div className="d-flex mt-3 p-1 pb-0  justify-content-center align-items-center mb-4">
                            <StepIndicator
                                allSteps={allSteps}
                                currentStep={(currentStep + 1) as any}
                            />
                        </div>
                    </CardHeader>
                    {/* =========================
                        FORM
                    ========================= */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={stepSchemas[currentStep]}
                        onSubmit={handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={true}
                    >
                        {({ values, setFieldValue, handleSubmit: formikSubmit, isSubmitting, handleBlur, handleChange, validateForm, setTouched, }) => {
                            // =========================
                            // Handle Next
                            // =========================
                            const handleNext = async () => {
                                // LAST STEP SUBMIT
                                if (currentStep === allSteps.length - 1) {
                                    formikSubmit();
                                    return;
                                }
                                // NEXT STEP
                                setCurrentStep((prev) => prev + 1);
                            };
                            return (
                                <form id="onboard-form" onSubmit={formikSubmit} noValidate>
                                    {/* BODY */}
                                    <CardBody style={{ maxHeight: 500, overflow: 'auto', }}>
                                        {/* STEP 1 */}
                                        {currentStep === 0 && (
                                            <Bank
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                ErrorMessage={ErrorMessage}
                                                handleBlur={handleBlur}
                                                getNextTabIndex={getNextTabIndex}
                                            />
                                        )}
                                        {/* STEP 2 */}
                                        {currentStep === 1 && (
                                            <HeadOffice
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                ErrorMessage={ErrorMessage}
                                                handleBlur={handleBlur}
                                                getNextTabIndex={getNextTabIndex}
                                            />

                                        )}
                                        {/* STEP 3 */}
                                        {currentStep === 2 && (
                                            <Module
                                                values={values}
                                                setFieldValue={setFieldValue}
                                            />

                                        )}
                                        {/* STEP 4 */}
                                        {currentStep === 3 && (
                                            <ServerHelthConfig
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                handleBlur={handleBlur}
                                                getNextTabIndex={getNextTabIndex}
                                            />

                                        )}
                                        {/* STEP 5 */}
                                        {currentStep === 4 && (
                                            <div>
                                                <License
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    mode={'licenseStep'}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                />
                                            </div>
                                        )}
                                    </CardBody>
                                    {/* =========================
                                        FOOTER
                                    ========================= */}
                                    <CardFooter className="d-flex align-items-center justify-content-between bg-white border mt-2">
                                        {/* PREVIOUS */}
                                        <Button variant="light" className="border" disabled={currentStep === 0} onClick={handlePrevious}                                        >
                                            Previous
                                        </Button>
                                        {/* NEXT / SUBMIT */}
                                        <Button variant="primary" type="button" onClick={handleNext} disabled={isSubmitting}                                        >
                                            {currentStep === allSteps.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </CardFooter>
                                </form>
                            );
                        }}
                    </Formik>
                </Card>
            </SetupLayout>
        </>
    );
};

export default Onboarding;