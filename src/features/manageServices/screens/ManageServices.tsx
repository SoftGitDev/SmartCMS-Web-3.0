// Purpose: Manage Services 
// Created by: Harish 
// Created Date: 04-06-2026

import React, { lazy, Suspense, useCallback, useState } from 'react'
import { PlusCircle, Settings } from 'lucide-react'
import { Button, Card, Col, Row } from 'react-bootstrap';

import * as urls from '../../../services/axios/url'
import { apiRequest } from '../../../services/api/apiRequest';
import toastNotify from '../../../services/notification/tostNotify';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import PageHeaeder from '../../../common/components/common/PageHeaeder';
import ServicesCards from '../../integratedService/components/ServicesCards';
import ServiceCreateMdl from '../components/ServiceCreateMdl';

// Lazy loading the PageHeader component

const dummyServicesData = [
    {
        TranCode: "SRV001",
        ServiceName: "WhatsApp Integration Platform",
        Description: "Official WhatsApp Business API integration setup. Scale customer engagement, automate responses, and run promotional broadcasts smoothly.",
        Status: "Y",
        Base64: "https://vectorjungal.com/files/preview/1280x853/11722416436m7boof96vofutcqloubkchzpyuswossfwlqmxitpsszzwm6nuhf6mutjwpk3xgwm38kctvqbbovbnjijtl8vcvkn4xq5kyxnlfek.png?type=free",
        base64: "",
        EntryDate: "2026-04-12T10:30:00Z",
        CategoryCd: "COMMUNICATION",
        SubCategoryCd: "MESSAGING"
    },
    {
        TranCode: "SRV002",
        ServiceName: "Corporate Mandate Manager",
        Description: "Automate and manage recurring e-mandates and bank authorization requests for corporate clients with high-throughput validation pipelines.",
        Status: "Y",
        Base64: "",
        base64: "",
        EntryDate: "2026-05-01T14:15:00Z",
        CategoryCd: "FINTECH",
        SubCategoryCd: "AUTOPAY"
    },
    {
        TranCode: "SRV003",
        ServiceName: "Error Monitoring & Logs Dashboard",
        Description: "Real-time production environment log monitoring and exception tracking system to alert developers about critical pipeline breakdowns instantly.",
        Status: "N",
        Base64: "https://static.vecteezy.com/system/resources/previews/002/293/499/large_2x/exclamation-mark-symbol-red-warning-dangerous-icon-on-white-background-free-vector.jpg",
        base64: "",
        EntryDate: "2026-01-20T09:00:00Z",
        CategoryCd: "DEVOPS",
        SubCategoryCd: "LOGGING"
    },
    {
        TranCode: "SRV004",
        ServiceName: "Call Center Activity Monitor",
        Description: "Centralized live administration panel tracking specific branch activities, queue lengths, and agent response efficiencies across regions.",
        Status: "Y",
        Base64: "", // Intentionally empty to test fallback Cog icon
        base64: "",
        EntryDate: "2025-10-15T18:45:00Z",
        CategoryCd: "OPERATIONS",
        SubCategoryCd: "NONE" // Tests the hiding of Sub-Category block
    }
];

const ManageServices = () => {

    const [isManageSerices, setIsManageSerices] = useState<boolean>(false)

    const [isShowApiCreateMdl, setShowApiCreateMdl] = useState(false); //State for User Create Modal
    const [isShowApiDtlMdl, setShowApiDtlMdl] = useState(false); //State for User Create Modal
    const [servicesData, setServicesData] = useState(dummyServicesData) // this is getServiceList Data
    const [servicesDtlData, setServicesDtlData] = useState<any>(null); // this is the state for 
    const [isDeleteLoader, setIsDeleteLoader] = useState<boolean>(false);
    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isEditLoaderIndex, setIsEditLoaderIndex] = useState<any>([]);


    // Handle Manage Services 
    const handleManageServices = () => {
        setIsManageSerices(!isManageSerices)
    }


    const handleDeleteConfirmationMdl = (deleteItem?: string) => {
        setIsDeleteConfirmation(!isDeleteConfirmation);
        setServicesDtlData(deleteItem || null);
    }

    const handleShowApiCreateMdl = (data?: any) => {
        setShowApiCreateMdl(!isShowApiCreateMdl);
        setServicesDtlData(data || null)
    };

    const handleShowApiDtlMdl = (data?: any) => { setShowApiDtlMdl(!isShowApiDtlMdl) };

    const getServiceData = useCallback(async () => {
        try {
            setIsLoader(true);
            const payload = {};
            const config = {};
            const result = await apiRequest("POST", urls.getServiceList, payload, config)
            if (result.STATUS === '0') {
                const response = result.RESPONSE;
                setIsEditLoaderIndex(new Array(response.length).fill(false));
                setServicesData(response);
            } else {
                setServicesData([]);
                result.MESSAGE !== "No data found" && toastNotify(result.MESSAGE, "error");
            }
        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    }, []);

    const getServiceDtl = useCallback(async (tranCode: string, index?: number) => {
        if (index === undefined) return;
        try {
            const updateLoader = [...isEditLoaderIndex];
            updateLoader[index] = true;
            setIsEditLoaderIndex(updateLoader);

            const payload = { TranCode: tranCode };
            const config = {};

            const result = await apiRequest("POST", urls.getServiceDetail, payload, config)
            if (result.STATUS === '0') {
                const response = result.RESPONSE;
                handleShowApiCreateMdl({ ...response[0], tranCode: tranCode });
            } else {
                result.MESSAGE !== "No data found" && toastNotify(result.MESSAGE, "error");
            }
        } catch (error: any) {

        }
        finally {
            const updateLoader = [...isEditLoaderIndex];
            updateLoader[index] = false;
            setIsEditLoaderIndex(updateLoader);
        }
    }, [])

    const updateServiceStatus = useCallback(async (status: string, tranCd: string) => {
        try {
            const payload = { TranCode: tranCd, ActiveStatus: status };
            const config = {};

            const result = await apiRequest("POST", urls.editServiceStatus, payload, config)
            if (result.STATUS === "0") {
                toastNotify(result.MESSAGE, "success");

                setServicesData((prevData: any) =>
                    prevData.map((service: any) =>
                        service.TranCode === tranCd ? { ...service, Status: status } : service
                    )
                );
            } else {
                toastNotify(result.MESSAGE, "error");
            }
        } catch (error: any) {

        }
    }, [setServicesData]);




    // useMemo(() => {
    //     getServiceData();
    // }, []);



    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={Settings}
                    title={'Manage Services'}
                    description={'View, configure, update, and monitor all active platform services, operational metrics, and system statuses.'}
                    button={<div className='ms-auto'>
                        <Button size='sm' onClick={handleManageServices}>
                            <PlusCircle size={16} className='me-1' /> Create Service
                        </Button>
                    </div>}
                />
            </Suspense>

            {/* Card UI */}
            <div className='p-3'>
                <Row>
                    {isLoader ? (
                        <>
                            {Array(4).fill("").map((_, id: number) => (
                                <Col key={id} xs={12} sm={6} md={4} lg={3} className="mb-3">
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

                                // create this skeleton loader according to new card design img and center the remaining name and description 
                            ))}
                        </>
                    ) : (
                        <>
                            {servicesData.length > 0 ? (
                                servicesData.map((item: any, idx: number) => {
                                    return (
                                        <Col key={idx} xs={12} sm={6} md={4} lg={3} className='mb-3'>
                                            <Suspense>
                                                <ServicesCards
                                                    serviceData={item}
                                                    getServiceDtls={() => getServiceDtl(item.TranCode, idx)}
                                                    handleServiceTestMdl={() => handleShowApiDtlMdl(item.TranCode)}
                                                    updateServiceStatus={updateServiceStatus}
                                                    handleDeleteConfirmationMdl={handleDeleteConfirmationMdl}
                                                    isEditLoader={isEditLoaderIndex}
                                                    idx={idx}
                                                    flag='SERVICE'
                                                />
                                            </Suspense>
                                        </Col>
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

                            {/*
                                the idx index is not working on 1st index means
                                index 0 onlyidx 0
                                ServicesCards.tsx:55 index false onlyidx 1
                                ServicesCards.tsx:55 index undefined onlyidx 2
                                ServicesCards.tsx:55 index undefined onlyidx 3  */}
                        </>

                    )}
                </Row >
            </div>

            <ServiceCreateMdl
                show={isManageSerices}
                handleClose={handleManageServices}
                servicesDtlData={servicesDtlData} />
        </>
    )
}

export default ManageServices