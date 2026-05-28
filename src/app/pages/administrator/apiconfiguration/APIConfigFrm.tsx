import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Col, Offcanvas, Row } from 'react-bootstrap';
import { CheckCircle2, CircleX, Copy, CopyIcon, KeySquare, Loader, LoaderCircle } from 'lucide-react';
import * as urls from "../../../utils/url";
import { SweetAlerts } from '../../../utils/sweetAlert';
import { apiRequest } from '../../../utils/apiRequest';
import toastNotify from '../../../utils/tostNotify';
import TextArea from '../../../components/ui/textArea/TextArea';
// import APIStep from '../../../components/apiconfigurations/APIStep';
import { KeywordType } from '../../../types/administrator';
import Textfield from '../../../components/ui/TextField/TextInput';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import APIStep from '../../../components/apiconfigurations/APIStep';
import { extractKeywordsFromTemplate } from '../../../utils/common';

// const APIStep = lazy(() => import("../../../components/apiconfigurations/APIStep").then(({ default: APIStep }) => ({ default: APIStep })));

interface APIConfigFrmProps {
    show: boolean;
    handleClose: (data?: any) => void;
    servicesDtlData: any;
    isEdit: boolean
    getServiceData: () => void;
}

type ResponseKeywordItem = {
    rawKey: string;
    replaceKey: string;
};


const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service Name is required"),
    description: Yup.string().required("Service Description is required"),
    apiType: Yup.string().required("API Type is required"),
    steps: Yup.array().of(
        Yup.object().shape({
            apiUrl: Yup.string().required("API Path is required"),
            StepName: Yup.string().required("Step Name is required"),
            contentType: Yup.string().required("Content Type is required"),
            responseType: Yup.string().required("Response Type is required"),
            reqType: Yup.string().required("Request Type is required"),
            reqPayload: Yup.string().required("Request Payload is required"),
            respPayload: Yup.string().required("Response Payload is required"),
            authType: Yup.string().required("Authentication Type is required"),
            username: Yup.string().when("authType", { is: "Basic", then: (schema) => schema.required("Username is required"), otherwise: (schema) => schema.notRequired() }),
            password: Yup.string().when("authType", { is: "Basic", then: (schema) => schema.required("Password is required"), otherwise: (schema) => schema.notRequired(), }),
            authValue: Yup.string().when("authType", { is: "Bearer", then: (schema) => schema.required("Token is required"), otherwise: (schema) => schema.notRequired(), }),
            successData: Yup.array().of(Yup.object().shape({
                key: Yup.string().required("Key is required"),
                internalVal: Yup.string().required("Internal Value is required"),
                value: Yup.mixed().test("required-value", "Value is required", function (val) { if (Array.isArray(val)) return val.length > 0; return val !== undefined && val !== null && val !== "" }),
            })),
            failedData: Yup.array().of(Yup.object().shape({
                key: Yup.string().required("Key is required"),
                internalVal: Yup.string().required("Internal Value is required"),
                value: Yup.mixed().test("required-value", "Value is required", function (val) { if (Array.isArray(val)) return val.length > 0; return val !== undefined && val !== null && val !== "" }),
            })),
        })
    ),
});

const APIConfigFrm: React.FC<APIConfigFrmProps> = ({ show, handleClose, servicesDtlData, isEdit, getServiceData }) => {

    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [apiTypeData, setApiTypeData] = useState<string[]>([]);
    const [keywordGroups, setKeywordGroups] = useState<any[]>([]);
    const [keywordData, setKeywordData] = useState<{ [key: number]: any[] }>({});
    const [isKeywordLoader, setIsKeywordLoader] = useState<boolean>(false);
    const [loadingGroups, setLoadingGroups] = useState<{ [key: number]: boolean }>({});

    const initialValues = {
        serviceName: servicesDtlData?.serviceNm || "",
        description: servicesDtlData?.serviceDesc || "",
        tranCode: servicesDtlData?.tranCode || "",
        checkSumKey: servicesDtlData?.checksumKey || "",
        apiType: servicesDtlData?.serviceType || "",
        apiTypeLbl: servicesDtlData?.serviceType || "",
        IsStatus: servicesDtlData?.status || true,

        steps: servicesDtlData?.steps
            ? servicesDtlData.steps.map((step: any, index: number) => {
                return {
                    execOrder: step?.execOrder || 0,
                    id: index + 1,
                    fieldType: step?.apiType,
                    existFlag: step?.existFlag || "N",
                    deleteFlag: step?.deleteFlag || "N",
                    StepName: step?.stepNm || "",
                    apiUrl: step?.apiUrl || "",
                    srCode: step?.stepCode || "",
                    serviceCode: step?.srCd || "",
                    reqType: step?.reqType || "",
                    contentType: step?.reqContentType || "",
                    responseType: step?.responseContentType || "",
                    authType: step?.apiAuthType || "",
                    username: step?.authUserNm || "",
                    password: step?.authUserPass || "",
                    authValue: step?.authValue || "",
                    reqPayload: step?.reqPayload || "",
                    respPayload: step?.responseBody || "",
                    apiResponseFlag: "Y",
                    isFinalStep: step?.finalStepStatus || "N",
                    // Ticket Status Tab
                    ResponseKeywordMappingData: step.responseKeywordMappingData && step.responseKeywordMappingData.length > 0
                        ? step?.responseKeywordMappingData.map((h: any, id: number) => ({
                            DataType: h?.dataType || "STRING",
                            RespKeyword: h?.respKeyword || "",
                            MapKeyword: h?.mapKeyword || "",
                            ExistFlag: h?.existFlag || "N",
                            DeleteFlag: h?.deleteFlag || "N",
                            LineCd: h?.lineCd || "",
                            id: id + 1
                        }))
                        : [{
                            DataType: "STRING",
                            RespKeyword: "",
                            MapKeyword: "",
                            ExistFlag: "N",
                            DeleteFlag: "N",
                            LineCd: "",
                            id: 1
                        }],
                    successData: (step.successData && step.successData.length > 0)
                        ? step.successData.map((s: any, id: number) => ({
                            key: s?.respKey || "",
                            type: s?.dataType || "INTEGER",
                            typeLbl: s?.dataType || "INTEGER",
                            value: s?.respValue || "",
                            checkFlag: s?.flag || "S",
                            checkFlagLbl: "Success",
                            internalVal: s?.mapValue || "",
                            existFlag: s?.existFlag || "N",
                            deleteFlag: s?.deleteFlag || "N",
                            lineCd: s?.lineCd || "",
                            flag: "S",
                            id: id + 1,
                        }))
                        : [{
                            key: "",
                            type: "INTEGER",
                            value: '',
                            checkFlag: "S",
                            existFlag: "N",
                            internalVal: "",
                            deleteFlag: "N",
                            lineCd: "",
                            flag: "S",
                            id: 1,
                        }],
                    failedData:
                        step.failedData && step.failedData.length > 0
                            ? step.failedData.map((f: any, id: number) => ({
                                key: f?.respKey || "",
                                type: f?.dataType || "INTEGER",
                                typeLbl: f?.dataType || "INTEGER",
                                value: f?.respValue || "",
                                checkFlag: f?.flag || "F",
                                internalVal: f?.mapValue || "",
                                checkFlagLbl: "Failed",
                                existFlag: f?.existFlag || "N",
                                deleteFlag: f?.deleteFlag || "N",
                                lineCd: f?.lineCd || "",
                                flag: "F",
                                id: id + 1
                            }))
                            : [{
                                key: "",
                                type: "",
                                value: '',
                                checkFlag: "F",
                                existFlag: "N",
                                internalVal: "",
                                deleteFlag: "N",
                                lineCd: "",
                                flag: "F",
                                id: 1,
                            }],
                    headerData: step.headerData && step.headerData.length > 0
                        ? step?.headerData.map((h: any, id: number) => ({
                            key: h?.headerkey || "",
                            value: h?.headerValue || "",
                            srCode: h?.tranCd || "",
                            // existFlag: h?.ExistFlag || "N",
                            // lineCd: h?.LineCd || "",
                            deleteFlag: h?.deleteFlag || "N",
                            id: id + 1
                        })) : [],
                };
            })
            : [
                {
                    id: 1,
                    apiUrl: "",
                    StepName: "",
                    autoInitateStatus: "N",
                    autoInitatePeriod: "",
                    breakScheduler: "",
                    reqType: "",
                    contentType: "",
                    responseType: "",
                    authType: "BASIC",
                    authTypeLbl: "BASIC",
                    username: "",
                    password: "",
                    authValue: "",
                    reqPayload: "",
                    isFinalStep: "N",
                    existFlag: "N",
                    apiResponseFlag: "Y",
                    deleteFlag: "N",
                    successData: [{
                        key: "",
                        type: "INTEGER",
                        typeLbl: "INTEGER",
                        value: '',
                        checkFlag: "S",
                        checkFlagLbl: "Success",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "S",
                        id: 1,
                    }],
                    ResponseKeywordMappingData: [
                        {
                            DataType: "",
                            Keyword: "",
                            Value: "",
                            DisplayValue: "",
                            existFlag: "N",
                            lineCd: "",
                            deleteFlag: "N",
                        }
                    ],
                    failedData: [{
                        key: "",
                        type: "INTEGER",
                        typeLbl: "INTEGER",
                        value: '',
                        internalVal: "",
                        checkFlag: "F",
                        checkFlagLbl: "Failed",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "F",
                        id: 1,
                    }],
                    headerData: [],
                },
            ],
    };

    const getAPITypeCombo = useCallback(async () => {
        try {
            const payload = {};
            const config = {};
            await apiRequest("POST", urls.getAPITypeCombo, payload, config).then((result) => {
                if (result.success && result.status === "200") {
                    setApiTypeData(result.response);
                } else {
                    setApiTypeData([]);
                    toastNotify(result.Message, 'error');
                }
            })
        } catch (error: any) {
            if (error.status !== 403) {
                // await exceptionLog(error, "Get API type combo", "N");
            }
        }
    }, [])

    // FUNCTION TO HANDLE ODR SERVICE CREATE API CALL
    const addServiceData = async (val: any,) => {

        try {
            setIsLoader(true);
            const payload = {
                serviceName: val?.serviceName || "",
                serviceDesc: val?.description || "",
                serviceStatus: true,
                checksumKey: val?.checkSumKey || "",
                serviceType: val?.apiType,
                serviceIcon: "Shield",
                // Only send configured/meaningful steps
                steps: val?.steps
                    ? val?.steps?.map((step: any, index: number) => {
                        return {
                            execOrder: step?.execOrder || 1,
                            apiUrl: step?.apiUrl || "",
                            stepNm: step?.StepName || "",
                            reqType: step?.reqType || "",
                            reqContentType: step?.contentType || "",
                            responseContentType: step?.responseType || "",
                            authValue: step?.authValue || "",
                            authType: step?.authType || "",
                            reqPayload: step?.reqPayload || "",
                            responseBody: step?.respPayload || "",
                            apiRespCheck: "Y",
                            finalStepStatus: step?.isFinalStep || "N",
                            apiType: step?.fieldType || "",
                            authUserNm: step?.username || "",
                            authUserPass: step?.password || "",

                            // Only send non-empty success data
                            successData: (step.successData && step.successData.length > 0)
                                ? step.successData
                                    .filter((s: any) => s?.key?.trim() || s?.value?.trim() || s?.existFlag === "Y")
                                    .map((s: any) => ({
                                        dataType: s?.type || "",
                                        respKey: s?.key || "",
                                        respVal: s?.value || "",
                                        mapVal: s?.internalVal || "",
                                        flag: "S",
                                    }))
                                : [],

                            // Only send non-empty failed data
                            failedData: (step.failedData && step.failedData.length > 0)
                                ? step.failedData
                                    .filter((f: any) => f?.key?.trim() || f?.value?.trim() || f?.existFlag === "Y")
                                    .map((f: any) => ({
                                        dataType: f?.type || "",
                                        respKey: f?.key || "",
                                        mapVal: f?.internalVal || "",
                                        respVal: f?.value || "",
                                        flag: "F",
                                    }))
                                : [],

                            // Only send non-empty header data
                            headerData: (step.headerData && step.headerData.length > 0)
                                ? step.headerData
                                    .filter((h: any) => h?.key?.trim() || h?.value?.trim() || h?.existFlag === "Y")
                                    .map((h: any) => ({
                                        headerKey: h?.key || "",
                                        value: h?.value || "",
                                    }))
                                : [],

                            // Only send non-empty status map data
                            responseKeywordMappingData: (step.ResponseKeywordMappingData && step.ResponseKeywordMappingData.length > 0)
                                ? step.ResponseKeywordMappingData
                                    .filter((h: any) =>
                                        h?.Keyword?.trim() ||
                                        h?.Value?.trim() ||
                                        h?.DisplayValue?.trim() ||
                                        h?.ExistFlag === "Y"
                                    )
                                    .map((h: any) => ({
                                        dataType: h?.DataType || "",
                                        keyword: h?.Keyword || "",
                                        value: h?.Value || "",
                                        displayValue: h?.DisplayValue || "",
                                        existFlag: h?.ExistFlag || "N",
                                        lineCd: h?.LineCd || "",
                                        deleteFlag: h?.DeleteFlag || "N",
                                    }))
                                : [],
                        };
                    }) : []
            };

            const config = {};
            await apiRequest("POST", urls.addApiService, payload, config)
                .then((result) => {
                    if (result.status === '200' && result.success) {
                        getServiceData();
                        handleClose();
                    } else {
                        SweetAlerts("Error", result.message, 'error');
                    }
                })
                .catch((error) => {
                    SweetAlerts(error, "error");
                });
        } catch (error: any) {
            if (error.status !== 403) {
            }
        } finally {
            setIsLoader(false);
        }
    };

    // FUNCTION TO HANDLE ODR SERVICE EDIT API CALL
    const editServiceData = async (val: typeof initialValues) => {
        try {
            setIsLoader(true);
            const payload = {
                serviceNm: val?.serviceName || "",
                description: val?.description || "",
                reqTranCd: val?.tranCode || "",
                checksumKey: val?.checkSumKey || "",
                serviceType: val?.apiType,
                profileImg: "",
                isStatus: val?.IsStatus || true,
                steps: val?.steps
                    ? val.steps.map((step: any) => {
                        return {
                            execOrder: step?.execOrder || 1,
                            existFlag: step?.existFlag || "N",
                            deleteFlag: step?.deleteFlag || "N",
                            stepSrCd: step?.srCode || "",
                            apiUrl: step?.apiUrl || "",
                            reqType: step?.reqType || "",
                            contentType: step?.contentType || "",
                            authValue: step?.authValue || "",
                            authType: step?.authType || "",
                            reqPayload: step?.reqPayload || "",
                            response: step?.respPayload || "",
                            responseFormet: step?.responseType || "",
                            apiResponseCheck: "Y",
                            stepName: step?.StepName || "",
                            username: step?.username || "",
                            password: step?.password || "",
                            reqTranCd: step?.serviceCode || "",
                            finalStepStatus: step?.isFinalStep || "N",
                            maskedData: Object.keys(step?.maskedData || {})
                                .filter(key => step.maskedData[key].Key) // Only include items that have a Key
                                .map((key) => ({
                                    keyFrom: step.maskedData[key].KeyFrom || "",
                                    key: step.maskedData[key].Key || key,
                                    status: step.maskedData[key]?.Status || "N",
                                    displayMask: step.maskedData[key]?.DisplayMask || "N",
                                    dataStoreFlag: step.maskedData[key]?.DataStoreFlag || "Y",
                                    deleteFlag: step.maskedData[key]?.deleteflag || "N",
                                    existFlag: step.maskedData[key]?.ExistFlag || "N",
                                    lineCd: step.maskedData[key]?.LineCd || "",
                                })),
                            successData:
                                step.successData && step.successData.length > 0
                                    ? step.successData.map((s: any) => ({
                                        existFlag: s?.existFlag || "Y",
                                        deleteFlag: s?.deleteFlag || "N",
                                        lineCd: s?.lineCd || "",
                                        mapVal: s?.internalVal || "",
                                        respKey: s?.key || "",
                                        dataType: s?.type || "",
                                        flag: "S",
                                        respVal: s?.value || "",
                                    }))
                                    : [],
                            failedData:
                                step.failedData && step.failedData.length > 0
                                    ? step.failedData.map((f: any) => ({
                                        dataType: f?.type || "",
                                        respKey: f?.key || "",
                                        respVal: f?.value || "",
                                        flag: "F",
                                        mapVal: f?.internalVal || "",
                                        existFlag: f?.existFlag || "Y",
                                        deleteFlag: f?.deleteFlag || "N",
                                        lineCd: f?.lineCd || "",
                                    }))
                                    : [],
                            headerData: step.headerData && step.headerData.length > 0
                                ? step?.headerData.map((h: any) => ({
                                    // ExistFlag: h?.existFlag || "Y",
                                    deleteFlag: h?.deleteFlag || "N",
                                    // LineCd: h?.lineCd || "",
                                    headerKey: h?.key || "",
                                    value: h?.value || "",
                                    reqTranCd: h?.srCode || "",
                                }))
                                : [],
                            responseKeywordMappingData: (step.ResponseKeywordMappingData && step.ResponseKeywordMappingData.length > 0)
                                ? step?.ResponseKeywordMappingData.map((h: any, index: number) => ({
                                    existFlag: h?.ExistFlag || "N",
                                    deleteFlag: h?.DeleteFlag || "N",
                                    lineCd: h?.LineCd || "",
                                    dataType: h?.DataType || "",
                                    keyword: h?.Keyword || "",
                                    value: h?.Value || "",
                                    displayValue: h?.DisplayValue || "",
                                }))
                                : [],
                        };
                    }) : [],
            };
            const config = {};
            await apiRequest("PUT", urls.editApiService, payload, config)
                .then((result) => {
                    if (result.status === '200' && result.success) {
                        handleClose();
                        getServiceData();
                    } else {
                        SweetAlerts("Error", result.message, 'error');
                    }
                })
                .catch((error) => {
                    toastNotify(error, "error");
                });
        } catch (error: any) {
            if (error.status !== 403) {
                // await exceptionLog(error, "Edit Service", "N");
            }
        }
        finally {
            setIsLoader(false);
        }
    };

    const getAPIGroups = async (SubType?: string) => {
        try {
            setIsKeywordLoader(true);
            const payload = {
                type: "API",
                subType: SubType,
            };
            const config = {};
            const result = await apiRequest("POST", urls.getKeywordGroupList, payload, config);
            if (result.status === '200' && result.success) {
                setKeywordGroups(result.response);
            } else {
                setKeywordGroups([]);
            }
        } catch (error: any) {
            if (error.status !== 403) {
                console.error('Error fetching groups:', error);
            }
        } finally {
            setIsKeywordLoader(false);
        }
    };

    // Updated getAPIGroupKeyword function - loads keywords for specific group
    const getAPIGroupKeyword = async (keywordCode: number) => {
        // Don't reload if already loaded
        if (keywordData[keywordCode]) {
            return;
        }

        try {
            setLoadingGroups(prev => ({ ...prev, [keywordCode]: true }));
            const payload = {
                keywordCode: keywordCode,
            };
            const config = {};
            const result = await apiRequest("POST", urls.getKeywordList, payload, config);
            if (result.status === '200' && result.success) {
                setKeywordData(prev => ({
                    ...prev,
                    [keywordCode]: result.response
                }));
            } else {
                setKeywordData(prev => ({
                    ...prev,
                    [keywordCode]: []
                }));
            }
        } catch (error: any) {
            if (error.status !== 403) {
                console.error('Error fetching keywords:', error);
            }
        } finally {
            setLoadingGroups(prev => ({ ...prev, [keywordCode]: false }));
        }
    };

    const handleAccordionToggle = (keywordCode: number) => {
        getAPIGroupKeyword(keywordCode);
    };

    // useEffect(() => {
    //     getAPITypeCombo();
    //     if (servicesDtlData) {
    //         getAPIGroups(servicesDtlData.serviceType)
    //     }
    // }, [getAPITypeCombo]);

    // Transform API data to options format
    const apiTypeOptions = apiTypeData.map((item: string) => ({
        label: item,
        value: item
    }));


    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} backdrop="static" placement='end' style={{ width: "1300px" }} keyboard={false} size='xl' >
                <Offcanvas.Header className="pb-2 border-bottom" closeButton>
                    <div>
                        <h5 className="mb-0 mt-2"><strong>{!servicesDtlData ? "New " : "Edit "} <span className="text-primary">Service</span></strong></h5>
                        <small className="text-slate-500 text-xs">Configure Service</small>
                    </div>
                </Offcanvas.Header>


                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={(values) => {

                        if (values.steps?.isFinalStep === "N") {
                            SweetAlerts("Please select final step", 'error')
                            return
                        }

                        if (isEdit) {
                            editServiceData(values)
                        } else {
                            addServiceData(values);
                        }
                    }}
                >

                    {({ values, setFieldValue, setFieldTouched, handleChange, handleBlur }) => {

                        return (
                            <Form>
                                <Offcanvas.Body>
                                    <Row>
                                        <Col md={8} lg={8} style={{ maxHeight: "calc(100vh - 108px)", overflowY: "auto" }}>
                                            <Row className="d-flex">
                                                <Col md={12} className="mb-3 pt-2">
                                                    <Textfield
                                                        label="Service Name"
                                                        placeholder='Enter Service Name'
                                                        name="serviceName"
                                                        type="text"
                                                        required
                                                        maxLength={100}
                                                        minLength={5}
                                                        tabIndex={getNextTabIndex()}
                                                        value={values.serviceName}
                                                        onChange={(e) => {
                                                            setFieldValue("serviceName", e.target.value)
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage name="serviceName" className="ErrorMessage" component="div" />
                                                </Col>

                                                <Col md={12}>
                                                    <TextArea
                                                        label="Service Description"
                                                        name="description"
                                                        placeholder='Enter Service Description'
                                                        required
                                                        minLength={2}
                                                        maxLength={400}
                                                        tabIndex={getNextTabIndex()}
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage name="description" className="ErrorMessage" component="div" />
                                                </Col>

                                                <Col md={6} className="my-3">
                                                    <SelectField
                                                        name="reqType"
                                                        label="Service Type"
                                                        placeholder="Service Type"
                                                        required
                                                        isDisabled={servicesDtlData !== null}
                                                        options={apiTypeOptions}
                                                        value={values.apiType ? apiTypeOptions.find(opt => opt.value === values.apiType) || null : null}
                                                        tabIndex={getNextTabIndex()}
                                                        onChange={(option: any) => {
                                                            if (option && !Array.isArray(option)) {
                                                                setFieldValue("apiType", option.value);
                                                                setFieldValue("apiTypeLbl", option.label);
                                                            }
                                                            getAPIGroups(option.value);
                                                        }}

                                                        onBlur={() => setFieldTouched("apiType", true)}
                                                    />
                                                    <ErrorMessage name="apiType" component="div" className="ErrorMessage" />
                                                </Col>

                                                <Col md={6} className="my-3">
                                                    <Textfield
                                                        label="CheckSum Key"
                                                        placeholder='Enter CheckSum Key'
                                                        name="checkSumKey"
                                                        type="password"
                                                        maxLength={100}
                                                        minLength={5}
                                                        tabIndex={getNextTabIndex()}
                                                        value={values.checkSumKey}
                                                        onChange={(e) => {
                                                            setFieldValue("checkSumKey", e.target.value)
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage name="checkSumKey" className="ErrorMessage" component="div" />
                                                </Col>

                                            </Row>

                                            <Suspense>
                                                <APIStep
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    setFieldTouched={setFieldTouched}
                                                    getNextTabIndex={getNextTabIndex}
                                                    servicesDtlData={servicesDtlData}
                                                />
                                            </Suspense>
                                        </Col>

                                        <Col md={4} lg={4} style={{ height: "calc(100vh - 98px)", display: "flex", flexDirection: "column" }}>

                                            {isKeywordLoader ? (
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: "440px" }}>
                                                    <Loader />
                                                </div>
                                            ) : (
                                                <Accordion defaultActiveKey='0' flush className="rounded-4 overflow-scroll border mb-3">
                                                    <Accordion.Item eventKey="0" className="border-0">
                                                        <Accordion.Header className="sticky-top">
                                                            <div className="d-flex align-items-center">
                                                                <div className="p-2 bg-primary-50 icon-wrapper rounded me-2" style={{ height: "35px", width: "35px" }}>
                                                                    <KeySquare size={18}  className='text-primary' />
                                                                </div>
                                                                <div>
                                                                    <h6 className="m-0 fw-bold text-dark text-sm">Service Variables</h6>
                                                                    <small className="text-muted text-xs"> Configure how response keys are handled </small>
                                                                </div>
                                                            </div>
                                                        </Accordion.Header>

                                                        <Accordion.Body className="p-2">
                                                            {/* Nested Accordion for Groups */}
                                                            <Accordion defaultActiveKey='0' flush className="overflow-scroll mb-1">
                                                                {keywordGroups.map((group, index) => (
                                                                    <Accordion.Item eventKey={group?.keywordCode?.toString()} key={group.keywordCode} className="border" >
                                                                        <Accordion.Header onClick={() => handleAccordionToggle(group.keywordCode)} className="rounded" >
                                                                            <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                                                                                <div>
                                                                                    <div className="fw-semibold text-primary text-sm"> {group.groupName}</div>
                                                                                    <div className="text-muted text-xs"> Click to view keywords </div>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Header>

                                                                        <Accordion.Body className="p-2">
                                                                            {loadingGroups[group.keywordCode] ? (
                                                                                <div className="d-flex justify-content-center py-3">
                                                                                    <Loader />
                                                                                </div>
                                                                            ) : keywordData[group.keywordCode] && keywordData[group.keywordCode].length > 0 ? (
                                                                                keywordData[group.keywordCode].map((keyword: KeywordType, i: number) => (
                                                                                    <div
                                                                                        key={i}
                                                                                        className="d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2 variable-item cursor-pointer"
                                                                                    >
                                                                                        <div className="flex-grow-1">
                                                                                            <div className="fw-semibold text-dark text-sm">
                                                                                                {keyword.key}
                                                                                            </div>
                                                                                            <div className="text-muted text-xs">
                                                                                                {keyword.description}
                                                                                            </div>
                                                                                        </div>

                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-light btn-sm rounded-circle flex-shrink-0"
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                const textToCopy = keyword.key;
                                                                                                navigator.clipboard.writeText(textToCopy);
                                                                                                toastNotify(`${textToCopy} copied!`, "success");
                                                                                            }}
                                                                                            title="Copy key"
                                                                                        >
                                                                                            <Copy className="text-primary" size={14} />
                                                                                        </button>
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <div className="text-center text-muted py-3 text-sm">
                                                                                    No keywords available
                                                                                </div>
                                                                            )}
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                ))}

                                                                {keywordGroups.length === 0 && (
                                                                    <div className="text-center text-sm text-muted py-4">
                                                                        No groups available
                                                                    </div>
                                                                )}
                                                            </Accordion>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            )}

                                            <div className="mb-3 border rounded-4 flex-grow-1 overflow-scroll" style={{ overflowY: "auto", minHeight: "60px" }}>
                                                {isKeywordLoader ? (
                                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                                                        <Loader />
                                                    </div>
                                                ) : (
                                                    <Accordion defaultActiveKey="step-0" flush>
                                                        {values.steps.filter((s: any) => s.deleteFlag !== "Y").map((step: any, idx: number) => {
                                                            let keywords: ResponseKeywordItem[] = [];
                                                            try {
                                                                keywords = extractKeywordsFromTemplate(step?.respPayload, idx + 1);
                                                            } catch (e) {
                                                                keywords = [];
                                                            }

                                                            return (
                                                                <Accordion.Item eventKey={`step-${idx}`} key={step.id || idx} className="border-0" >
                                                                    <Accordion.Header className="sticky-top bg-white">
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 bg-primary-50 icon-wrapper rounded me-2" style={{ height: "35px", width: "35px" }}>
                                                                                <KeySquare size={18}  className='text-primary'/>
                                                                            </div>
                                                                            <div>
                                                                                <h6 className="m-0 fw-bold text-dark text-sm">Step {idx + 1} Keywords</h6>
                                                                                <small className="text-muted text-xs">
                                                                                    {step.StepName || 'Unnamed Step'}
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </Accordion.Header>
                                                                    <Accordion.Body className="p-2 bg-light-subtle">
                                                                        {keywords.length > 0 ? (
                                                                            keywords.map((keyword, kIdx) => (
                                                                                <div key={kIdx} className="d-flex justify-content-between align-items-center border bg-white rounded px-2 py-2 mb-2 variable-item">
                                                                                    <div className='overflow-hidden ps-2'>
                                                                                        <div className="fw-semibold text-primary text-xs">{keyword.rawKey}</div>
                                                                                        <div className="text-muted text-truncate text-xs">
                                                                                            {keyword.replaceKey}
                                                                                        </div>
                                                                                    </div>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-light btn-sm rounded-circle ms-2"
                                                                                        onClick={() => {
                                                                                            navigator.clipboard.writeText(keyword.replaceKey);
                                                                                            toastNotify(`Copied ${keyword.rawKey}`, "success");
                                                                                        }}
                                                                                    >
                                                                                        <CopyIcon className="text-primary" size={12} />
                                                                                    </button>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <div className="text-center p-3 text-muted text-xs">
                                                                                No valid JSON found in Response Body
                                                                            </div>
                                                                        )}
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            );
                                                        })}
                                                    </Accordion>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="p-3 border-top bg-white w-100">
                                                {/* {userData?.permissions?.SAVE_APP_CONF_API === "Y" && ( */}
                                                <div className="d-flex justify-content-end gap-2">
                                                    <Button variant="light" type='button'  onClick={handleClose}>
                                                        <CircleX size={16} className='me-1' /> Close
                                                    </Button>
                                                    <Button variant="primary" type='submit'  disabled={isLoader}>
                                                        {isLoader ? <span><LoaderCircle size={16} className='icon-loader' /> Loading...</span> : <span className="text-white"> <CheckCircle2 size={16} className='me-2' />{isEdit ? "Update" : "Submit"}</span>}
                                                    </Button>
                                                </div>
                                                {/* )} */}
                                            </div>
                                        </Col>
                                    </Row>
                                </Offcanvas.Body >
                            </Form>
                        )
                    }}
                </Formik>
            </Offcanvas >
        </div >
    )
}

export default APIConfigFrm
