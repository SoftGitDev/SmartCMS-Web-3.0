// Purpose: Manage API CONFIGURATION 
// Created by: Prateek 
// Created Date: 26-01-2026

// Change History:
// 26-01-2026 | Prateek | Create a screen for API Configuration and Implement APIs
// 05-02-2026 | Prateek | Implement API of Export and Import API Configuration
// --------------------------------------------------------------


import { Cable, Download, Plus } from 'lucide-react';
import { lazy, Suspense, useCallback, useState } from 'react'
import { Button } from 'react-bootstrap';
import * as urls from "../../../services/axios/url";
import { ApiConfigDataProps, servicelistProps } from '../types/ApiConfigData';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import { apiRequest } from '../../../services/api/apiRequest';
import toastNotify from '../../../services/notification/tostNotify';
import { SweetAlerts } from '../../../services/notification/sweetAlert';
import { getUserData } from '../../../services/storage/common';
import PageHeaeder from '../../../common/components/common/PageHeaeder';


// const PageHeaeder = lazy(() => import("../../../app/components/common/PageHeaeder").then(({ default: PageHeaeder }) => ({ default: PageHeaeder })));
const ImportMdl = lazy(() => import("../components/ImportMdl").then(({ default: ImportMdl }) => ({ default: ImportMdl })));
const APIConfigTest = lazy(() => import("../components/APIConfigTest").then(({ default: APIConfigTest }) => ({ default: APIConfigTest })));
const APIConfigCard = lazy(() => import("../components/APIConfigCard").then(({ default: APIConfigCard }) => ({ default: APIConfigCard })));
const APIConfigFrm = lazy(() => import("../components/APIConfigFrm").then(({ default: APIConfigFrm }) => ({ default: APIConfigFrm })));

const APIConfig = () => {
    const userData = getUserData();
    const [isLoader, setIsLoader] = useState<boolean>(false)
    const [isDtlLoader, setIsDtlLoader] = useState({});
    const [isImport, setIsImport] = useState<boolean>(false);
    const [isExportLoader, setIsExportLoader] = useState<Record<number, boolean>>({});
    const [isTestLoader, setIsTestLoader] = useState<Record<number, boolean>>({});  //  separate
    const [isShowApiConfigMdl, setShowApiConfigMdl] = useState(false);
    const [isApiConfigTestMdl, setApiConfigTestMdl] = useState(false);
    const [servicesDtlData, setServicesDtlData] = useState<ApiConfigDataProps | null>(null);
    const [servicestestDtlData, setServicesTestDtlData] = useState<ApiConfigDataProps | null>(null);
    const [isImportAPIMdl, setIsImportAPIMdl] = useState<boolean>(false);
    const [isDeleteConfirmationMdl, setIsDeleteConfirmationMdl] = useState<boolean>(false);
    const [isDeleteLoader, setIsDeleteLoader] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [servicesData, setServicesData] = useState<servicelistProps[]>([]);

    const handleShowApiCreateMdl = (data?: ApiConfigDataProps | null, fromImport: boolean = false) => {
        setShowApiConfigMdl(prev => !prev);
        setServicesDtlData(data || null);
        setIsImport(fromImport);
    };

    const handleDeleteConfirmationMdl = (trancd?: string) => {
        setIsDeleteConfirmationMdl(!isDeleteConfirmationMdl);
        setServicesDtlData({ tranCd: trancd } as any);
    }


    const handleImportAPIsMdl = () => {
        setIsImportAPIMdl(!isImportAPIMdl);
    }


    const handleShowApiTestMdl = (data?: ApiConfigDataProps | null) => {
        setApiConfigTestMdl(prev => !prev);
        setServicesTestDtlData(data || null);
    };

    const handleEdit = useCallback(async (tranCode: number, index: number) => {
        try {
            // Set loader for specific card
            setIsDtlLoader((prev) => ({ ...prev, [index]: true }));

            const payload = { tranCd: tranCode };
            const config = {};

            const result = await apiRequest("POST", urls.getApiServiceDetail, payload, config)
            if (result.success && result.status === "200") {
                const response = result.response;
                // Open modal with service details
                handleShowApiCreateMdl({ ...response, tranCode });
            } else {
                result.Message !== "No data found" && toastNotify(result.message, "error");
            }
        } catch (error) {
            // Ignore Case
        } finally {
            // Remove loader for specific card
            setIsDtlLoader((prev) => ({ ...prev, [index]: false }));
        }
    }, []);


    // SERVICE LIST GET API
    const getServiceData = useCallback(async () => {
        try {
            setIsLoader(true);
            const payload = {};

            const result = await apiRequest("POST", urls.getApiServiceList, payload)
            if (result.success && result.status === "200") {
                const response = result.response || [];
                setServicesData(response);
            } else {
                setServicesData([]);
                result.Message !== "No Data Found!" && toastNotify(result.message, "error");
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, []);


    const updateServiceStatus = useCallback(async (tranCode: number, status: boolean) => {
        try {
            const payload = {
                tranCd: tranCode,
                status: status
            };

            const result = await apiRequest("PUT", urls.editApiServiceStatus, payload);

            if (result.success && result.status === "200") {
                // Update the local state
                setServicesData((prev: servicelistProps[]) =>
                    prev.map(service =>
                        service.tranCd === tranCode
                            ? { ...service, serviceStatus: status }
                            : service
                    )
                );
            } else {
                toastNotify(result.message || "Failed to update status", "error");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toastNotify("An error occurred while updating status", "error");
        }
    }, []);


    {/* SERVICE DETAIL DELETE API */ }
    const deleteServices = async () => {
        try {
            setIsDeleteLoader(true);
            const payload = {
                serviceCode: servicesDtlData?.tranCd || 0
            }
            const result = await apiRequest("DELETE", urls.deleteApiConfig, payload);

            if (result.status === '200' && result.success) {
                // toastNotify(result.Message, 'success');
                getServiceData();
                handleDeleteConfirmationMdl()
            } else {
                SweetAlerts("Error !", result.message, 'error');
            }
        } catch (error) {

        } finally {
            setIsDeleteLoader(false);
        }
    }

    // Fetch data on component mount
    // useEffect(() => {
    //     getServiceData();
    // }, [getServiceData]);


    const dummyAPIConfigs: any[] = [
        {
            tranCd: 1001,
            serviceNm: 'User Authentication Service',
            serviceType: 'Authentication',
            stepCount: 4,
            tranDate: '2026-05-11 10:30:00',
            serviceDesc: 'Handles secure user login and token validation.',
            serviceStatus: true,
        },
        {
            tranCd: 1002,
            serviceNm: 'Payment Gateway Integration',
            serviceType: 'Finance',
            stepCount: 7,
            tranDate: '2026-05-10 14:20:00',
            serviceDesc: 'Processes online payments and transaction verification.',
            serviceStatus: true,
        },
        {
            tranCd: 1003,
            serviceNm: 'SMS Notification API',
            serviceType: 'Communication',
            stepCount: 3,
            tranDate: '2026-05-09 09:15:00',
            serviceDesc: 'Sends OTPs and transactional SMS notifications.',
            serviceStatus: false,
        },
        {
            tranCd: 1004,
            serviceNm: 'Document Verification Service',
            serviceType: 'Verification',
            stepCount: 6,
            tranDate: '2026-05-08 16:40:00',
            serviceDesc: 'Verifies uploaded documents using OCR processing.',
            serviceStatus: true,
        },
        {
            tranCd: 1005,
            serviceNm: 'Email Automation Service',
            serviceType: 'Email',
            stepCount: 5,
            tranDate: '2026-05-07 11:00:00',
            serviceDesc: 'Automates email notifications and templates.',
            serviceStatus: false,
        },
        {
            tranCd: 1006,
            serviceNm: 'Customer Profile API',
            serviceType: 'CRM',
            stepCount: 8,
            tranDate: '2026-05-06 13:25:00',
            serviceDesc: 'Manages customer profile creation and updates.',
            serviceStatus: true,
        },
        {
            tranCd: 1007,
            serviceNm: 'Audit Log Management',
            serviceType: 'Security',
            stepCount: 2,
            tranDate: '2026-05-05 17:45:00',
            serviceDesc: 'Tracks user activities and security audit logs.',
            serviceStatus: true,
        },
        {
            tranCd: 1008,
            serviceNm: 'Cloud Storage Connector',
            serviceType: 'Storage',
            stepCount: 6,
            tranDate: '2026-05-04 08:50:00',
            serviceDesc: 'Integrates cloud storage providers for file management.',
            serviceStatus: false,
        },
    ];


    // Get test details and open test modal
    const handleTestDetails = useCallback(async (tranCode: number, index: number) => {
        try {
            setIsTestLoader((prev) => ({ ...prev, [index]: true }));

            const payload = { TranCode: tranCode };
            const config = {};

            const result = await apiRequest("POST", urls.getServiceTestDetail, payload, config)
            if (result.Status === "200" && result.Success) {
                const response = result.Response;
                // Open modal with service details
                handleShowApiTestMdl({ ...response, tranCode });
            } else {
                SweetAlerts("Error !", result.Message, "error");
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsTestLoader((prev) => ({ ...prev, [index]: false }));
        }
    }, []);

    // FUNCTION USED TO EXPORT THE PARTICULAR API CONFIGURATION
    const exportApiConfig = useCallback(async (tranCode: number, index: number) => {
        try {
            // Set loader for specific card
            setIsExportLoader((prev) => ({ ...prev, [index]: true }));

            const payload = { serviceCode: tranCode };
            const config = {};

            const result = await apiRequest("POST", urls.exportApiConfig, payload, config)
            if (result.Success) {
                const response = result.Response;
                // downloadFiles(response?.content, response?.name); // DONWLOAD THIS EXPORT FILE

            } else {
                toastNotify(result.Message, "error");
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsExportLoader((prev) => ({ ...prev, [index]: false }));
        }
    }, []);


    return (
        <div>

            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={Cable}
                    title={'API Configuration'}
                    description={'Manage multi-step API service configurations'}
                    button={
                        <div className='d-flex ms-auto gap-3'>
                            {/* {userData?.Permissions?.SAVE_ADM_API_CONF === "Y" && */}
                            <Button variant='success' size='sm' className="ms-auto" onClick={() => handleImportAPIsMdl()}>
                                <Download size={16} className="me-2" /> Import API Config
                            </Button>
                            {/* } */}

                            {/* {userData?.Permissions?.SAVE_ADM_API_CONF === "Y" && */}
                            <Button variant='primary' size='sm' className="" onClick={() => handleShowApiCreateMdl(null)}>
                                <Plus size={16} className="me-2" /> New API Config
                            </Button>
                            {/* } */}
                        </div>
                    } />
            </Suspense>

            <div className='p-3 pt-0'>
                <Suspense fallback={<LoaderUI />}>
                    <APIConfigCard
                        // apiConfigs={servicesData}
                        apiConfigs={dummyAPIConfigs}
                        onEdit={handleEdit}
                        onUpdateStatus={updateServiceStatus}
                        onDelete={handleDeleteConfirmationMdl}
                        isDtlLoader={isDtlLoader}
                        setIsEdit={setIsEdit}
                        userData={userData}
                        isLoader={isLoader}
                        handleTestDetails={handleTestDetails}
                        onExport={exportApiConfig}
                    />
                </Suspense>
            </div>
            {isShowApiConfigMdl && (
                <Suspense>
                    <APIConfigFrm
                        show={isShowApiConfigMdl}
                        handleClose={() => { handleShowApiCreateMdl(null); setIsEdit(false); }}
                        servicesDtlData={servicesDtlData}
                        getServiceData={getServiceData}
                        isEdit={isEdit}
                    />
                </Suspense>
            )}


            {isApiConfigTestMdl && (
                <Suspense>
                    <APIConfigTest
                        show={isApiConfigTestMdl}
                        handleClose={() => { setApiConfigTestMdl(false); setIsEdit(false); }}
                        servicesDtlData={servicestestDtlData}
                    />
                </Suspense>
            )}

            {isImportAPIMdl &&
                <Suspense>
                    <ImportMdl
                        show={isImportAPIMdl}
                        handleShowApiCreateMdl={(data: any) => handleShowApiCreateMdl(data, true)}
                        handleClose={() => handleImportAPIsMdl()}
                    />
                </Suspense>
            }

            {/* {isDeleteConfirmationMdl &&
                <Suspense>
                    <ConfirmModal
                        show={isDeleteConfirmationMdl}
                        onHide={() => handleDeleteConfirmationMdl()}
                        onConfirm={() => deleteServices()}
                        isLoading={isDeleteLoader}
                        type='delete'
                        title='Delete Confirmation'
                        message='Are you sure you want to delete this item?'
                    />
                </Suspense>
            } */}
        </div>
    )
}

export default APIConfig;