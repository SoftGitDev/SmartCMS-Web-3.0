import { Suspense, useCallback, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import * as urls from "../../../services/axios/url";
import { PlusCircle, Settings2 } from 'lucide-react';
import { apiRequest } from '../../../services/api/apiRequest';
import toastNotify from '../../../services/notification/tostNotify';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import PageHeaeder from '../../../common/components/common/PageHeaeder';
import ServicesCards from '../components/ServicesCards';
import IntegratedServiceMdl from '../components/IntegratedServiceMdl';




const IntergratedService = () => {
    const [isShowApiCreateMdl, setShowApiCreateMdl] = useState(false); //State for User Create Modal
    const [isShowApiDtlMdl, setShowApiDtlMdl] = useState(false); //State for User Create Modal
    // const [servicesData, setServicesData] = useState([]) // this is getServiceList Data
    const [servicesData, setServicesData] = useState([
        {
            TranCode: "SRV001",
            ServiceName: "SMS Service",
            Description: "Send SMS notifications to customers.",
            Status: "Y",
            Base64: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvxR2R23C6WpMDztO-xR-sklKOLtJuri4a09ZgZZUOsA&s",
            base64: "",
            EntryDate: "2026-06-01",
            CategoryCd: "COMM",
            SubCategoryCd: "SMS"
        },
        {
            TranCode: "SRV002",
            ServiceName: "Email Service",
            Description: "Send transactional and promotional emails.",
            Status: "N",
            Base64: "https://img.magnific.com/premium-vector/flat-line-icon-concept-cloud-email-service-online-message-service-cloud-server-hosting-email_645918-527.jpg",
            base64: "",
            EntryDate: "2026-06-02",
            CategoryCd: "COMM",
            SubCategoryCd: "EMAIL"
        },
        {
            TranCode: "SRV003",
            ServiceName: "Payment Gateway",
            Description: "Secure online payment processing service.",
            Status: "Y",
            Base64: "https://www.vhv.rs/dpng/d/497-4978107_all-payment-gateway-hd-png-download.png",
            base64: "",
            EntryDate: "2026-06-03",
            CategoryCd: "PAYMENT",
            SubCategoryCd: "NONE"
        }
    ]);
    const [servicesDtlData, setServicesDtlData] = useState<any>(null); // this is the state for 
    const [isDeleteLoader, setIsDeleteLoader] = useState<boolean>(false);
    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isCountLoader, setIsCountLoader] = useState<boolean>(false);
    const [isEditLoaderIndex, setIsEditLoaderIndex] = useState<any>([]);
    const [servicesDataCount, setServicesDataCount] = useState<any>([]);

    const handleDeleteConfirmationMdl = (deleteItem?: string) => {
        setIsDeleteConfirmation(!isDeleteConfirmation);
        setServicesDtlData(deleteItem || null);
    }

    const handleShowApiCreateMdl = (data?: any) => {
        setShowApiCreateMdl(prev => !prev);
        setServicesDtlData(data || null);
    };

    const handleShowApiDtlMdl = (data?: any) => { setShowApiDtlMdl(!isShowApiDtlMdl) };


    {/* SERVICE LIST GET API */ }
    const getServiceData = useCallback(async () => {
        try {
            setIsLoader(true);
            const payload = {};
            const config = {};
            const result = await apiRequest("POST", urls.getTicketIntageServiceList, payload, config)

            if (result.STATUS === '9') {
                const response = result.DATA;
                setServicesData(response);
                setIsEditLoaderIndex(new Array(response.length).fill(false));
            } else {
                setServicesData([]);
                result.MESSAGE !== "No data found" && toastNotify(result.MESSAGE, "error");
            }
        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    }, []);


    {/* SERVICE LIST GET API */ }
    const getTicketIntageServiceCount = useCallback(async () => {
        try {
            setIsCountLoader(true);
            const payload = {};
            const config = {};
            const result = await apiRequest("POST", urls.getTicketIntageServiceCount, payload, config)
            if (result.STATUS === '0') {
                const response = result.DATA;
                setServicesDataCount(response);
            } else {
                setServicesDataCount([]);
                result.MESSAGE !== "No data found" && toastNotify(result.MESSAGE, "error");
            }
        } catch (error: any) {

        } finally {
            setIsCountLoader(false);
        }
    }, []);


    {/* SERVICE DETAIL GET API */ }
    const getServiceDtl = useCallback(async (tranCode: string, index?: number) => {
        try {
            if (index) {
                const updateLoader = [...isEditLoaderIndex];
                updateLoader[index] = true;
                setIsEditLoaderIndex(updateLoader);
            }

            const payload = { serviceTranCd: tranCode };
            const config = {};

            const result = await apiRequest("POST", urls.getTicketIntageServiceDetail, payload, config)
            if (result.STATUS === '0') {
                const response = result.DATA;   // response is an object, NOT array
                { isShowApiCreateMdl ? setServicesDtlData({ ...response, tranCode }) : handleShowApiCreateMdl({ ...response, tranCode }); }

                // setShowApiCreateMdl(prev => !prev);
                // setServicesDtlData(data || null);
            } else {
                result.MESSAGE !== "No data found" && toastNotify(result.MESSAGE, "error");
            }

        } catch (error: any) {

        }
        finally {
            if (index) {
                const updateLoader = [...isEditLoaderIndex];
                updateLoader[index] = false;
                setIsEditLoaderIndex(updateLoader);
            }

        }
    }, [isShowApiCreateMdl])

    {/* SERVICE DETAIL EDIT API */ }
    const updateServiceStatus = useCallback(async (status: string, tranCd: string) => {
        try {
            const payload = { reqTranCd: tranCd, IsStatus: status };
            const config = {};

            const result = await apiRequest("POST", urls.editTicketIntageServiceStatus, payload, config)
            if (result.STATUS === "0") {
                toastNotify(result.MESSAGE, "success");

                setServicesData((prevData: any) =>
                    prevData.map((service: any) =>
                        service.TranCode === tranCd
                            ? { ...service, Status: status }
                            : service
                    )
                );
                getTicketIntageServiceCount()
            } else {
                toastNotify(result.MESSAGE, "error");
            }
        } catch (error: any) {

        }
    }, [setServicesData]);


    // {/* SERVICE DETAIL DELETE API */ }
    // const deleteServices = async () => {
    //     try {
    //         setIsDeleteLoader(true);
    //         const result = await deleteRecord("TICKET_INTAGE_SERVICE_DELETE", servicesDtlData);

    //         if (result.STATUS === '0') {
    //             toastNotify(result.MESSAGE, 'success');
    //             getServiceData();
    //             getTicketIntageServiceCount()
    //             handleDeleteConfirmationMdl()
    //         } else {
    //             toastNotify(result.MESSAGE, 'error');
    //         }
    //     } catch (error: any) {
    //     } finally {
    //         setIsDeleteLoader(false);
    //     }
    // };

    // useMemo(() => {
    //     getServiceData();
    //     getTicketIntageServiceCount()
    // }, []);




    return (
        <>

            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={Settings2}
                    title={'Manage ODR Integration'}
                    description={'Manage third-party ODR integrations and API Configurations'}
                    button={<div className='ms-auto'>
                        <Button variant='primary' className='btn-sm ms-auto' onClick={() => { handleShowApiCreateMdl() }} ><PlusCircle size={14} className='me-1' /> Create Service</Button>

                    </div>}
                />
            </Suspense>


            {/* <Row className='mb-3'>
                <Col md={4} lg={4}>
                    <MonitoringCards title="Total Integrations" value={!isLoader ? servicesDataCount?.totalService : <BiLoader className='icon-loader text-lg' />} percent="50%" icon={LuPlug} />
                </Col>

                <Col md={4} lg={4}>
                    <MonitoringCards title="Active Integrations" value={!isLoader ? servicesDataCount?.activeService : <BiLoader className='icon-loader text-lg' />} percent="50%" icon={LuPower} />
                </Col>

                <Col md={4} lg={4}>
                    <MonitoringCards title="In-Active Integrations" value={!isLoader ? servicesDataCount?.inActiveService : <BiLoader className='icon-loader text-lg' />} percent="50%" icon={LuPowerOff} />
                </Col>

                <Col md={3} lg={3}>
                    <MonitoringCards title="Total Categories" value="0" percent="50%" icon={LuSettings2} />
                </Col>
            </Row> */}
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
                                                    categoryFlag="Y"  // for showing category and subcategory for integ service
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
                        </>
                    )}
                </Row >
            </div>

            {/* Service Create Modal */}
            {isShowApiCreateMdl && (
                <IntegratedServiceMdl
                    show={isShowApiCreateMdl}
                    handleClose={handleShowApiCreateMdl}
                    servicesDtlData={servicesDtlData}
                    getServiceData={getServiceData}
                    getTicketIntageServiceCount={getTicketIntageServiceCount}
                    getServiceDtl={getServiceDtl}
                />
            )}

            {/* <DeleteMdl
                isShow={isDeleteConfirmation}
                setIsShow={setIsDeleteConfirmation}
                deleteMethod={deleteServices}
                deleteLoader={isDeleteLoader}
            /> */}
        </>

    )
}

export default IntergratedService
