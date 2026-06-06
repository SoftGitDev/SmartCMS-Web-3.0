import React, { Suspense, useCallback, useState } from 'react'
import * as urls from '../../../services/axios/url'

import { ServerCog } from 'lucide-react';
import { getUserData } from '../../../services/storage/common';
import { apiRequest } from '../../../services/api/apiRequest';
import toastNotify from '../../../services/notification/tostNotify';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import PageHeaeder from '../../../common/components/common/PageHeaeder';
import { Card, Col, Row } from 'react-bootstrap';
import ServicesCards from '../../integratedService/components/ServicesCards';


// Dummy array dataset for mapping loop integrations
const servicesListData = [
    {
        id: 101,
        TranCode: "TXN-CMS-001",
        ServiceName: "ATM Cash Replenishment Sync",
        Description: "Syncs real-time physical ATM cassette weights with core ledger balance logs.",
        Status: "Y",
        avatarBgColor: "#e0f2fe", // Soft Blue
        avatarLetter: "R",
        CategoryCd: "CMS_OPERATIONS",
        SubCategoryCd: "CASH_MANAGEMENT"
    },
    {
        id: 102,
        TranCode: "TXN-CMS-002",
        ServiceName: "B2B Mandate Authorization",
        Description: "Automated NACH validation module with instant e-sign pipeline routing.",
        Status: "Y",
        avatarBgColor: "#dcfce7", // Soft Green
        avatarLetter: "M",
        CategoryCd: "MANDATE_SERVICE",
        SubCategoryCd: "NACH_E_SIGN"
    },
    {
        id: 103,
        TranCode: "TXN-CMS-003",
        ServiceName: "Middleware Switch Heartbeat",
        Description: "Monitors network switch ping packets, latency metrics, and terminal heartbeat uptime.",
        Status: "Y",
        avatarBgColor: "#f3e8ff", // Soft Purple
        avatarLetter: "H",
        CategoryCd: "INFRASTRUCTURE",
        SubCategoryCd: "SWITCH_MONITOR"
    },
    {
        id: 104,
        TranCode: "TXN-CMS-004",
        ServiceName: "WhatsApp Business API Gateway",
        Description: "Dispatches real-time transactional customer updates and automated alerts via secure webhook.",
        Status: "N",
        avatarBgColor: "#fee2e2", // Soft Red
        avatarLetter: "W",
        CategoryCd: "NOTIFICATIONS",
        SubCategoryCd: "WHATSAPP_BOT"
    },
    {
        id: 105,
        TranCode: "TXN-CMS-005",
        ServiceName: "Cassette Fault Demuxer",
        Description: "Decodes binary hardware telemetry logs to classify physical dispenser jam errors.",
        Status: "Y",
        avatarBgColor: "#fef9c3", // Soft Yellow
        avatarLetter: "D",
        CategoryCd: "HARDWARE_DIAG",
        SubCategoryCd: "ATM_KIOSK"
    },
    {
        id: 106,
        TranCode: "TXN-CMS-006",
        ServiceName: "Branch Cash Limit Rebalancer",
        Description: "Optimizes cash reserve limits across local branches to streamline daily transport routes.",
        Status: "Y",
        avatarBgColor: "#ffedd5", // Soft Orange
        avatarLetter: "B",
        CategoryCd: "CMS_OPERATIONS",
        SubCategoryCd: "NONE"
    },
    {
        id: 107,
        TranCode: "TXN-CMS-007",
        ServiceName: "Audit Trail Cryptography Engine",
        Description: "Generates tamper-proof SHA-256 block hashes for secure administrator dashboard audit trails.",
        Status: "Y",
        avatarBgColor: "#e2e8f0", // Soft Slate
        avatarLetter: "A",
        CategoryCd: "SECURITY",
        SubCategoryCd: "COMPLIANCE"
    },
    // --- New API Blocks & Core Banking Services ---
    {
        id: 108,
        TranCode: "TXN-API-008",
        ServiceName: "REST IMPS Fund Transfer Block",
        Description: "Secure REST endpoint for instant interpersonal domestic fund transfers with real-time status query.",
        Status: "Y",
        avatarBgColor: "#cffafe", // Soft Cyan
        avatarLetter: "I",
        CategoryCd: "API_INTEGRATION",
        SubCategoryCd: "CORE_BANKING"
    },
    {
        id: 109,
        TranCode: "TXN-API-009",
        ServiceName: "KYC Document OCR Parser",
        Description: "Extracts identity fields from uploaded documents using image processing APIs.",
        Status: "Y",
        avatarBgColor: "#fae8ff", // Soft Pink
        avatarLetter: "K",
        CategoryCd: "API_INTEGRATION",
        SubCategoryCd: "ONBOARDING"
    },
    {
        id: 110,
        TranCode: "TXN-BNK-010",
        ServiceName: "IMPS/NEFT Settlement Clearing",
        Description: "Core batch processing utility managing end-of-day interbank settlements.",
        Status: "Y",
        avatarBgColor: "#e0e7ff", // Soft Indigo
        avatarLetter: "S",
        CategoryCd: "BANK_SERVICES",
        SubCategoryCd: "CLEARING_HOUSE"
    },
    {
        id: 111,
        TranCode: "TXN-BNK-011",
        ServiceName: "Corporate Current Account Ledger",
        Description: "High-throughput pipeline ledger logging bulk concurrent high-value enterprise accounts.",
        Status: "N",
        avatarBgColor: "#f5f5f4", // Soft Stone
        avatarLetter: "C",
        CategoryCd: "BANK_SERVICES",
        SubCategoryCd: "LEDGER_CORE"
    }
];

const Services = () => {

    const [mapServiceList, setMapServiceList] = useState<any>(servicesListData);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isServiceCalledMdl, setIsServiceCalledMdl] = useState<boolean>(false);
    const [serviceInputData, setServiceInputData] = useState<any>([]);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [isServiceDtlLoader, setIsServiceDtlLoader] = useState<boolean[]>([]);
    const userData = getUserData();

    const handleServiceCalledMdl = (data?: any, serviceData?: any) => {
        setIsServiceCalledMdl(!isServiceCalledMdl);
        setServiceInputData(data || null);
        setSelectedService(serviceData || null);
    }

    const getMapService = useCallback(async () => {
        try {
            setIsLoader(true);
            const payload = {
                CategoryCode: "0",
                SubCategoryCode: "0",
            };
            const config = {};
            const result = await apiRequest("POST", urls.getUserAssignService, payload, config)
            if (result.STATUS === '0') {
                setMapServiceList(result.RESPONSE);
            } else {
                result.MESSAGE !== "No data found" && toastNotify(result.MESSAGE, 'error');
            }

        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    }, [])

    // useEffect(() => {
    //     getMapService()
    // }, [])


    // Get Map Services inputs Data
    const getServiceInputData = useCallback(async (service: any, index: number) => {
        try {
            if (!userData.ServiceModuleAccess) return;

            const updateLoader = [...isServiceDtlLoader];
            updateLoader[index] = true;
            setIsServiceDtlLoader(updateLoader);

            setServiceInputData([]);
            const payload = { TranCode: service?.TranCode };

            const config = {};
            const result = await apiRequest("POST", urls.getServiceStepInput, payload, config)
            if (result.STATUS === '0') {
                handleServiceCalledMdl(result.RESPONSE, service);
            } else {
                toastNotify(result.MESSAGE, 'error');
            }
        } catch (error: any) {

        } finally {
            const updateLoader = [...isServiceDtlLoader];
            updateLoader[index] = false;
            setIsServiceDtlLoader(updateLoader);
        }
    }, [])

    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder 
                    Icon={ServerCog}
                    title="Service Management"
                    description="Monitor, configure, and manage your integrated backend service modules."
                />
            </Suspense>

            <div className='p-3'>
                <Row>
                    {isLoader ? (
                        <>
                            {Array(4).fill("").map((_, id: number) => (
                                <Col key={id} xs={12} sm={6} md={4} lg={3} className='mb-3'>
                                    <Card className="p-4 pt-5 text-center rounded-4">
                                        {/* Image/Icon skeleton (circular) */}
                                        <div className="skeleton rounded-4 mx-auto mb-4" style={{ width: "60px", height: "60px" }} ></div>
                                        <div className="skeleton skeleton-text w-50 mx-auto mb-4" style={{ height: "12px" }} ></div>
                                        <div className="skeleton skeleton-text w-25 mx-auto mb-4" style={{ height: "12px" }} ></div>
                                        <div className="skeleton skeleton-text w-75 mx-auto mb-4" style={{ height: "10px" }} ></div>
                                        <div className="skeleton skeleton-text w-60 mx-auto mb-4" style={{ height: "10px" }} ></div>
                                        <div className="skeleton skeleton-text w-75 mx-auto" style={{ height: "10px" }} ></div>
                                    </Card>
                                </Col>
                            ))}
                        </>
                    ) : (
                        <>
                            {mapServiceList?.length > 0 ? (
                                mapServiceList.map((item: any, idx: number) => {
                                    return (
                                        <React.Fragment key={idx}>
                                            <Col xs={12} sm={6} md={4} lg={3} className='mb-3'>
                                                <Suspense>
                                                    <ServicesCards
                                                        serviceData={item}
                                                        isServiceDtlLoader={isServiceDtlLoader}
                                                        getServiceDtls={() => getServiceInputData(item, idx)}
                                                        // updateServiceStatus={updateServiceStatus}
                                                        // handleDeleteConfirmationMdl={handleDeleteConfirmationMdl}
                                                        isEditLoader={isServiceDtlLoader}
                                                        idx={idx}
                                                        flag="C"
                                                    />
                                                </Suspense>
                                            </Col>
                                        </React.Fragment>
                                    );
                                }
                                )

                            ) : (<>
                                <div
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    style={{ height: "calc(100vh - 200px)", width: "100%", }}>
                                    <img src="/images/svg/55024593_9264820.svg" alt="no data found" style={{ width: 200 }} />
                                    <h1 className="text-sm text-center mt-3 text-slate-600">No Services found</h1>
                                </div>
                            </>
                            )}
                        </>

                    )}
                </Row>
            </div>


            {/* Service Create Modal */}
            {/* {
                isServiceCalledMdl && (
                    <ServiceCalledMdl
                        isOpen={isServiceCalledMdl}
                        handleClose={handleServiceCalledMdl}
                        serviceName={selectedService.ServiceName}
                        serviceDesciption={selectedService.Description}
                        selectedServiceInputData={serviceInputData}
                        setSelectedServiceInputData={setServiceInputData}
                    />
                )
            } */}
        </>
    )
}

export default Services