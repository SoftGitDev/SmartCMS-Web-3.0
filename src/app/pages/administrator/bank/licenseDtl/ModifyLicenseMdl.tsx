// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';

// interface LicenceRenewMdlProps {
//     show: boolean;
//     handleClose: () => void;
// }

// const LicenceRenewMdl: React.FC<LicenceRenewMdlProps> = ({ show, handleClose, }) => {
//     return (
//         <Modal show={show} onHide={handleClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Renew Licence</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//                 {/* Your content goes here */}
//                 <p>Are you sure you want to renew this licence?</p>
//             </Modal.Body>

//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Cancel
//                 </Button>
//                 <Button variant="primary" onClick={() => console.log('Renew action')}>
//                     Renew
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default LicenceRenewMdl;

// Purpose: Modify License Conponent
// Created by: Harish 
// Created Date: 25-05-2026

// Change History:

import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, ImagePlus, Loader, Settings2Icon } from 'lucide-react';
import { Formik, Form } from 'formik';
import { SweetAlerts } from '../../../../utils/sweetAlert';
import { apiRequest } from '../../../../utils/apiRequest';
import { getUserData } from '../../../../utils/common';
import * as urls from '../../../../utils/url'
import LoaderUI from '../../../../components/loader/Loader';
import StepIndicator from '../../../../components/ui/wizad/StepIndicator';
import License from '../../../onboarding/module/License';
import LicenseServicesTbl from './LicenseServicesTbl';
import TOTPValidation from '../../../../content/modal/TOTPValidation';


const allSteps = [
    { step: 1, title: 'Service Modules', subtitle: 'Select services', icon: Building2 },
    { step: 2, title: 'License Setup', subtitle: 'Configure license', icon: ImagePlus }
]


interface ModifyLicenseMdlProps {
    isOpen: boolean;
    handleClose: () => void;
    bankDetails?: any | null
}

interface FormValues {
    services: any[];
    LicXml?: string;
}

const ModifyLicenseMdl: React.FC<ModifyLicenseMdlProps> = ({ isOpen, handleClose, bankDetails }) => {
    const [isUpdateLicenseLoader, setIsUpdateLicenseLoader] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [moduleList, setModuleList] = useState<any[]>([]);
    const [isOtpMdl, setIsOtpMdl] = useState<boolean>(false);
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const [pendingValues, setPendingValues] = useState<FormValues | null>(null); // Store form values temporarily
    const userData = getUserData();

    const initialValues: FormValues = {
        services: [],
        LicXml: '',
    };

    const handleOtpMdl = () => {
        setIsOtpMdl(!isOtpMdl);
        setOtpValues((["", "", "", "", "", ""]))
    };

    const allServiceList = useCallback(async () => {
        try {
            const payload = {
                BankCode: bankDetails?.BankCode || userData?.BankCode
            };
            const result = await apiRequest("POST", urls.allServiceList, payload);
            if (result.Status === "200" && result.Success) {
                setModuleList(result.Response);
            } else {
                setModuleList([]);
                SweetAlerts("Error!", result.Message, 'error');
            }
        } catch {
            // Ignore Case
        }
    }, [userData?.BankCode]);

    // useEffect(() => {
    //     allServiceList();
    // }, [allServiceList]);


    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };


    // Update the handleNext function in ModifyLicenseMdl:
    const handleNext = (values: FormValues) => {
        if (currentStep === 0) {
            const hasSelection = values.services?.some(s => s.Status === 'Y');

            if (!hasSelection) {
                SweetAlerts("Error!", "Please select at least one service or module before proceeding.", 'error');
                return;
            }

            // Check if any changes were made
            const changesDetected = JSON.stringify(moduleList) === JSON.stringify(values.services);
            if (changesDetected) {
                SweetAlerts("Warning!", "No changes detected. Please modify at least one service or module selection.", 'warning');
                return;
            }
            setCurrentStep(currentStep + 1);
        }
    };


    //  Called on Submit — stores values and opens OTP modal
    const handleSubmit = async (values: FormValues) => {
        if (values.LicXml === "") {
            SweetAlerts("Error !", "Please provide valid license", "error")
            return;
        }
        setPendingValues(values);
        setIsOtpMdl(true);
    };



    const transformServicesToAPIFormat = (services: any[]) => {
        const updateVal = services.map((service) => {
            if (service.Status === 'Y') {
                return {
                    ServiceCode: service.serviceCode,
                    ModuleList: service.ModuleDetails.filter((module: any) => module.Status === 'Y').map((items: any) => ({ ModuleCode: items.ModuleCode }))
                }
            }
        });

        return updateVal.filter((items) => items);
    };

    // ✅ Called after OTP verified — sends actual API request with OTP
    const updateLicense = useCallback(async (otp: string) => {
        if (!pendingValues) return;

        setIsUpdateLicenseLoader(true);
        try {
            const payload = {
                LicenseXml: pendingValues.LicXml,
                Services: transformServicesToAPIFormat(pendingValues.services),
                OtpCode: otp // ✅ OTP added to payload
            };

            const result = await apiRequest("POST", urls.updateLicense, payload);

            if (result?.Success && result?.Status === "200") {
                SweetAlerts("Success!", result?.Message, 'success');
                setIsOtpMdl(false);
                handleClose();
            } else {
                SweetAlerts("Error!", result?.Message, 'error');
            }
        } catch {
            // Ignore Case
        } finally {
            setIsUpdateLicenseLoader(false);
        }
    }, [pendingValues, handleClose]);

    const serviceValues: any = {
        services: [
            {
                serviceCode: 'TCP001',
                serviceName: 'Client Panel',
                serviceDesc: 'External Use Only',
                ExpiryDate: '31 Dec 2026',
                Status: 'Y',
                ModuleDetails: [],
            },

            {
                serviceCode: 'TIS001',
                serviceName: 'Ticket Integration Service',
                serviceDesc: 'Connect external ticket systems',
                ExpiryDate: '15 Jan 2027',
                Status: 'Y',
                ModuleDetails: [],
            },

            {
                serviceCode: 'SER001',
                serviceName: 'Service Module',
                serviceDesc: 'Manage organization services',
                ExpiryDate: '20 Feb 2027',
                Status: 'Y',
                ModuleDetails: [],
            },

            {
                serviceCode: 'MAIL001',
                serviceName: 'Mail Module',
                serviceDesc: 'Email communication service',
                ExpiryDate: '10 Mar 2027',
                Status: 'Y',
                ModuleDetails: [],
            },

            {
                serviceCode: 'WA001',
                serviceName: 'Whatsapp Integration',
                serviceDesc: 'Whatsapp communication support',
                ExpiryDate: '05 Apr 2027',
                Status: 'Y',
                ModuleDetails: [],
            },

            {
                serviceCode: 'SMS001',
                serviceName: 'SMS Integration',
                serviceDesc: 'SMS notification service',
                ExpiryDate: '18 May 2027',
                Status: 'Y',
                ModuleDetails: [],
            },

            {
                serviceCode: 'IVR001',
                serviceName: 'IVR Integration',
                serviceDesc: 'Call and IVR management',
                ExpiryDate: '25 Jun 2027',
                Status: 'Y',
                ModuleDetails: [],
            },
        ],
    };


    return (
        <div>
            <Modal show={isOpen} onHide={handleClose} backdrop="static" size='lg' keyboard={false}>
                <Modal.Header closeButton className='border-0'>
                    <div className="d-flex align-items-center gap-3">
                        <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                            <Settings2Icon size={24} />
                        </div>
                        <div>
                            <h6 className="mb-0">Services Configuration</h6>
                            <span className="text-md fw-light">Select and configure the service and modules</span>
                        </div>
                    </div>
                </Modal.Header>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        if (currentStep === allSteps.length - 1) {
                            handleSubmit(values) //  Now opens OTP modal instead of calling API directly
                        } else {
                            handleNext(values)
                        }
                    }}
                // enableReinitialize
                >
                    {({ values, setFieldValue, handleChange, handleBlur, submitForm }) => (
                        <Form>
                            <Modal.Body>
                                <StepIndicator allSteps={allSteps} currentStep={(currentStep + 1)} />

                                {currentStep === 0 && (
                                    <div className='mt-3'>
                                        {/* {serviceValues.length > 0 && ( */}
                                        <Suspense fallback={<div className="text-center py-5"><Loader /></div>}>
                                            <LicenseServicesTbl
                                                heading="Service Modules"
                                                data={serviceValues.services}
                                                flag="All"
                                                setFieldValue={setFieldValue}
                                                values={values}
                                            />
                                        </Suspense>
                                        {/* )} */}
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className='mt-4'>
                                        <Suspense fallback={<div className="text-center py-5"><LoaderUI /></div>}>
                                            <License
                                                values={values}
                                                flag="EDIT"
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                mode='licenseStep'
                                                setFieldValue={setFieldValue}
                                            />
                                        </Suspense>
                                    </div>
                                )}
                            </Modal.Body>

                            <Modal.Footer className="border-top">
                                <div className="d-flex justify-content-between w-100 gap-2">
                                    <Button type="button" variant="light" size='sm' onClick={handlePrev} disabled={currentStep === 0} className="d-flex align-items-center gap-2" > <ArrowLeft size={16} /> Previous</Button>
                                    <Button type="submit" variant="primary" size='sm' disabled={isUpdateLicenseLoader} className="d-flex align-items-center gap-2">
                                        {isUpdateLicenseLoader ? (
                                            <> <Loader size={16} className="spinner-border spinner-border-sm" /> Submitting... </>
                                        ) : (
                                            currentStep === allSteps.length - 1 ? <> <CheckCircle2 size={16} /> Submit </> : <> Next <ArrowRight size={16} /></>
                                        )}
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Form>

                    )}
                </Formik>
            </Modal >

            {isOtpMdl &&
                <TOTPValidation
                    setOtpValues={setOtpValues}
                    otpValues={otpValues}
                    isOpen={isOtpMdl}
                    toggle={handleOtpMdl}
                    isUpdateLicenseLoader={isUpdateLicenseLoader}
                    onVerifySuccess={updateLicense} // Now receives (otp: string) from inside TOTPValidation
                />
            }
        </div>
    )
}

export default ModifyLicenseMdl