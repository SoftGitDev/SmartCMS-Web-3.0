/************************************************************
// Component     : Create New Service Offcanvas
// Purpose       : In this we Create a new service for organization.
// Created by    : Harish
// Created Date  : 01-09-2025
// Description   : In this we Create a new service for organization.

************************************************************/

import { Accordion, Button, Col, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import * as urls from "../../../services/axios/url";
import { Suspense, useMemo, useState } from "react";
import { ArrowBigDown, Camera, CheckCheck, CheckCircle, Code, Copy, EyeOff, FileEdit, FileLock2, Info, Loader2, PlusCircle, Proportions, Replace, ReplyAll, Server, Settings, ShieldCheck, TicketCheck, Timer, TimerOffIcon, Variable, XCircle } from "lucide-react";
import toastNotify from "../../../services/notification/tostNotify";
import { apiRequest } from "../../../services/api/apiRequest";
import Textfield from "../../../common/components/ui/TextField/TextInput";
import TextArea from "../../../common/components/ui/textArea/TextArea";
import { converToBase64 } from "../../../services/storage/common";
import SelectField from "../../../common/components/ui/SelectBox/SelectField";
import ServiceStep from "./ServiceStep";
import Checkbox from "../../../common/components/ui/checkBox/Checkbox";
import CategoryMappedMdl from "../../../common/components/common/CategoryMappedMdl";


type IntegratedServiceMdlProps = {
    show: boolean;
    handleClose: () => void;
    servicesDtlData: any;
    tranCode?: any;
    getServiceData?: any;
    getTicketIntageServiceCount: any;
    getServiceDtl: any;
};

type ResponseKeywordItem = {
    rawKey: string;
    replaceKey: string;
};

const Instruction2 = [
    {
        icon: <FileEdit size={18} />,
        color: "text-primary",
        title: "Naming",
        apiNm: 'Integration name should be unique, descriptive name for the API (e.g., "Customer Verification API").'
    },
    {
        icon: <Replace size={18} />,
        color: "text-info",
        title: "Headers",
        apiNm: 'To replace a header with data from a previous API response, provide the corresponding keyword retrieved from that response.'
    },
    {
        icon: <Server size={18} />,
        color: "text-dark",
        title: "Configuration",
        apiNm: 'Response Config contains the information about the response of services it will API Response Data-Type for status and code.'
    },
    {
        icon: <Code size={18} />,
        color: "text-secondary",
        title: "Messaging",
        apiNm: 'Response Message is the type where we configure the service message, we can send message to bank team and to customer.'
    },
    {
        icon: <Variable size={18} />,
        color: "text-success",
        title: "Dynamic Columns Keyword",
        apiNm: 'To use dynamic column values, first assign a keyword in Dynamic Column Edit and then use that same keyword inside ODR Integration.'
    },
    {
        icon: <Proportions size={18} />,
        color: "text-danger",
        title: "Mandatory Config",
        apiNm: 'API Success and Failed configuration for API Verification is mandatory for checking the configured API success and failed case.'
    },
    {
        icon: <Timer size={18} />,
        color: "text-primary",
        title: "Automation",
        apiNm: 'To auto-push tickets, configure Auto Initiate Status and Auto Initiate Time in admin settings.'
    },
    {
        icon: <Settings size={18} />,
        color: "text-dark",
        title: "Security",
        apiNm: 'Admins can configure Response Keyword to show API response data to users and can also mask sensitive details (e.g., XXXXXXXX785).'
    },
];

const ticketVariableKeys = [
    { key: "{{TicketSubject}}", label: "Ticket subject" },
    { key: "{{TicketPriority}}", label: "Ticket priority" },
    { key: "{{TicketDescription}}", label: "Ticket description" },
    { key: "{{ClassificationCode}}", label: "Classification code" },
    { key: "{{ContactPersonName}}", label: "Contact person name" },
    { key: "{{ContactPersonMobile}}", label: "Contact person mobile" },
    { key: "{{ContactPersonEmail}}", label: "Contact person email" },
    { key: "{{TranDt}}", label: "Transaction Date" },
    { key: "{{TranAmt}}", label: "Transaction Amount" },
    { key: "{{TranRefNo}}", label: "Transaction Reference Number" },
];

const SelectionButton = ({ label, icon, active, onClick, color }: any) => (
    <div
        onClick={onClick}
        className={`d-flex align-items-center gap-2 px-2 py-0 rounded cursor-pointer border transition-all ${active ? `bg-${color}-subtle border-${color} text-${color}` : 'bg-white border text-muted'}`}
        style={{ cursor: 'pointer', transition: 'all 0.2s', minWidth: '80px', justifyContent: 'center' }}>
        <span className="text-lg">{icon}</span>
        <span className="text-xs fw-semibold">{label}</span>
    </div>
);

function getResponseDataSchema() {
    return Yup.object().shape({
        type: Yup.string().required("Datatype is required"),
        key: Yup.string().required("Key is required"),
        value: Yup.mixed().test("required-value", "Value is required",
            function (val) {
                if (Array.isArray(val)) return val.length > 0;
                return val !== undefined && val !== null && val !== "";
            }
        ),
    });
}

const stepValidationShape = Yup.object().shape({
    StepName: Yup.string().required("Step name is required"),
    apiUrl: Yup.string().required("API Path is required"),
    contentType: Yup.string().required("Request Content Type is required"),
    responseType: Yup.string().required("Response Content Type is required"),
    reqType: Yup.string().required("Request Method is required"),
    // DefaultPushMsg: Yup.string().required("Create Ticket Message is required"),
    reqPayload: Yup.string().when("reqType", {
        is: (val: any) => val && val === "G",
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required("Request Payload is required"),
    }),
    authType: Yup.string().required("Authentication Type is required"),
    username: Yup.string().when("authType", {
        is: "B",
        then: (schema) => schema.required("Username is required"),
        otherwise: (schema) => schema.notRequired(),
    }),
    password: Yup.string().when("authType", {
        is: "B",
        then: (schema) => schema.required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
    }),
    authValue: Yup.string().when("authType", {
        is: "J",
        then: (schema) => schema.required("Token is required"),
        otherwise: (schema) => schema.notRequired(),
    }),
    successData: Yup.array().of(getResponseDataSchema()),
    failedData: Yup.array().of(getResponseDataSchema()),
});

const IntegratedServiceMdl: React.FC<IntegratedServiceMdlProps> = ({ show, handleClose, servicesDtlData, getServiceData, getTicketIntageServiceCount, getServiceDtl }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isDynamicColumnLoader, setIsDynamicColumnLoader] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('PUSH');
    const [statusData, setStatusData] = useState<any[]>([]);
    const [mappedServiceData, setMappedServiceData] = useState<any>(null);
    const [isDynamicColumns, setIsDynamicColumns] = useState<any>();
    const [getCategoryDropdownData, setGetCategoryDropdownData] = useState<any[]>([]);
    const [getSubCategoryDropdownData, setGetSubCategoryDropdownData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // used for mapped category wanrning modal

    let currentTabIndex = 1; const getNextTabIndex = () => currentTabIndex++;
    const currentStepType = activeTab || "";

    const initialValues = {
        serviceName: servicesDtlData?.ServiceName || "",
        description: servicesDtlData?.Description || "",
        base64: servicesDtlData?.Base64 || "",
        alert: servicesDtlData?.alert || "",
        tranCode: servicesDtlData?.tranCode || "",
        IsStatus: servicesDtlData?.Status || "Y",
        SubCategoryCd: servicesDtlData?.SubCategoryCd || "",
        CategoryCd: servicesDtlData?.CategoryCd || "",
        subCategoryLbl: servicesDtlData?.SubCategoryCd && getSubCategoryDropdownData?.length > 0 ? getSubCategoryDropdownData.find((item: any) => item.TranCode === servicesDtlData.SubCategoryCd)?.SubCategoryName || "Sub-Category" : "",
        categoryLbl: servicesDtlData?.CategoryCd && getCategoryDropdownData?.length > 0 ? getCategoryDropdownData.find((item: any) => item.TranCode === servicesDtlData.CategoryCd)?.CategoryName || "Select Category" : "",

        steps: servicesDtlData?.Steps
            ? servicesDtlData.Steps.map((step: any, index: number) => {
                return {
                    // StepType: step?.StepType || "PL",
                    id: index + 1,
                    autoInitateStatus: step?.AutoInitiateStatus || "N",
                    autoInitatePeriod: step?.AutoInitiatePeriod || "",
                    breakScheduler: step?.BreakSchedule || "",
                    fieldType: step?.ApiType,
                    existFlag: step?.ExistFlag || "N",
                    deleteFlag: step?.DeleteFlag || "N",
                    StepName: step?.StepName || "",
                    apiUrl: step?.ApiUrl || "",
                    srCode: step?.SrCd || "",
                    serviceCode: step?.SrCd || "",
                    reqType: step?.ReqType || "",
                    contentType: step?.ContentType || "",
                    responseType: step?.ResponseFormet || "",
                    authType: step?.AuthType || "",
                    username: step?.Username || "",
                    isShowUsername: false,
                    password: step?.Password || "",
                    authValue: step?.AuthValue || "",
                    isShowAuthValue: false,
                    isShowUserNm: false,
                    isShowPassword: false,
                    reqPayload: step?.ReqPayload || "",
                    respPayload: step?.Response || "",
                    apiResponseFlag: "Y",
                    isFinalStep: step?.FinalStepStatus || "N",
                    // This is used for Response Keyswords for Step 1
                    maskedData:
                        step.MaskedData && step.MaskedData.length > 0
                            ? step.MaskedData.reduce((acc: any, m: any) => {
                                acc[m.Key] = {
                                    DataStoreFlag: m.DataStoreFlag || "Y",
                                    DisplayMask: m.DisplayMask || "N",
                                    Key: m.Key,
                                    KeyFrom: m.KeyFrom || m.KeyForm || "",
                                    Status: m.Status || "N",
                                    LineCd: m.LineCd || "",
                                    ExistFlag: m.ExistFlag || "",
                                    DeleteFlag: m.DeleteFlag || "",
                                };
                                return acc;
                            }, {})
                            : {},
                    // Ticket Status Tab
                    StatusMapData: step.StatusMapData && step.StatusMapData.length > 0
                        ? step?.StatusMapData.map((h: any, id: number) => ({
                            DataType: h?.DataType || "",
                            Keyword: h?.Keyword || "",
                            Value: h?.Value || "",
                            DisplayValue: h?.DisplayValue || "",
                            ExistFlag: h?.ExistFlag || "N",
                            DeleteFlag: h?.DeleteFlag || "N",
                            LineCd: h?.LineCd || "",
                            id: id + 1
                        }))
                        : [{
                            DataType: "",
                            Keyword: "",
                            Value: "",
                            DisplayValue: "",
                            ExistFlag: "N",
                            id: 1
                        }],
                    successData: (step.SuccessData && step.SuccessData.length > 0)
                        ? step.SuccessData.map((s: any, id: number) => ({
                            key: s?.RespKey || "",
                            type: s?.DataType || "",
                            typeLbl: (s?.DataType === "B" && "Boolean") || (s?.DataType === "S" && "String") || (s?.DataType === "I" && "Integer") || "",
                            value: s?.RespValue || "",
                            respMsgType: s?.CheckFlag || "C",
                            BankMsgStatus: s?.BankMsgStatus || "N",
                            BankMessage: s?.BankMsg || "",
                            CustomerMessageStatus: s?.CustomerMsgStatus || "N",
                            CustomerMessage: s?.CustomerMsg || "",
                            customeMessage: s?.UserMessage || "",
                            checkFlag: s?.flag || "S",
                            checkFlagLbl: "Success",
                            existFlag: s?.ExistFlag || "N",
                            deleteFlag: s?.DeleteFlag || "N",
                            lineCd: s?.LineCd || "",
                            flag: "S",
                            id: id + 1,
                        }))
                        : [{
                            key: "",
                            type: "",
                            value: '',
                            customeMessage: "",
                            checkFlag: "S",
                            existFlag: "N",
                            deleteFlag: "N",
                            lineCd: "",
                            flag: "S",
                            id: 1,
                        }],
                    failedData:
                        step.FailedData && step.FailedData.length > 0
                            ? step.FailedData.map((f: any, id: number) => ({
                                key: f?.RespKey || "",
                                type: f?.DataType || "",
                                typeLbl: (f?.DataType === "B" && "Boolean") || (f?.DataType === "S" && "String") || (f?.DataType === "I" && "Integer") || "",
                                value: f?.RespValue || "",
                                respMsgType: f?.CheckFlag || "C",
                                customeMessage: f?.UserMessage || "",
                                checkFlag: f?.flag || "F",
                                BankMsgStatus: f?.BankMsgStatus || "N",
                                BankMessage: f?.BankMsg || "",
                                checkFlagLbl: "Failed",
                                existFlag: f?.ExistFlag || "N",
                                deleteFlag: f?.DeleteFlag || "N",
                                lineCd: f?.LineCd || "",
                                flag: "F",
                                id: id + 1
                            }))
                            : [{
                                key: "",
                                type: "",
                                value: '',
                                customeMessage: "",
                                checkFlag: "F",
                                existFlag: "N",
                                deleteFlag: "N",
                                lineCd: "",
                                flag: "F",
                                id: 1,
                            }],
                    headerData: step.HeaderData && step.HeaderData.length > 0
                        ? step?.HeaderData.map((h: any, id: number) => ({
                            key: h?.HeaderKey || "",
                            value: h?.Value || "",
                            srCode: h?.SrCode || "",
                            existFlag: h?.ExistFlag || "N",
                            lineCd: h?.LineCd || "",
                            showHeaderFields: false,
                            deleteFlag: h?.deleteFlag || "N",
                            id: id + 1

                        })) : [],
                };
            })
            : [
                {
                    id: 1,
                    fieldType: "PUSH",
                    apiUrl: "",
                    StepName: "",
                    autoInitateStatus: "N",
                    autoInitatePeriod: "",
                    breakScheduler: "",
                    reqType: "",
                    contentType: "",
                    responseType: "",
                    authType: "B",
                    authTypeLbl: "Basic",
                    username: "",
                    password: "",
                    authValue: "",
                    reqPayload: "",
                    isFinalStep: "N",
                    isShowUserNm: false,
                    isShowPassword: false,
                    isShowAuthValue: false,
                    existFlag: "N",
                    apiResponseFlag: "Y",
                    maskedData: {
                        Key: "",
                        KeyFrom: "",
                        Status: "N",
                        LineCd: "",
                        ExistFlag: "N",
                        DeleteFlag: "N",
                    },
                    deleteFlag: "N",
                    successData: [{
                        key: "",
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "C",
                        respMsgTypeLbl: "Custom Message",
                        checkFlag: "S",
                        checkFlagLbl: "Success",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "S",
                        id: 1,
                    }],
                    StatusMapData: [
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
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "C",
                        respMsgTypeLbl: "Custom Message",
                        checkFlag: "F",
                        checkFlagLbl: "Failed",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "F",
                        id: 1,
                    }],
                    headerData: [],
                },
                {
                    id: 2,
                    fieldType: "PULL",
                    autoInitateStatus: "N",
                    autoInitatePeriod: "",
                    breakScheduler: "",
                    apiUrl: "",
                    StepName: "",
                    reqType: "",
                    contentType: "",
                    responseType: "",
                    authType: "B",
                    authTypeLbl: "Basic",
                    username: "",
                    password: "",
                    authValue: "",
                    reqPayload: "",
                    isFinalStep: "N",
                    existFlag: "N",
                    apiResponseFlag: "Y",
                    deleteFlag: "N",
                    maskedData: {},
                    successData: [{
                        key: "",
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "C",
                        respMsgTypeLbl: "Custom Message",
                        checkFlag: "S",
                        checkFlagLbl: "Success",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "S",
                        id: 1,
                    }],
                    failedData: [{
                        key: "",
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "C",
                        respMsgTypeLbl: "Custom Message",
                        checkFlag: "F",
                        checkFlagLbl: "Failed",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "F",
                        id: 1,
                    }],
                    StatusMapData: [
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
                    headerData: [],
                },
                {
                    id: 3,
                    fieldType: "REPL",
                    apiUrl: "",
                    StepName: "",
                    reqType: "",
                    contentType: "",
                    responseType: "",
                    authType: "B",
                    authTypeLbl: "Basic",
                    username: "",
                    password: "",
                    authValue: "",
                    reqPayload: "",
                    existFlag: "N",
                    isFinalStep: "N",
                    apiResponseFlag: "Y",
                    deleteFlag: "N",
                    maskedData: {},
                    successData: [{
                        key: "",
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "C",
                        respMsgTypeLbl: "Custom Message",
                        checkFlag: "S",
                        checkFlagLbl: "Success",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "S",
                        id: 1,
                    }],
                    failedData: [{
                        key: "",
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "C",
                        respMsgTypeLbl: "Custom Message",
                        checkFlag: "F",
                        checkFlagLbl: "Failed",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "F",
                        id: 1,
                    }],
                    StatusMapData: [
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
                    headerData: [],
                },
            ],
    };

    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            serviceName: Yup.string().required("Service Name is required"),
            description: Yup.string().required("Service Description is required"),
            CategoryCd: Yup.string().required("Category is a required"),

            steps: Yup.array().of(
                Yup.lazy((item: any) => {
                    const itemType = item.fieldType;
                    if (itemType === activeTab) {
                        return stepValidationShape;
                    }
                    return Yup.object().notRequired();
                })
            ),
        });
    }, [activeTab]);

    // FUNCTION USED TO FETCH THE CATEGORIES
    // const fetchCategory = async () => {
    //     try {
    //         const data = await categoryCombo();
    //         setGetCategoryDropdownData(data);
    //     } catch (error: any) {

    //     }
    // };

    // FUNCTION USED TO FETCH THE SUBCATEGORIES
    // const fetchSubCategory = async (categoryCd: string) => {
    //     try {
    //         const data = await subCategoryCombo({ Categorydata: categoryCd });
    //         setGetSubCategoryDropdownData(data);
    //     } catch (error: any) {

    //     }
    // };

    // FUNCTION TO HANDLE ODR SERVICE CREATE API CALL
    const addServiceData = async (val: any, resetForm: any) => {

        const currentTabSteps = val.steps?.filter((step: any) => step?.fieldType === activeTab);
        const hasFinalStep = currentTabSteps?.some((step: any) => step?.isFinalStep === "Y");

        if (!hasFinalStep || currentTabSteps?.length === 0) {
            toastNotify(`Please configure and mark one step as Final Step in the "${activeTab === 'PUSH' ? 'Create Ticket' : activeTab === 'PULL' ? 'Ticket Status' : 'Ticket Reply'}" tab`, 'error');
            return;
        }

        const finalStepCount = currentTabSteps.filter((step: any) => step?.isFinalStep === "Y").length;

        if (finalStepCount > 1) {
            toastNotify(`Only one step can be marked as Final Step in the "${activeTab}" tab`, 'error');
            return;
        }

        // Helper function to check if a step is configured
        // const isStepConfigured = (step: any) => {
        //     return (
        //         step.apiUrl?.trim() ||
        //         step.StepName?.trim() ||
        //         step.reqPayload?.trim() ||
        //         step.respPayload?.trim() ||
        //         step.successData?.some((s: any) => s.key?.trim() || s.value?.trim()) ||
        //         step.failedData?.some((f: any) => f.key?.trim() || f.value?.trim()) ||
        //         step.headerData?.length > 0 ||
        //         step.existFlag === "Y" // Include existing steps
        //     );
        // };

        // Filter only configured steps or existing steps
        // const meaningfulSteps = val.steps.filter((step: any) => isStepConfigured(step));

        // if (meaningfulSteps.length === 0) {
        //     toastNotify("Please configure at least one step properly", "error");
        //     return;
        // }

        try {
            setIsLoader(true);
            const payload = {
                ServiceNm: val?.serviceName || "",
                Description: val?.description || "",
                ProfileImg: val?.base64 || "",
                IsStatus: "Y",
                SubCategoryCd: val?.SubCategoryCd || "0",
                CategoryCd: val?.CategoryCd || "0",

                // Only send configured/meaningful steps
                Steps: val?.steps
                    ? val.steps.map((step: any, index: number) => {
                        return {
                            AutoInitiateStatus: step?.autoInitateStatus || "N",
                            AutoInitiatePeriod: step?.autoInitatePeriod || "",
                            BreakScheduler: step?.breakScheduler || "",
                            ApiUrl: step?.apiUrl || "",
                            StepName: step?.StepName || "",
                            ReqType: step?.reqType || "",
                            ContentType: step?.contentType || "",
                            AuthValue: step?.authValue || "",
                            AuthType: step?.authType || "",
                            ReqPayLoad: step?.reqPayload || "",
                            Response: step?.respPayload || "",
                            ResponseFormet: step?.responseType || "",
                            ApiResponseCheck: "Y",
                            TicketReplyType: step?.ticketReplyType || "",
                            TicketReplyApi: step?.ticketReplyApi || "N",
                            TicketTempCd: step?.ticketTmpValue || 0,
                            FinalStepStatus: step?.isFinalStep || "N",
                            ApiType: step?.fieldType || "",
                            Username: step?.username || "",
                            Password: step?.password || "",

                            // Only send non-empty masked data
                            MaskedData: Object.keys(step?.maskedData || {})
                                .filter(key => {
                                    const maskedItem = step.maskedData[key];
                                    return maskedItem?.Key?.trim() || maskedItem?.KeyFrom?.trim() || maskedItem?.ExistFlag === "Y";
                                })
                                .map((key) => ({
                                    KeyFrom: step.maskedData[key].KeyFrom,
                                    Key: step.maskedData[key].Key,
                                    Status: step.maskedData[key]?.Status || "N",
                                    DisplayMask: step.maskedData[key]?.DisplayMask || "N",
                                    DataStoreFlag: step.maskedData[key]?.DataStoreFlag || "Y"
                                })),

                            // Only send non-empty success data
                            SuccessData: (step.successData && step.successData.length > 0)
                                ? step.successData
                                    .filter((s: any) => s?.key?.trim() || s?.value?.trim() || s?.existFlag === "Y")
                                    .map((s: any) => ({
                                        DataType: s?.type || "",
                                        RespKey: s?.key || "",
                                        RespVal: s?.value || "",
                                        UserMessage: s?.customeMessage || "",
                                        BankMsgStatus: s?.BankMsgStatus || "",
                                        BankMessage: s?.BankMessage || "",
                                        CustomerMessageStatus: s?.CustomerMessageStatus || "N",
                                        CustomerMsg: s?.CustomerMessage || "",
                                        Flag: "S",
                                    }))
                                : [],

                            // Only send non-empty failed data
                            FailedData: (step.failedData && step.failedData.length > 0)
                                ? step.failedData
                                    .filter((f: any) => f?.key?.trim() || f?.value?.trim() || f?.existFlag === "Y")
                                    .map((f: any) => ({
                                        DataType: f?.type || "",
                                        RespKey: f?.key || "",
                                        RespVal: f?.value || "",
                                        UserMessage: f?.customeMessage || "",
                                        BankMsgStatus: f?.BankMsgStatus || "",
                                        BankMessage: f?.BankMessage || "",
                                        CustomerMessageStatus: f?.CustomerMessageStatus || "N",
                                        CustomerMsg: f?.CustomerMessage || "",
                                        Flag: "F",
                                    }))
                                : [],

                            // Only send non-empty header data
                            HeaderData: (step.headerData && step.headerData.length > 0)
                                ? step.headerData
                                    .filter((h: any) => h?.key?.trim() || h?.value?.trim() || h?.existFlag === "Y")
                                    .map((h: any) => ({
                                        HeaderKey: h?.key || "",
                                        Value: h?.value || "",
                                    }))
                                : [],

                            // Only send non-empty status map data
                            StatusMapData: (step.StatusMapData && step.StatusMapData.length > 0)
                                ? step.StatusMapData
                                    .filter((h: any) =>
                                        h?.Keyword?.trim() ||
                                        h?.Value?.trim() ||
                                        h?.DisplayValue?.trim() ||
                                        h?.ExistFlag === "Y"
                                    )
                                    .map((h: any) => ({
                                        DataType: h?.DataType || "",
                                        Keyword: h?.Keyword || "",
                                        Value: h?.Value || "",
                                        DisplayValue: h?.DisplayValue || "",
                                        ExistFlag: h?.ExistFlag || "N",
                                        LineCd: h?.LineCd || "",
                                        DeleteFlag: h?.DeleteFlag || "N",
                                    }))
                                : [],
                        };
                    }) : []
            };

            const config = {};
            const result = await apiRequest("POST", urls.addTicketIntageService, payload, config)

            if (result.STATUS === '0') {
                toastNotify(result.MESSAGE, 'success');
                getServiceData();
                getTicketIntageServiceCount();
                handleClose();
            } else {
                toastNotify(result.MESSAGE, 'error');
            }


        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    };

    // FUNCTION TO HANDLE ODR SERVICE EDIT API CALL
    const editServiceData = async (val: typeof initialValues, resetForm: any) => {

        const currentTabSteps = val.steps?.filter((step: any) => step?.fieldType === activeTab);
        const hasFinalStep = currentTabSteps?.some((step: any) => step?.isFinalStep === "Y");

        if (!hasFinalStep || currentTabSteps?.length === 0) {
            toastNotify(`Please configure and mark one step as Final Step in the "${activeTab === 'PUSH' ? 'Create Ticket' : activeTab === 'PULL' ? 'Ticket Status' : 'Ticket Reply'}" tab`, 'error');
            return;
        }

        const finalStepCount = currentTabSteps.filter((step: any) => step?.isFinalStep === "Y").length;

        if (finalStepCount > 1) {
            toastNotify(`Only one step can be marked as Final Step in the "${activeTab}" tab`, 'error');
            return;
        }

        try {
            setIsLoader(true);
            const payload = {
                ServiceNm: val?.serviceName || "",
                Description: val?.description || "",
                ProfileImg: val?.base64 || "",
                ReqTranCd: val?.tranCode || "",
                IsStatus: val?.IsStatus || "Y",
                subCategoryCd: val?.SubCategoryCd || "0",
                CategoryCd: val?.CategoryCd || "0",
                Steps: val?.steps
                    ? val.steps.map((step: any) => {
                        return {
                            ExistFlag: step?.existFlag || "N",
                            DeleteFlag: step?.deleteFlag || "N",
                            StepSrCd: step?.srCode || "",
                            ApiUrl: step?.apiUrl || "",
                            StepName: step?.StepName || "",
                            ReqType: step?.reqType || "",
                            ContentType: step?.contentType || "",
                            AuthValue: step?.authValue || "",
                            AuthType: step?.authType || "",
                            ReqPayLoad: step?.reqPayload || "",
                            Response: step?.respPayload || "",
                            ResponseFormet: step?.responseType || "",
                            ApiResponseCheck: "Y",
                            TicketReplyApi: step?.ticketReplyApi || "N",
                            TicketReplyType: step?.ticketReplyType || "",
                            TicketTempCd: step?.ticketTmpValue || "",
                            ApiType: step?.fieldType || "",
                            Username: step?.username || "",
                            Password: step?.password || "",
                            AutoInitiateStatus: step?.autoInitateStatus || "N",
                            AutoInitiatePeriod: step?.autoInitatePeriod || "",
                            BreakStatus: step?.breakScheduler || "",
                            ReqTranCd: step?.serviceCode || "",
                            DefaultPushMsg: step?.DefaultPushMsg || "",
                            DefaultFailedMsg: step?.DefaultFailedMsg || "",
                            CustMsgFlag: step?.CustMsgFlag || "N",
                            FinalStepStatus: step?.isFinalStep || "N",
                            CustMessage: step?.CustMessage || "",
                            MaskedData: Object.keys(step?.maskedData || {})
                                .filter(key => step.maskedData[key].Key) // Only include items that have a Key
                                .map((key) => ({
                                    KeyFrom: step.maskedData[key].KeyFrom || "",
                                    Key: step.maskedData[key].Key || key,
                                    Status: step.maskedData[key]?.Status || "N",
                                    DisplayMask: step.maskedData[key]?.DisplayMask || "N",
                                    DataStoreFlag: step.maskedData[key]?.DataStoreFlag || "Y",
                                    DeleteFlag: step.maskedData[key]?.deleteflag || "N",
                                    ExistFlag: step.maskedData[key]?.ExistFlag || "N",
                                    LineCd: step.maskedData[key]?.LineCd || "",
                                })),
                            SuccessData:
                                step.successData && step.successData.length > 0
                                    ? step.successData.map((s: any) => ({
                                        DataType: s?.type || "",
                                        RespKey: s?.key || "",
                                        RespVal: s?.value || "",
                                        UserMessage: s?.customeMessage || "",
                                        BankMsgStatus: s?.BankMsgStatus || "",
                                        BankMsg: s?.BankMessage || "",
                                        CustomerMsgStatus: s?.CustomerMessageStatus || "N",
                                        CustomerMsg: s?.CustomerMessage || "",
                                        Flag: "S",
                                        ExistFlag: s?.existFlag || "Y",
                                        DeleteFlag: s?.deleteFlag || "N",
                                        LineCd: s?.lineCd || "",
                                    }))
                                    : [{
                                        key: "",
                                        type: "",
                                        value: "",
                                        customeMessage: "",
                                        checkFlag: "",
                                        existFlag: "N",
                                        deleteFlag: "N",
                                        lineCd: "",
                                        flag: "S"
                                    }],
                            FailedData:
                                step.failedData && step.failedData.length > 0
                                    ? step.failedData.map((f: any) => ({
                                        DataType: f?.type || "",
                                        RespKey: f?.key || "",
                                        RespVal: f?.value || "",
                                        UserMessage: f?.customeMessage || "",
                                        BankMsgStatus: f?.BankMsgStatus || "",
                                        BankMsg: f?.BankMessage || "",
                                        CustomerMsgStatus: f?.CustomerMessageStatus || "N",
                                        CustomerMsg: f?.CustomerMessage || "",
                                        Flag: "F",
                                        ExistFlag: f?.existFlag || "Y",
                                        DeleteFlag: f?.deleteFlag || "N",
                                        LineCd: f?.lineCd || "",
                                    }))
                                    : [{
                                        key: "",
                                        type: "",
                                        value: "",
                                        customeMessage: "",
                                        checkFlag: "",
                                        existFlag: "N",
                                        deleteFlag: "N",
                                        lineCd: "",
                                        flag: "F"
                                    }],
                            ExceptionData:
                                step.exceptionData && step.exceptionData.length > 0
                                    ? step.exceptionData.map((e: any) => ({
                                        ExistFlag: e?.existFlag || "Y",
                                        DeleteFlag: e?.deleteFlag || "N",
                                        LineCd: e?.lineCd || "",
                                        CheckFlag: e?.respMsgType || "",
                                        DataType: e?.type || "",
                                        RespKey: e?.key || "",
                                        RespVal: e?.value.toString() || "",
                                        RespType: e?.checkFlag || "",
                                        CustMsg: e?.customeMessage || "",
                                        Flag: "E",

                                    }))
                                    : [{
                                        key: "",
                                        type: "",
                                        value: "",
                                        customeMessage: "",
                                        checkFlag: "",
                                        existFlag: "Y",
                                        deleteFlag: "N",
                                        lineCd: "",
                                        flag: "E"
                                    }],

                            HeaderData: step.headerData && step.headerData.length > 0
                                ? step?.headerData.map((h: any) => ({
                                    ExistFlag: h?.existFlag || "Y",
                                    DeleteFlag: h?.deleteFlag || "N",
                                    LineCd: h?.lineCd || "",
                                    HeaderKey: h?.key || "",
                                    Value: h?.value || "",
                                    srCode: h?.srCode || "",
                                }))
                                : [],
                            StatusMapData: (step.StatusMapData && step.StatusMapData.length > 0)
                                ? step?.StatusMapData.map((h: any, index: number) => ({
                                    DataType: h?.DataType || "",
                                    Keyword: h?.Keyword || "",
                                    Value: h?.Value || "",
                                    DisplayValue: h?.DisplayValue || "",
                                    ExistFlag: h?.ExistFlag || "N",
                                    LineCd: h?.LineCd || "",
                                    DeleteFlag: h?.DeleteFlag || "N",
                                }))
                                : [],
                        };
                    }) : [],
            };
            const config = {};
            const result = await apiRequest("POST", urls.editTicketIntageService, payload, config)

            if (result.STATUS === '0') {
                toastNotify(result.MESSAGE, 'success');
                handleClose();
                getServiceData();
            } else {
                toastNotify(result.MESSAGE, 'error');
            }
        } catch (error: any) {

        }
        finally {
            setIsLoader(false);
        }
    };

    // USED FOR FETCHING TICKET STATUS COMBO
    const fetchStatus = async () => {
        try {
            const payload = {};
            const config = {};
            const result = await apiRequest('POST', urls.getTicketStatusCombo, payload, config)
            if (result.STATUS === '0') {
                const response = result.RESPONSE;
                setStatusData(response);
            }
        } catch (error: any) {

        }
    };

    // THIS API IS FOR GET DYNAMIC COLUMN ON CATEGORY AND SUB-CATEGORY. APPEND NEW COLUMN IN Ticket Variables
    const getDynamicColumnKeyword = async (categoryCode: string, subCategoryCode?: string,) => {
        try {
            setIsDynamicColumnLoader(true);
            const payload = {
                CategoryCode: categoryCode,
                SubCategoryCode: subCategoryCode,
            };
            const config = {};
            const result = await apiRequest("POST", urls.getDynamicColumnKeyword, payload, config)
            if (result.STATUS === '0') {
                setIsDynamicColumns(result.RESPONSE);
            } else {
                setIsDynamicColumns([]);
            }
        } catch (error: any) {

        } finally {
            setIsDynamicColumnLoader(false);
        }
    };

    const allTicketVariables = useMemo(() => {
        return [
            ...ticketVariableKeys,
            ...(isDynamicColumns || []).map((item: any) => ({
                key: `{{${item.ColumnKeyword}}}`,
                label: item.LabelName
            }))
        ];
    }, [isDynamicColumns]);


    // THIS API IS FOR CHECKING THAT IS ANY SERVICE IS MAPPED TO THIS CATEGORY AND SUB-CATEGORY
    const getMapTicketIntegeService = async (categoryCode: string, subCategoryCode?: string,) => {
        try {
            const payload = {
                CategoryCode: categoryCode,
                SubCategoryCode: subCategoryCode,
            };
            const config = {};
            const result = await apiRequest("POST", urls.getMapTicketIntageService, payload, config)
            if (result.STATUS === '0') {
                if (result?.DATA?.length > 0) {
                    setIsModalOpen(true);
                    setMappedServiceData(result?.DATA[0])
                    // toastNotify("The selected category and subcategory are already associated with a different service. Please choose a unique category combination", "error")
                }
            } else {
                result.MESSAGE !== "No data found" && toastNotify(result.MESSAGE, 'error');
            }

        } catch (error: any) {

        }
    }

    // HELPER FUNCTION FOR FLATTERN THE RESPONSE JSON 
    function extractResponseKeywords(payload: any): ResponseKeywordItem[] {
        if (!payload || typeof payload !== "object") return [];

        const result: ResponseKeywordItem[] = [];

        function walk(
            value: any,
            replacePath: string[] = [],
            leafKey: string = ""
        ) {
            // Handle array
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    walk(item, [...replacePath, String(index + 1)], `${leafKey}_${index + 1}`);
                });
                return;
            }

            // Handle object
            if (value !== null && typeof value === "object") {
                Object.keys(value).forEach(key => {
                    // Include the key in the path regardless of its name
                    walk(value[key], [...replacePath, key], key);
                });
                return;
            }

            // Handle primitive values (leaf nodes)
            if (replacePath.length > 0) {
                result.push({
                    rawKey: leafKey,
                    replaceKey: replacePath.join("_")
                });
            }
        }

        walk(payload);
        return result;
    }

    // useMemo(() => {
    //     fetchCategory();
    //     if (servicesDtlData) {
    //         fetchSubCategory(servicesDtlData?.CategoryCd)
    //     }
    // }, []);

    // useEffect(() => {
    //     fetchStatus();
    // }, []);

    return (
        <Offcanvas show={show} placement="end" onHide={handleClose} backdrop="static" keyboard={false} style={{ width: "1800px", }} fullscreen >
            <Offcanvas.Header className="pb-2 border-bottom" closeButton>
                <div>
                    <h5 className="mb-0 mt-2"><strong>{!servicesDtlData ? "New " : "Edit "} <span className="text-primary">ODR Integration</span></strong></h5>
                    <small className="text-slate-500 text-xs">Configure ODR Integration</small>
                </div>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }: any) => {

                        if (values.steps?.isFinalStep === "N") {
                            toastNotify("Please select final step", 'error')
                            return
                        }

                        if (servicesDtlData) {
                            editServiceData(values, resetForm)
                        } else {
                            addServiceData(values, resetForm);
                        }
                    }}
                    enableReinitialize
                >
                    {({ values, setFieldValue, setFieldTouched, handleChange, handleBlur, errors }) => {
                        console.log("values", values);
                        console.log("errors", errors);
                        return (
                            <>
                                <Form noValidate>
                                    {/* Service Information */}
                                    <Row className="mt-2">
                                        <Col xs={12} sm={12} md={6} lg={6} style={{ maxHeight: "calc(100vh - 116px)", overflowY: "auto" }}>
                                            <Row>
                                                <Row className="d-flex">
                                                    <Col md={9} lg={9}>
                                                        <Col md={12} className="mb-3 pt-2">
                                                            <Textfield
                                                                label="ODR Integration Name"
                                                                placeholder="Enter ODR Integration Name"
                                                                name="serviceName"
                                                                type="text"
                                                                maxLength={100}
                                                                minLength={5}
                                                                tabIndex={getNextTabIndex()}
                                                                value={values.serviceName}
                                                                onChange={(e) => {
                                                                    setFieldValue("serviceName", e.target.value)
                                                                }}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            <ErrorMessage name="serviceName" className="ErrorMessage" component="div" />
                                                        </Col>

                                                        <Col md={12}>
                                                            <TextArea
                                                                label="ODR Integration Description"
                                                                placeholder="Enter ODR Integration Description"
                                                                name="description"
                                                                minLength={2}
                                                                maxLength={400}
                                                                tabIndex={getNextTabIndex()}
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            <ErrorMessage name="description" className="ErrorMessage" component="div" />
                                                        </Col>
                                                    </Col>

                                                    <Col md={3} lg={3}>
                                                        <Col md={12} lg={12} className="mb-3">
                                                            <div className="d-flex justify-content-center">
                                                                <div className="userProfile">
                                                                    <div className="config-logo-upload">
                                                                        {values.base64 !== "" && (
                                                                            <div className="config-logo-priview">
                                                                                <img src={values.base64} alt="preview" className="imagePreview" />
                                                                            </div>
                                                                        )}
                                                                        <div className={`${values.base64 !== "" ? "config-logo-add-section" : "config-logo-edit"}`}>
                                                                            <input
                                                                                type="file"
                                                                                id="base64"
                                                                                accept=".png, .jpg, .jpeg"
                                                                                onChange={async (e: any) => {
                                                                                    const imageFile = e.target.files[0];
                                                                                    if (!imageFile) return;

                                                                                    const fileSize = (imageFile.size / 1048576).toFixed(2);
                                                                                    const maxImageSize = process.env.REACT_APP_PROFILE_IMAGE_SIZE || 2;

                                                                                    if (Number(fileSize) > Number(maxImageSize)) {
                                                                                        return toastNotify(`Image size must be less than ${maxImageSize} MB`, "error");
                                                                                    }
                                                                                    const base64Img: any = await converToBase64(imageFile);
                                                                                    setFieldValue("base64", base64Img);
                                                                                }}
                                                                            />
                                                                            <label htmlFor="base64" className="cursor-pointer" style={{ flexDirection: values.base64 ? "row" : "column" }}>
                                                                                <Camera style={{ fontSize: 20, color: "#fff", marginRight: 3 }} />
                                                                                <div className={`${values.base64 && "d-block"} text-sm text-white`}>
                                                                                    {values.base64 ? "Change Image" : "Add Image"}
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="text-center">
                                                                <label className={`form-label text-xs`}>ODR Integration Image</label>
                                                            </div>
                                                        </Col>
                                                    </Col>

                                                    <Col md={4} lg={4} className="mb-3 mt-2">
                                                        <SelectField
                                                            name="category"
                                                            label="category"
                                                            placeholder="Select Category"
                                                            tabIndex={getNextTabIndex()}
                                                            required
                                                            options={[{ value: "", label: "Select Category" }, ...getCategoryDropdownData?.map((items: any) => ({
                                                                value: items.TranCode, label: items.CategoryName
                                                            }))]}
                                                            value={values.CategoryCd !== "" && {
                                                                value: values.CategoryCd,
                                                                label: values.categoryLbl
                                                            }}
                                                            onChange={(e: any) => {
                                                                setFieldValue("CategoryCd", e?.value);
                                                                setFieldValue("categoryLbl", e?.label);
                                                                setFieldValue("SubCategoryCd", "");
                                                                setFieldValue("subCategoryLbl", "");
                                                                // fetchSubCategory(e?.value);
                                                                // Check categaory is alreary map with service
                                                                getMapTicketIntegeService(e?.value, "0");
                                                                // Check Dynamic columns
                                                                getDynamicColumnKeyword(e?.value, "0");
                                                            }}
                                                            onBlur={handleBlur}
                                                        />
                                                        <ErrorMessage name="CategoryCd" className='ErrorMessage' component="div" />
                                                    </Col>

                                                    {getSubCategoryDropdownData?.length > 0 && (
                                                        <Col md={5} lg={5} className="mb-3">
                                                            <SelectField
                                                                name="subCategory"
                                                                tabIndex={getNextTabIndex()}
                                                                options={[{ value: "", label: "Select Sub-Category" }, ...getSubCategoryDropdownData.map((items: any) => ({
                                                                    value: items.TranCode, label: items.SubCategoryName
                                                                }))]}
                                                                placeholder="Select Sub-Category"
                                                                value={values.SubCategoryCd !== "" && {
                                                                    value: values.SubCategoryCd,
                                                                    label: values.subCategoryLbl
                                                                }}
                                                                onChange={(e: any) => {
                                                                    setFieldValue("SubCategoryCd", e?.value);
                                                                    setFieldValue("subCategoryLbl", e?.label);
                                                                    // Check categaory is alreary map with service
                                                                    getMapTicketIntegeService(values.CategoryCd, e?.value);
                                                                    // Check Dynamic columns
                                                                    getDynamicColumnKeyword(values.CategoryCd, e?.value);
                                                                }}
                                                                onBlur={handleBlur}
                                                            />
                                                            <ErrorMessage name="subCategoryCd" className='ErrorMessage' component="div" />
                                                        </Col>
                                                    )}
                                                </Row>

                                                <Tabs defaultActiveKey={activeTab} id="admin-tab-section" className="custom-tab-bar " onSelect={(tab: any) => setActiveTab(tab)} >

                                                    <Tab eventKey="PUSH" title={<><PlusCircle size={16} className="mb-1 me-1" /> Create Ticket</>}>
                                                        {activeTab === 'PUSH' && (
                                                            <Suspense>
                                                                <ServiceStep
                                                                    values={values}  // PS USED FOR PUSH FIELD TYPE
                                                                    setFieldValue={setFieldValue}
                                                                    stepType="PUSH"
                                                                    handleChange={handleChange}
                                                                    handleBlur={handleBlur}
                                                                    setFieldTouched={setFieldTouched}
                                                                    // stepIndex={index}
                                                                    getNextTabIndex={getNextTabIndex}
                                                                    statusData={statusData}
                                                                    servicesDtlData={servicesDtlData}
                                                                    activeTab={activeTab}
                                                                />
                                                            </Suspense>
                                                        )}
                                                    </Tab>

                                                    <Tab eventKey="PULL" title={<><CheckCheck size={16} className="mb-1 me-1" /> Ticket Status</>}>
                                                        {activeTab === 'PULL' && (
                                                            <Suspense>
                                                                <ServiceStep
                                                                    values={values} // PL USED FOR PULL FIELD TYPE
                                                                    setFieldValue={setFieldValue}
                                                                    handleChange={handleChange}
                                                                    handleBlur={handleBlur}
                                                                    stepType="PULL"
                                                                    setFieldTouched={setFieldTouched}
                                                                    servicesDtlData={servicesDtlData}
                                                                    getNextTabIndex={getNextTabIndex}
                                                                    // stepIndex={index}
                                                                    statusData={statusData}
                                                                    activeTab={activeTab}
                                                                />
                                                            </Suspense>
                                                        )}
                                                    </Tab>

                                                    <Tab eventKey="REPL" title={<><ReplyAll size={16} className="mb-1 me-1" /> Ticket Reply</>}>
                                                        {activeTab === 'REPL' && (
                                                            <Suspense>
                                                                <ServiceStep
                                                                    values={values} // PL USED FOR PULL FIELD TYPE
                                                                    setFieldValue={setFieldValue}
                                                                    handleChange={handleChange}
                                                                    handleBlur={handleBlur}
                                                                    stepType="REPL"
                                                                    setFieldTouched={setFieldTouched}
                                                                    servicesDtlData={servicesDtlData}
                                                                    getNextTabIndex={getNextTabIndex}
                                                                    // stepIndex={index}
                                                                    statusData={statusData}
                                                                    activeTab={activeTab}
                                                                />
                                                            </Suspense>
                                                        )}
                                                    </Tab>
                                                </Tabs>
                                            </Row>
                                        </Col>

                                        {/* THIS SECTION IS FOR DATA SECURITY CONFIGURATION */}
                                        <Col xs={12} sm={12} md={3} lg={3} style={{ maxHeight: "calc(100vh - 116px)", overflowY: "auto" }}>

                                            <div className="mb-3 border rounded-4 overflow-auto" style={{ minHeight: "60px", maxHeight: "440px" }}>
                                                {/* <h6 className=" text-sm fw-semibold ps-1">Security Configuration for<span className="text-primary">{"  "}Request Payload Keys</span>{"  "}(Step {stepNumber})</h6> */}
                                                {isDynamicColumnLoader ? (
                                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "440px" }}>
                                                        <Loader2 />
                                                    </div>
                                                ) : (<Accordion defaultActiveKey='0' flush>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header className="sticky-top">
                                                            <div className="d-flex align-items-center">
                                                                <div className="p-2 bg-theme text-primary rounded me-2"> <TicketCheck size={20} /> </div>
                                                                <div>
                                                                    <h6 className="m-0 fw-bold text-dark">Ticket Variables</h6>
                                                                    <small className="text-muted">Configure how response keys are handled </small>
                                                                </div>
                                                            </div>
                                                        </Accordion.Header>

                                                        <Accordion.Body className="p-2">
                                                            {allTicketVariables.map((item, i) => (
                                                                <div key={i} className="d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2 variable-item cursor-pointer">
                                                                    <div>
                                                                        {/* BLUE TEXT */}
                                                                        <div className="fw-semibold text-primary text-sm">{item.key}</div>

                                                                        {/* GREY DESCRIPTION */}
                                                                        <div className="text-muted text-xs">{item.label}</div>
                                                                    </div>

                                                                    {/* COPY ICON */}
                                                                    <Col md={3} className=" my-1 d-flex justify-content-end gap-2 text-end">
                                                                        {/* <button type="button" className="btn btn-light btn-sm rounded-circle" onClick={() => { navigator.clipboard.writeText(item.key); toastNotify(`${item.key} copied!`, "success"); }} title="Copy key" ><BiPlus size={14} />
                                                                        </button> */}
                                                                        <button type="button" className="btn btn-light btn-sm rounded-circle" onClick={() => { navigator.clipboard.writeText(item.key); toastNotify(`${item.key} copied!`, "success"); }} title="Copy key" ><Copy className="text-primary" size={14} />
                                                                        </button>
                                                                    </Col>
                                                                </div>
                                                            ))}
                                                        </Accordion.Body>

                                                    </Accordion.Item>
                                                </Accordion>)
                                                }
                                            </div>


                                            {values.steps?.map((s: any, i: number) => ({ ...s, originalIndex: i })).filter((s: any) => s.deleteFlag !== "Y").map((step: any) => {
                                                const index = step.originalIndex;
                                                const parsedRespPayload = typeof step.respPayload === "string" ? (() => { try { return JSON.parse(step.respPayload); } catch { return {}; } })() : step.respPayload;
                                                const responseKeywords = extractResponseKeywords(parsedRespPayload);

                                                responseKeywords.forEach(({ rawKey }) => {
                                                    if (!step.maskedData?.[rawKey]) { setFieldValue(`steps.${index}.maskedData.${rawKey}`, { DataStoreFlag: "Y", Key: rawKey, KeyFrom: currentStepType, Status: "N", DeleteFlag: "N", DisplayMask: "N" }); }
                                                });

                                                const filteredSteps = values.steps.filter((s: any) => s.deleteFlag !== "Y" && s.fieldType === activeTab);
                                                const stepNumber = filteredSteps.findIndex((s: any) => s.id === step.id) + 1;

                                                return (
                                                    <>
                                                        {step.fieldType === currentStepType &&
                                                            <div className="p-2 mb-3 border rounded overflow-auto">
                                                                <Accordion defaultActiveKey={null} flush>
                                                                    <div className="overflow-auto" style={{ maxHeight: "75vh" }}>
                                                                        <Accordion.Item eventKey={String(index)} key={index}>
                                                                            <Accordion.Header className="sticky-top">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="p-2 bg-theme text-primary rounded me-2">
                                                                                        <ArrowBigDown size={20} />
                                                                                    </div>
                                                                                    <div>
                                                                                        <h6 className="m-0 fw-bold text-dark">Response Keyswords for Step {stepNumber}</h6>
                                                                                        <small className="text-slate-700">Use these keywords to display variables from the response.</small>
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Header>

                                                                            <Accordion.Body className="p-2">
                                                                                {responseKeywords.length > 0 ? (
                                                                                    responseKeywords.map(({ rawKey, replaceKey }, i) => {

                                                                                        const itemPath = `steps.${index}.maskedData.${rawKey}`;
                                                                                        const itemData = values.steps?.[index]?.maskedData?.[rawKey] || {};
                                                                                        const currentStatus = itemData.Status;

                                                                                        return (
                                                                                            <Accordion key={rawKey} defaultActiveKey={null}>
                                                                                                <Accordion.Item eventKey="0">
                                                                                                    <Accordion.Header>
                                                                                                        <div className="d-flex align-items-center justify-content-between w-100 pe-2">
                                                                                                            <div className="ps-2">
                                                                                                                <div className="fw-semibold text-dark"> <ShieldCheck className="me-1" /> {rawKey} </div>
                                                                                                                <div className="text-primary text-sm"> {"{{" + replaceKey + "}}"} </div>
                                                                                                            </div>

                                                                                                            <button type="button" className="btn btn-light btn-sm rounded-circle" title="Copy replaceable key"
                                                                                                                onClick={(e) => {
                                                                                                                    e.stopPropagation();
                                                                                                                    navigator.clipboard.writeText(`{{${replaceKey}}}`);
                                                                                                                    toastNotify("Replace key copied!", "success");
                                                                                                                }}>
                                                                                                                <Copy size={14} />
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </Accordion.Header>

                                                                                                    <Accordion.Body className="p-3">
                                                                                                        <Row className="align-items-center g-3">
                                                                                                            <Col xs={12}>
                                                                                                                <Checkbox
                                                                                                                    label="Do you want to Store this keyword in Database?"
                                                                                                                    id={`${itemPath}.DataStoreFlag`}
                                                                                                                    name={`${itemPath}.DataStoreFlag`}
                                                                                                                    checked={itemData.DataStoreFlag === "Y"}
                                                                                                                    onChange={(e: any) => setFieldValue(`${itemPath}.DataStoreFlag`, e.target.checked ? "Y" : "N")}
                                                                                                                />

                                                                                                                {itemData.DataStoreFlag === "Y" && (
                                                                                                                    <div className="d-flex gap-2 flex-wrap mt-2">
                                                                                                                        <SelectionButton
                                                                                                                            label="Plain Text"
                                                                                                                            icon={<XCircle size={15} />}
                                                                                                                            active={currentStatus === "N"}
                                                                                                                            color="primary"
                                                                                                                            onClick={() => {
                                                                                                                                setFieldValue(`${itemPath}.Key`, rawKey);
                                                                                                                                setFieldValue(`${itemPath}.KeyFrom`, currentStepType);
                                                                                                                                setFieldValue(`${itemPath}.Status`, "N");
                                                                                                                                setFieldValue(`${itemPath}.DeleteFlag`, "N");
                                                                                                                            }}
                                                                                                                        />
                                                                                                                        <SelectionButton
                                                                                                                            label="Encrypted"
                                                                                                                            icon={<FileLock2 size={15} />}
                                                                                                                            active={currentStatus === "S"}
                                                                                                                            color="success"
                                                                                                                            onClick={() => {
                                                                                                                                setFieldValue(`${itemPath}.Key`, rawKey);
                                                                                                                                setFieldValue(`${itemPath}.KeyFrom`, currentStepType);
                                                                                                                                setFieldValue(`${itemPath}.Status`, "S");
                                                                                                                                setFieldValue(`${itemPath}.DeleteFlag`, "N");
                                                                                                                            }}
                                                                                                                        />
                                                                                                                        <SelectionButton
                                                                                                                            label="Masked"
                                                                                                                            icon={<EyeOff size={15} />}
                                                                                                                            active={currentStatus === "H"}
                                                                                                                            color="danger"
                                                                                                                            onClick={() => {
                                                                                                                                setFieldValue(`${itemPath}.Key`, rawKey);
                                                                                                                                setFieldValue(`${itemPath}.KeyFrom`, currentStepType);
                                                                                                                                setFieldValue(`${itemPath}.Status`, "H");
                                                                                                                                setFieldValue(`${itemPath}.DeleteFlag`, "N");
                                                                                                                            }}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                )}
                                                                                                                <div className="flex-grow-1 ps-0 mt-2">
                                                                                                                    <Checkbox
                                                                                                                        label="Display Masked Data (Hide Sensitive Info)"
                                                                                                                        name={itemPath + ".DisplayMask"}
                                                                                                                        id={itemPath + ".DisplayMask"}
                                                                                                                        checked={itemData.DisplayMask === "Y"}
                                                                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                                                            setFieldValue(`${itemPath}.DisplayMask`, e.target.checked ? "Y" : "N");
                                                                                                                        }}
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </Col>
                                                                                                        </Row>
                                                                                                    </Accordion.Body>
                                                                                                </Accordion.Item>
                                                                                            </Accordion>
                                                                                        );
                                                                                    })
                                                                                ) : (
                                                                                    <div className="d-grid justify-content-center align-content-center pt-3">
                                                                                        <img src="/images/svg/55024593_9264820.svg" alt="no data found" style={{ width: 80 }} />
                                                                                        <h1 className="text-sm text-center">No Keywords found</h1>
                                                                                    </div>
                                                                                )}

                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </div>
                                                                </Accordion>
                                                            </div>
                                                        }
                                                    </>

                                                );
                                            })}



                                        </Col>

                                        {/* THIS SECTION IS FOR INSTRUCTIONS */}
                                        <Col xs={12} sm={12} md={3} lg={3}>
                                            <div
                                                className="bg-light h-100 border-start shadow-sm"
                                                style={{ position: "sticky", top: 0, height: "100vh", display: 'flex', flexDirection: 'column' }}
                                            >
                                                {/* Header */}
                                                <div className="p-3 border-bottom bg-white">
                                                    <h6 className="m-0 fw-bold text-dark d-flex align-items-center gap-2">
                                                        <Info className="text-primary" />
                                                        Configuration Guide
                                                    </h6>
                                                    <small className="text-muted text-xs">Follow these steps to configure your service.</small>
                                                </div>

                                                {/* Scrollable List */}
                                                <div
                                                    className="p-3 custom-scrollbar"
                                                    style={{ overflowY: "auto", flexGrow: 1, maxHeight: "calc(100vh - 260px)" }}
                                                >
                                                    <div className="d-flex flex-column gap-3">
                                                        {Instruction2.map((ins, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="bg-white p-3 rounded shadow-sm border-start border-4 position-relative"
                                                                style={{ borderColor: 'var(--bs-gray-300)' }} // Or dynamic color based on type
                                                            >
                                                                <div className="d-flex align-items-start gap-3">
                                                                    <div className={`mt-1 ${ins.color}`}>
                                                                        {ins.icon}
                                                                    </div>
                                                                    <div>
                                                                        {ins.title && <div className={`text-xs fw-bold mb-1 ${ins.color}`}>{ins.title.toUpperCase()}</div>}
                                                                        <p className="text-muted text-xs m-0 lh-sm">
                                                                            {ins.apiNm}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Footer Buttons */}
                                                <div className="p-3 border-top bg-white mt-auto">
                                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                                        {/* Cancel/Close Button */}
                                                        <Button
                                                            type="button"
                                                            variant="light"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={handleClose}
                                                            disabled={isLoader}
                                                        >
                                                            <XCircle size={18} />
                                                            Close
                                                        </Button>

                                                        {/* Submit/Update Button */}
                                                        <Button
                                                            type="submit"
                                                            variant="primary" // Changed to standard bootstrap primary, or keep custom
                                                            className="d-flex align-items-center gap-2"
                                                            disabled={isLoader}
                                                        >
                                                            {isLoader ? (
                                                                <>
                                                                    <Loader2 size={18} className="animate-spin" />
                                                                    <span>Loading...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle size={18} />
                                                                    <span>{servicesDtlData ? "Update" : "Submit"}</span>
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row >
                                </Form >
                            </>
                        )
                    }
                    }
                </Formik >
            </Offcanvas.Body >

            <CategoryMappedMdl
                show={isModalOpen}
                title="Category Already Used"
                message="This Category/Sub Category combination is already mapped with Integration:"
                onClose={() => setIsModalOpen(false)}
                integrationName={mappedServiceData?.ServiceNm || "ATM Switch Dispute API"}
                onViewIntegration={async () => {
                    await getServiceDtl(mappedServiceData?.TranCd)
                    setIsModalOpen(false);
                }}
            />
        </Offcanvas >
    );
};

export default IntegratedServiceMdl;


