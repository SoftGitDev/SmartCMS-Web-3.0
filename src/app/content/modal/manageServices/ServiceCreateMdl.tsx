/************************************************************
// Component     : Create New Service Modal
// Purpose       : In this we Create a new service for organization.
// Created by    : Prateek
// Created Date  : 01-09-2025
// Description   : In this we Create a new service for organization.

************************************************************/

import { Accordion, Button, Col, Offcanvas, Row } from "react-bootstrap";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import * as urls from '../../../utils/url';
import { converToBase64 } from "../../../utils/common";
import { useEffect, useState } from "react";
import Checkbox from "../../../components/ui/checkBox/Checkbox";
import { apiRequest } from "../../../utils/apiRequest";
import toastNotify from "../../../utils/tostNotify";
import Textfield from "../../../components/ui/TextField/TextInput";
import TextArea from "../../../components/ui/textArea/TextArea";
import { Camera, Eye, EyeOff, Info, PlusCircle, Trash, XCircle } from "lucide-react";
import SelectField from "../../../components/ui/SelectBox/SelectField";
import DynamicInput from "../../../components/ui/dynamic Input/DynamicInput";
import ServiceResponseMdl from "./ServiceResponseMdl";

type ServiceCreateMdlProps = {
    show: boolean;
    handleClose: () => void;
    servicesDtlData: any;
    tranCode?: any;
    getServiceData?: any;
    setServicesDtlData?: any;
};

const Instruction = [
    { apiNm: 'Service name should be unique, descriptive name for the API (e.g., "Customer Verification API").' },
    { apiNm: 'Content type is the format of data to be exchanged — typically JSON, XML, or FORM.' },
    { apiNm: 'Choose the HTTP method (e.g., GET, POST, PUT) based on how the API expects data.' },
    { apiNm: 'Add any necessary headers — such as Authorization tokens, Content-Type, or custom headers.' },
    { apiNm: 'Process type : It is the API follows a step-wise (multi-step input) or fixed format (all inputs in one request).' },
    { apiNm: 'Payload Input – It is the inputs that are used in the service select type, name, key and min - max length if required.' },
    { apiNm: 'Response Config contains the information about the response of services either it will API Response or HTTP Response and Data-Type for status and code.' },
    { apiNm: 'Resoponse Message is the type where we configure the servce message, either we want to send API Repsonse Message or Custome Message' },
];

const Instruction2 = [
    { apiNm: 'Service name should be unique, descriptive name for the API (e.g., "Customer Verification API").' },
    { apiNm: 'Content type is the format of data to be exchanged — typically JSON, XML, or FORM.' },
    { apiNm: 'Choose the HTTP method (e.g., GET, POST, PUT) based on how the API expects data.' },
    { apiNm: 'Add any necessary headers — such as Authorization tokens, Content-Type, or custom headers.' },
    { apiNm: 'Process type : It is the API follows a step-wise (multi-step input) or fixed format (all inputs in one request).' },
    { apiNm: 'To replace a header with data from a previous API response, provide the corresponding keyword retrieved from that response.' },
    { apiNm: 'Payload Input – It is the inputs that are used in the service select type, name, key and min - max length if required.' },
    { apiNm: 'Response Config contains the information about the response of services either it will API Response or HTTP Response and Data-Type for status and code.' },
    { apiNm: 'Resoponse Message is the type where we configure the servce message, either we want to send API Repsonse Message or Custome Message' },
];

const reqTypeOptions = [
    { label: "GET", value: "G" },
    { label: "POST", value: "I" },
    { label: "PUT", value: "P" },
    { label: "DELETE", value: "D" },
    { label: "HEAD", value: "H" },
    { label: "OPTIONS", value: "O" },
    { label: "TRACE", value: "T" },
];

const contentTypeOptions = [
    { label: "application/x-www-form-urlencoded", value: "E" },
    { label: "multipart/form-data", value: "M" },
    { label: "application/json", value: "J" },
    { label: "text/plain", value: "P" },
    { label: "text/html", value: "H" },
    { label: "application/xml", value: "X" },
    { label: "application/octet-stream", value: "O" },
];

const responseTypeOptions = [
    { label: "application/json", value: "J" },
    { label: "text/plain", value: "P" },
    { label: "application/xml", value: "X" },
];

const authTypeOptions = [
    { label: "None", value: "N" },
    { label: "Basic", value: "B" },
    { label: "Bearer", value: "J" },
];


const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service Name is required"),
    description: Yup.string().required("Service Description is required"),
    ticketTmpValue: Yup.string().required("Ticket Template is required"),
    steps: Yup.array().of(
        Yup.object().shape({
            apiUrl: Yup.string().required("API Path is required"),
            contentType: Yup.string().required("Content Type is required"),
            responseType: Yup.string().required("Response Type is required"),
            reqType: Yup.string().required("Request Type is required"),
            reqPayload: Yup.string().when("reqType", {
                is: (val: any) => val && val === "G",
                then: (schema) => schema.notRequired(),
                otherwise: (schema) => schema.required("Request Payload is required"),
            }),
            authType: Yup.string().required("Authentication Type is required"),
            username: Yup.string().when("authType", { is: "B", then: (schema) => schema.required("Username is required"), otherwise: (schema) => schema.notRequired() }),
            password: Yup.string().when("authType", { is: "B", then: (schema) => schema.required("Password is required"), otherwise: (schema) => schema.notRequired(), }),
            authValue: Yup.string().when("authType", { is: "J", then: (schema) => schema.required("Token is required"), otherwise: (schema) => schema.notRequired(), }),
            reqData: Yup.array().of(
                Yup.object().shape({
                    type: Yup.string().required("Input Type is required"),
                    label: Yup.string().when("type", { is: "P", then: (schema) => schema.notRequired(), otherwise: (schema) => schema.required("Label Name is required"), }),
                    minLength: Yup.string().when("type", {
                        is: (type: string) => ["T", "N", "TA"].includes(type),
                        then: (schema) => schema.required("Min Len is required"),
                        otherwise: (schema) => schema.notRequired(),
                    }),

                    maxLength: Yup.string().when("type", {
                        is: (type: string) => ["T", "N", "TA"].includes(type),
                        then: (schema) => schema.required("Max Len is required"),
                        otherwise: (schema) => schema.notRequired(),
                    }),

                    payloadVal: Yup.string().required("Key is required"),
                    dropDownValues: Yup.array().when("type", {
                        is: (type: string) => type === "D" || type === "R",
                        then: (schema) =>
                            Yup.array().of(
                                Yup.object().shape({
                                    value: Yup.string().required("Option Value is required"),
                                })
                            ),
                        otherwise: (schema) => schema.notRequired(),
                    }),
                })
            ),

            successData: Yup.array().of(Yup.object().shape({
                // key: Yup.string().when("checkFlag", {
                //     is: (val: any) => val && val == "N",
                //     then: (schema) => schema.notRequired(),
                //     otherwise: (schema) => schema.required("Key is required"),
                // }),
                // key: Yup.string().required("Key is required"),
                type: Yup.string().required("Datatype is required"),
                respMsgType: Yup.string().required("Message Type is required"),
                value: Yup.mixed().test("required-value", "Value is required", function (val) { if (Array.isArray(val)) return val.length > 0; return val !== undefined && val !== null && val !== "" }),
                customeMessage: Yup.string().required("This is required field"),
                checkFlag: Yup.string().required("Response Type is required")
            })),

            failedData: Yup.array().of(Yup.object().shape({
                // key: Yup.string().when("checkFlag", {
                //     is: (val: any) => val && val == "N",
                //     then: (schema) => schema.notRequired(),
                //     otherwise: (schema) => schema.required("Key is required"),
                // }),
                type: Yup.string().required("Datatype is required"),
                respMsgType: Yup.string().required("Message Type is required"),
                value: Yup.mixed().test("required-value", "Value is required", function (val) { if (Array.isArray(val)) return val.length > 0; return val !== undefined && val !== null && val !== "" }),
                customeMessage: Yup.string().required("This is required field"),
                checkFlag: Yup.string().required("Response Type is required"),
            })),
            exceptionData: Yup.array().of(Yup.object().shape({
                // key: Yup.string().when("checkFlag", {
                //     is: (val: any) => val && val == "N",
                //     then: (schema) => schema.notRequired(),
                //     otherwise: (schema) => schema.required("Key is required"),
                // }),
                type: Yup.string().required("Datatype is required"),
                respMsgType: Yup.string().required("Message Type is required"),
                value: Yup.mixed().test("required-value", "Value is required", function (val) { if (Array.isArray(val)) return val.length > 0; return val !== undefined && val !== null && val !== "" }),
                customeMessage: Yup.string().required("This is required field"),
                checkFlag: Yup.string().required("Response Type is required"),
            })),
            confirmMsg: Yup.string().when("confirmFlag", {
                is: "Y",
                then: (schema) => schema.required("Confirmation Message is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
        })
    ),
});

const ServiceCreateMdl: React.FC<ServiceCreateMdlProps> = ({ show, handleClose, servicesDtlData, getServiceData, setServicesDtlData }) => {

    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isShowUsername, setIsShowUsername] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowAuthValue, setIsShowAuthValue] = useState<boolean>(false);
    const [showHeaderFields, setShowHeaderFields] = useState<{ [key: number]: boolean }>({});
    const [getTemplateDropdownData, setGetTemplateDropdownData] = useState<any[]>([]);

    const toggleShowHeader = (i: number) => {
        setShowHeaderFields((prev) => ({ ...prev, [i]: !prev[i], }));
    };

    // ** this funcation fetch Template dropdown start **
    const fetchTemplate = async () => {
        try {
            const payload = {};
            const config = {};
            const result = await apiRequest("POST", urls.getTicketTemplateCombo, payload, config)
            if (result.STATUS === '0') {
                setGetTemplateDropdownData(result.RESPONSE);
            } else {
                setGetTemplateDropdownData([]);
                toastNotify(`TIcket Template : ${result.MESSAGE}`, 'error');
            }

        } catch (error: any) {

        }
    };

    // useEffect(() => {
    //     fetchTemplate();
    // }, []);


    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    const initialValues = {
        serviceName: servicesDtlData?.ServiceName || "",
        description: servicesDtlData?.Description || "",
        ticketTmpValue: servicesDtlData?.TicketTempCd || "",
        base64: servicesDtlData?.Base64 || "",
        ticketTmpLabel: servicesDtlData?.TicketTempCd && getTemplateDropdownData?.length > 0 ? getTemplateDropdownData.find((item: any) => item.TranCode === servicesDtlData.TicketTempCd)?.TemplateName || "" : "",
        alert: servicesDtlData?.alert || "",
        tranCode: servicesDtlData?.tranCode || "",
        steps: servicesDtlData?.StepData
            ? servicesDtlData.StepData.map((step: any, index: number) => {

                return {
                    id: index + 1,
                    existFlag: step?.ExistFlag || "N",
                    deleteFlag: step?.DeleteFlag || "N",
                    apiUrl: step?.ApiUrl || "",
                    srCode: step?.SrCode || "",
                    serviceCode: step?.ServiceCode || "",
                    reqType: step?.RequestType || "",
                    contentType: step?.ContentType || "",
                    responseType: step?.ResponseType || "",
                    authType: step?.AuthType || "",
                    username: step?.UserName || "",
                    isShowUsername: false,
                    password: step?.Password || "",
                    isShowPassword: false,
                    authValue: step?.AuthValue || "",
                    isShowAuthValue: false,
                    reqPayload: step?.RequestPayload || "",
                    apiResponseFlag: step?.ApiResponseFlag || "N",
                    confirmFlag: step?.ConfirmFlag || "N",
                    confirmMsg: step?.ConfirmMsg || "",
                    successData: (step.SuccessData && step.SuccessData.length > 0)
                        ? step.SuccessData.map((s: any, id: number) => ({
                            key: s?.ResponseKey || "",
                            type: s?.DataType || "",
                            typeLbl: (s?.DataType === "B" && "Boolean") || (s?.DataType === "S" && "String") || (s?.DataType === "I" && "Integer") || "",
                            value: s?.ResponseValue ? (s?.ResponseValue) : [],
                            // value: s?.ResponseValue ? JSON.parse(s?.ResponseValue) : [],
                            respMsgType: s?.MessageType || "",
                            respMsgTypeLbl: (s?.MessageType === "A" && "API Response Message") || (s?.MessageType === "C" && "Custom Message") || "",
                            customeMessage: s?.CustomeMessage || "",
                            checkFlag: s?.CheckFlag || "N",
                            checkFlagLbl: (s?.CheckFlag === "N" && "HTTP Response") || (s?.CheckFlag === "R" && "API Response") || "HTTP Response",
                            existFlag: s?.ExistFlag || "N",
                            deleteFlag: s?.DeleteFlag || "N",
                            lineCd: s?.LineCode || "",
                            flag: "S",
                            id: id + 1,
                        }))
                        : [{
                            key: "",
                            type: "",
                            value: '',
                            customeMessage: "",
                            checkFlag: "",
                            existFlag: "N",
                            deleteFlag: "N",
                            lineCd: "",
                            flag: "S",
                            id: 1,
                        }],
                    failedData:
                        step.FailedData && step.FailedData.length > 0
                            ? step.FailedData.map((f: any, id: number) => ({
                                key: f?.ResponseKey || "",
                                type: f?.DataType || "",
                                typeLbl: (f?.DataType === "B" && "Boolean") || (f?.DataType === "S" && "String") || (f?.DataType === "I" && "Integer") || "",
                                value: f?.ResponseValue ? (f?.ResponseValue) : [],
                                // value: f?.ResponseValue ? JSON.parse(f?.ResponseValue) : [],
                                respMsgType: f?.MessageType || "",
                                respMsgTypeLbl: (f?.MessageType === "A" && "API Response Message") || (f?.MessageType === "C" && "Custom Message") || "",
                                customeMessage: f?.CustomeMessage || "",
                                checkFlag: f?.CheckFlag || "N",
                                checkFlagLbl: (f?.CheckFlag === "N" && "HTTP Response") || (f?.CheckFlag === "R" && "API Response") || "HTTP Response",
                                existFlag: f?.ExistFlag || "N",
                                deleteFlag: f?.DeleteFlag || "N",
                                lineCd: f?.LineCode || "",
                                flag: "F",
                                id: id + 1
                            }))
                            : [{
                                key: "",
                                type: "",
                                value: '',
                                customeMessage: "",
                                checkFlag: "",
                                existFlag: "N",
                                deleteFlag: "N",
                                lineCd: "",
                                flag: "F",
                                id: 1,
                            }],
                    exceptionData:
                        step.ExceptionData && step.ExceptionData.length > 0
                            ? step.ExceptionData.map((e: any, id: number) => ({
                                key: e?.ResponseKey || "",
                                type: e?.DataType || "",
                                typeLbl: (e?.DataType === "B" && "Boolean") || (e?.DataType === "S" && "String") || (e?.DataType === "I" && "Integer") || "",
                                // value: e?.ResponseValue ? JSON.parse(e?.ResponseValue) : [],
                                value: e?.ResponseValue ? (e?.ResponseValue) : [],
                                respMsgType: e?.MessageType || "",
                                respMsgTypeLbl: (e?.MessageType === "A" && "API Response Message") || (e?.MessageType === "C" && "Custom Message") || "",
                                customeMessage: e?.CustomeMessage || "",
                                checkFlag: e?.CheckFlag || "N",
                                checkFlagLbl: (e?.CheckFlag === "N" && "HTTP Response") || (e?.CheckFlag === "R" && "API Response") || "HTTP Response",
                                existFlag: e?.ExistFlag || "N",
                                deleteFlag: e?.DeleteFlag || "N",
                                lineCd: e?.LineCode || "",
                                flag: "E",
                                id: id + 1
                            }))
                            : [{
                                key: "",
                                type: "",
                                value: '',
                                customeMessage: "",
                                checkFlag: "",
                                existFlag: "N",
                                deleteFlag: "N",
                                lineCd: "",
                                flag: "E",
                                id: 1,
                            }],

                    headerData: step.HeaderData && step.HeaderData.length > 0
                        ? step?.HeaderData.map((h: any, id: number) => ({
                            key: h?.Key || "",
                            value: h?.Value || "",
                            srCode: h?.SrCode || "",
                            existFlag: h?.ExistFlag || "N",
                            lineCd: h?.LineCode || "",
                            showHeaderFields: false,
                            deleteFlag: h?.deleteFlag || "N",
                            id: id + 1

                        }))
                        : [],
                    // Create dynamic Input Fields Data
                    reqData:
                        step.ReqData && step.ReqData.length > 0
                            ? step.ReqData.map((resp: any, index: number) => {
                                return ({
                                    type: resp?.Type || "",
                                    label: resp?.Label || "",
                                    payloadVal: resp?.PayloadValue || "",
                                    minLength: resp?.MinLength || "",
                                    maxLength: resp?.MaxLength || "",
                                    existFlag: resp?.ExistFlag || "N",
                                    deleteFlag: resp?.DeleteFlag || "N",
                                    lineCd: resp?.LineCode || "",
                                    required: resp?.Required || "N",
                                    securedFlag: "",
                                    maskFlag: "", // if input type are dropdown or radio buttons options
                                    columnData: resp?.ColumnData?.map((c: any, id: number) => ({
                                        ...c,
                                        existFlag: c.ExistFlag,
                                        deleteFlag: "N",
                                        val: c?.Value || "",
                                        id: id + 1,
                                    }))
                                })
                            })
                            : [
                                {
                                    type: "",
                                    typeLbl: "",
                                    label: "",
                                    payloadVal: "",
                                    minLength: "",
                                    maxLength: "",
                                    required: "N",
                                    securedFlag: "",
                                    maskFlag: "",
                                    columnData: [{ val: "", id: 1 }],
                                },
                            ],
                };
            })
            : [
                {
                    id: 1,
                    apiUrl: "",
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
                    apiResponseFlag: "N",
                    deleteFlag: "N",
                    successData: [{
                        key: "",
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "",
                        checkFlag: "N",
                        checkFlagLbl: "HTTP Response",
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
                        respMsgType: "",
                        checkFlag: "N",
                        checkFlagLbl: "HTTP Response",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "F",
                        id: 1,
                    }],
                    exceptionData: [{
                        key: "",
                        type: "I",
                        typeLbl: "Integer",
                        value: '',
                        customeMessage: "",
                        respMsgType: "",
                        checkFlag: "N",
                        checkFlagLbl: "HTTP Response",
                        existFlag: "N",
                        deleteFlag: "N",
                        flag: "E",
                        id: 1,
                    }],
                    headerData: [],
                    reqData: [
                        {
                            type: "",
                            typeLbl: "",
                            label: "",
                            payloadVal: "",
                            minLength: "0",
                            maxLength: "0",
                            required: "N",
                            securedFlag: "",
                            maskFlag: "",
                            columnData: [{ val: "", id: 1 }],
                        },
                    ],
                },
            ],

    };

    // Function to handle service creation API call
    const addServiceData = async (val: any, resetForm: any) => {

        try {
            setIsLoader(true);
            const payload = {
                serviceName: val?.serviceName || "",
                description: val?.description || "",
                ticketTempCd: val?.ticketTmpValue || 0,
                alert: val?.alert || "",
                base64: val?.base64 || "",
                tranCode: val?.tranCode || "",
                steps: val?.steps
                    ? val.steps.map((step: any, index: number) => {
                        return {
                            existFlag: step?.existFlag || "N",
                            deleteFlag: step?.deleteFlag || "N",
                            apiUrl: step?.apiUrl || "",
                            srCode: step?.srCode || "",
                            serviceCode: step?.serviceCode || "",
                            reqType: step?.reqType || "",
                            contentType: step?.contentType || "",
                            responseType: step?.responseType || "",
                            authType: step?.authType || "",
                            username: step?.username || "",
                            showUsername: step?.showUsername || "false",
                            password: step?.password || "",
                            showPassword: step?.showPassword || "false",
                            authValue: step?.authValue || "",
                            reqPayload: step?.reqPayload || "",
                            apiResponseFlag: step?.apiResponseFlag || "N",
                            confirmFlag: step?.confirmFlag || "N",
                            confirmMsg: step?.confirmMsg || "",
                            successData:
                                (step.successData && step.successData.length > 0)
                                    ? step.successData.map((s: any, index: number) => ({
                                        key: s?.key || "",
                                        type: s?.type || "",
                                        value: s?.value.toString() || "",
                                        messageType: s?.respMsgType || "",
                                        customeMessage: s?.customeMessage || "",
                                        checkFlag: s?.checkFlag || "",
                                        existFlag: s?.existFlag || "N",
                                        deleteFlag: s?.deleteFlag || "N",
                                        lineCd: s?.lineCd || "",
                                        flag: "S",
                                    }))
                                    : [],
                            failedData:
                                (step.failedData && step.failedData.length > 0)
                                    ? step.failedData.map((f: any, index: number) => ({
                                        key: f?.key || "",
                                        type: f?.type || "",
                                        value: f?.value.toString() || "",
                                        existFlag: f?.existFlag || "N",
                                        deleteFlag: f?.deleteFlag || "N",
                                        messageType: f?.respMsgType || "",
                                        customeMessage: f?.customeMessage || "",
                                        checkFlag: f?.checkFlag || "",
                                        lineCd: f?.lineCd || "",
                                        flag: "F",
                                    }))
                                    : [],
                            exceptionData:
                                (step.exceptionData && step.exceptionData.length > 0)
                                    ? step.exceptionData.map((e: any, index: number) => ({
                                        key: e?.key || "",
                                        type: e?.type || "",
                                        value: e?.value.toString() || "",
                                        messageType: e?.respMsgType || "",
                                        customeMessage: e?.customeMessage || "",
                                        checkFlag: e?.checkFlag || "",
                                        existFlag: e?.existFlag || "N",
                                        deleteFlag: e?.deleteFlag || "N",
                                        lineCd: e?.lineCd || "",
                                        flag: "E",
                                    }))
                                    : [],

                            headerStatus: (step.headerData && step.headerData.length > 0) ? "Y" : "N",
                            headerData: (step.headerData && step.headerData.length > 0)
                                ? step?.headerData.map((h: any, index: number) => ({
                                    key: h?.key || "",
                                    value: h?.value || "",
                                    srCode: h?.srCode || "",
                                    existFlag: h?.existFlag || "N",
                                    deleteFlag: h?.deleteFlag || "N",
                                }))
                                : [],
                            reqData:
                                step.reqData && step.reqData.length > 0
                                    ? step.reqData.map((resp: any, index: number) => ({
                                        type: resp?.type || "",
                                        label: resp?.label || "",
                                        payloadVal: resp?.payloadVal || "",
                                        minLength: resp?.minLength || "0",
                                        maxLength: resp?.maxLength || "0",
                                        existFlag: resp?.existFlag || "N",
                                        deleteFlag: resp?.deleteFlag || "N",
                                        lineCd: resp?.lineCd || "",
                                        required: resp?.required || "N",
                                        securedFlag: "",
                                        maskFlag: "",
                                        columnData: resp?.columnData.filter((c: { val: string }) => c.val !== "").map((c: { val: string }) => ({ val: c?.val || "" })), // if input type are dropdown or radio buttons options
                                    }))
                                    : [],
                        };
                    }) : []
            };

            const config = {};
            const result = await apiRequest("POST", urls.addService, payload, config)
            if (result.STATUS === '0') {
                toastNotify(result.MESSAGE, 'success');
                getServiceData();
                handleClose();
            } else {
                toastNotify(result.MESSAGE, 'error');
            }

        } catch (error: any) {

        }
        finally {
            setIsLoader(false);
        }
    };

    const editServiceData = async (val: typeof initialValues, resetForm: any) => {
        try {
            setIsLoader(true);
            const payload = {
                serviceName: val?.serviceName || "",
                description: val?.description || "",
                ticketTempCd: val?.ticketTmpValue || 0,
                alert: val?.alert || "",
                base64: val?.base64 || "",
                // serviceCode: val?.serviceCode || "",
                tranCode: val?.tranCode || "",
                // confirmFlag: val?.confirmFlag,
                steps: val?.steps
                    ? val.steps.map((step: any) => {
                        return {
                            existFlag: step?.existFlag || "N",
                            deleteFlag: step?.deleteFlag || "N",
                            apiUrl: step?.apiUrl || "",
                            srCode: step?.srCode || "",
                            serviceCode: step?.serviceCode || "",
                            reqType: step?.reqType || "",
                            contentType: step?.contentType || "",
                            responseType: step?.responseType || "",
                            authType: step?.authType || "",
                            username: step?.username || "",
                            password: step?.password || "",
                            authValue: step?.authValue || "",
                            reqPayload: step?.reqPayload || "",
                            apiResponseFlag: step?.apiResponseFlag || "N",
                            confirmFlag: step?.confirmFlag || "N",
                            confirmMsg: step?.confirmMsg || "",
                            successData:
                                step.successData && step.successData.length > 0
                                    ? step.successData.map((s: any) => ({
                                        key: s?.key || "",
                                        type: s?.type || "",
                                        value: s?.value.toString() || "",
                                        messageType: s?.respMsgType || "",
                                        customeMessage: s?.customeMessage || "",
                                        checkFlag: s?.checkFlag || "",
                                        existFlag: s?.existFlag || "Y",
                                        deleteFlag: s?.deleteFlag || "N",
                                        lineCd: s?.lineCd || "",
                                        flag: "S",
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
                            failedData:
                                step.failedData && step.failedData.length > 0
                                    ? step.failedData.map((f: any) => ({
                                        key: f?.key || "",
                                        type: f?.type || "",
                                        value: f?.value.toString() || "",
                                        existFlag: f?.existFlag || "Y",
                                        deleteFlag: f?.deleteFlag || "N",
                                        messageType: f?.respMsgType || "",
                                        customeMessage: f?.customeMessage || "",
                                        checkFlag: f?.checkFlag || "",
                                        lineCd: f?.lineCd || "",
                                        flag: "F",
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
                            exceptionData:
                                step.exceptionData && step.exceptionData.length > 0
                                    ? step.exceptionData.map((e: any) => ({
                                        key: e?.key || "",
                                        type: e?.type || "",
                                        value: e?.value.toString() || "",
                                        messageType: e?.respMsgType || "",
                                        customeMessage: e?.customeMessage || "",
                                        checkFlag: e?.checkFlag || "",
                                        existFlag: e?.existFlag || "Y",
                                        deleteFlag: e?.deleteFlag || "N",
                                        lineCd: e?.lineCd || "",
                                        flag: "E",
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

                            headerStatus: (step.headerData && step.headerData.length > 0) ? "Y" : "N",
                            headerData: step.headerData && step.headerData.length > 0
                                ? step?.headerData.map((h: any) => ({
                                    key: h?.key || "",
                                    value: h?.value || "",
                                    srCode: h?.srCode || "",
                                    lineCd: h?.lineCd || "",
                                    existFlag: h?.existFlag || "Y",
                                    deleteFlag: h?.deleteFlag || "N",
                                }))
                                : [],
                            // Create dynamic Input Fields Data
                            reqData:
                                step.reqData && step.reqData.length > 0
                                    ? step.reqData.map((resp: any) => {
                                        return ({
                                            type: resp?.type || "",
                                            label: resp?.label || "",
                                            payloadVal: resp?.payloadVal || "",
                                            minLength: resp?.minLength || "0",
                                            maxLength: resp?.maxLength || "0",
                                            existFlag: resp?.existFlag || "N",
                                            deleteFlag: resp?.deleteFlag || "N",
                                            lineCd: resp?.lineCd || "",
                                            required: resp?.required || "N",
                                            securedFlag: "",
                                            maskFlag: "", // If maskFlag input type are dropdown or radio buttons options
                                            columnData: resp?.columnData?.map((c: any) => ({
                                                existFlag: c?.existFlag ? c?.existFlag : "N",
                                                deleteFlag: c?.deleteFlag ? c?.deleteFlag : "N",
                                                srCode: c?.SrCode || "0",
                                                val: c?.val
                                            }))
                                        })
                                    })
                                    : [],
                        };
                    })
                    : [],
            };
            const config = {};
            const result = await apiRequest("POST", urls.editService, payload, config)
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

    return (
        <Offcanvas
            show={show}
            placement="end"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="custom-offcanvas px-3 me-3"
            style={{ width: "1400px", height: "96vh", top: "2vh", borderRadius: "8px" }}>

            <Offcanvas.Header className="pb-0" closeButton>
                <div>
                    <h5 className="mb-0 mt-2"><strong>{!servicesDtlData ? "Create " : "Edit "}Service</strong></h5>
                    <small className="text-slate-500 text-xs">Please Enter the following Service Information</small>
                </div>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        if (servicesDtlData) {
                            editServiceData(values, resetForm)
                        } else {
                            addServiceData(values, resetForm);
                        }
                    }}
                >
                    {({ values, setFieldValue, setFieldTouched, handleChange, handleBlur, errors }) => {
                        console.log("errors", errors)
                        return (
                            <>
                                <Form noValidate>
                                    {/* Service Information */}
                                    <Row className="mt-2">
                                        <Col xs={12} sm={12} md={8} lg={8} style={{ maxHeight: "calc(100vh - 165px)", overflowY: "auto" }}>
                                            <Row>
                                                <Row className="d-flex">
                                                    <Col md={9} lg={9}>
                                                        <Col md={12} className="mb-3 pt-2">
                                                            <Textfield
                                                                label="Service Name"
                                                                name="serviceName"
                                                                placeholder="Enter  Service Name"
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

                                                        <Col md={12} className="mb-3">
                                                            <TextArea
                                                                label="Service Description"
                                                                name="description"
                                                                placeholder="Enter Service Description"
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
                                                                <label className={`form-label text-xs`}>Service Image</label>
                                                            </div>
                                                        </Col>
                                                    </Col>
                                                </Row>

                                                <div>
                                                    <div className="d-flex justify-content-end align-items-center">
                                                        <Button
                                                            size="sm"
                                                            className="bg-transparent text-primary border-0 text-xs fw-semibold p-0 me-2"
                                                            variant="outline-primary"
                                                            disabled={values.steps?.length >= 4}
                                                            onClick={() => {

                                                                const lastStepData = values.steps[values.steps.length - 1];
                                                                if (
                                                                    !lastStepData?.apiUrl ||
                                                                    !lastStepData?.reqType ||
                                                                    !lastStepData?.contentType ||
                                                                    !lastStepData?.authType
                                                                    // || !lastStepData?.reqPayload
                                                                ) {
                                                                    toastNotify("Please fill existing service fields before adding a new one.", "error");
                                                                    return;
                                                                }

                                                                if (
                                                                    (lastStepData?.authType === "B" && (!lastStepData?.username || !lastStepData?.password)) ||
                                                                    (lastStepData?.authType === "J" && !lastStepData?.authValue)
                                                                ) {
                                                                    toastNotify("Please fill existing authentication type before adding a new one.", "error");
                                                                    return;
                                                                }

                                                                // successData validation
                                                                for (const s of lastStepData?.successData || []) {
                                                                    if (!s.checkFlag || !s.type || !s.respMsgType || !s.customeMessage) {
                                                                        toastNotify("Please fill existing success response fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                    if ((s.checkFlag === "I" || s.checkFlag === "S") && (!s.value || s.value.length === 0)) {
                                                                        toastNotify("Please fill existing value fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                }

                                                                // failedData validation
                                                                for (const s of lastStepData?.failedData || []) {
                                                                    if (!s.checkFlag || !s.type || !s.respMsgType || !s.customeMessage) {
                                                                        toastNotify("Please fill existing failed response fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                    if ((s.checkFlag === "I" || s.checkFlag === "S") && (!s.value || s.value.length === 0)) {
                                                                        toastNotify("Please fill existing value fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                }

                                                                // exceptionData validation
                                                                for (const s of lastStepData?.exceptionData || []) {
                                                                    if (!s.checkFlag || !s.type || !s.respMsgType || !s.customeMessage) {
                                                                        toastNotify("Please fill existing exception response fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                    if ((s.checkFlag === "I" || s.checkFlag === "S") && (!s.value || s.value.length === 0)) {
                                                                        toastNotify("Please fill existing value fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                }

                                                                // headerData validation
                                                                for (const s of lastStepData?.headerData || []) {
                                                                    if (!s.key || !s.value) {
                                                                        toastNotify("Please fill existing header fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                }

                                                                // reqData validation
                                                                for (const s of lastStepData?.reqData || []) {
                                                                    if (!s.type && (!s.type && !(s.label)) || !s.payloadVal) {
                                                                        toastNotify("Please fill existing payload fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                    if (s.type === "D" && (!s.columnData || s.columnData.length === 0)) {
                                                                        toastNotify("Please fill existing value fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                    if (s.type === "T" && (!s.minLength || !s.maxLength || s.maxLength === "0")) {
                                                                        toastNotify("Please fill existing payload fields before adding a new one.", "error");
                                                                        return;
                                                                    }
                                                                }

                                                                setFieldValue("steps", [...values.steps,
                                                                {
                                                                    apiUrl: "",
                                                                    reqType: "",
                                                                    contentType: "",
                                                                    authType: "B",
                                                                    authTypeLbl: "Basic",
                                                                    username: "",
                                                                    password: "",
                                                                    authValue: "",
                                                                    reqPayload: "",
                                                                    existFlag: "N",
                                                                    apiResponseFlag: "N",
                                                                    deleteFlag: "N",
                                                                    successData: [{ key: "", type: "I", typeLbl: "Integer", value: '', customeMessage: "", checkFlag: "N", checkFlagLbl: "HTTP Response", existFlag: "N", deleteFlag: "N", flag: "S" }],
                                                                    failedData: [{ key: "", type: "I", typeLbl: "Integer", value: '', customeMessage: "", checkFlag: "N", checkFlagLbl: "HTTP Response", existFlag: "N", deleteFlag: "N", flag: "F" }],
                                                                    exceptionData: [{ key: "", type: "I", typeLbl: "Integer", value: '', customeMessage: "", checkFlag: "N", checkFlagLbl: "HTTP Response", existFlag: "N", deleteFlag: "N", flag: "E" }],
                                                                    headerData: [],
                                                                    reqData: [
                                                                        {
                                                                            type: "",
                                                                            typeLbl: "",
                                                                            label: "",
                                                                            payloadVal: "",
                                                                            minLength: "",
                                                                            maxLength: "",
                                                                            required: "N",
                                                                            securedFlag: "",
                                                                            maskFlag: "",
                                                                            columnData: [{ val: "", id: 1 }],
                                                                        },
                                                                    ],
                                                                    id: Math.max(...values.steps.map((m: any) => m.id)) + 1
                                                                }])

                                                            }
                                                            } > <PlusCircle style={{ marginBottom: "3px" }} size={15} /> Add Step
                                                        </Button>
                                                    </div>

                                                    {/* Step Content */}
                                                    <Accordion defaultActiveKey="0" className="mt-1">
                                                        {values.steps.filter((s: any) => s.deleteFlag !== "Y").map((step: any, index: number,) => (
                                                            <Accordion.Item eventKey={index.toString()} key={index} >
                                                                <Accordion.Header>
                                                                    <div className="d-flex justify-content-between align-items-center w-100">
                                                                        <span className="text-md fw-bold ps-2">Step {index + 1}</span>
                                                                        {values.steps.length > 1 && (
                                                                            <XCircle
                                                                                size={20}
                                                                                className="bg-light me-2 primary rounded-4 cursor-pointer"
                                                                                onClick={(e: any) => {
                                                                                    e.stopPropagation();
                                                                                    const updatedSteps = values.steps.filter((_: any, i: number) => i !== index);
                                                                                    setFieldValue("steps", updatedSteps);
                                                                                    const update = [...values.steps];
                                                                                    const findInd = values.steps.findIndex((f: any) => f.id === step.id);
                                                                                    if (step.existFlag === "Y") {
                                                                                        update[findInd].deleteFlag = "Y";
                                                                                        setFieldValue("steps", update);
                                                                                    } else {
                                                                                        update.splice(findInd, 1);
                                                                                        setFieldValue("steps", update);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    <Row className="mt-2">
                                                                        <Col md={12} className="mb-3">
                                                                            <Textfield
                                                                                label="API Path"
                                                                                placeholder="Enter API path"
                                                                                name={`steps[${index}].apiUrl`}
                                                                                type="text"
                                                                                maxLength={500}
                                                                                minLength={8}
                                                                                value={step.apiUrl}
                                                                                tabIndex={getNextTabIndex()}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                required
                                                                            />
                                                                            <ErrorMessage name={`steps[${index}].apiUrl`} component="div" className="ErrorMessage" />
                                                                        </Col>

                                                                        <Col md={4} className="mb-3">
                                                                            <SelectField
                                                                                label="Request Type"
                                                                                name={`steps[${index}].reqType`}
                                                                                placeholder="Select Request Type"
                                                                                options={reqTypeOptions}
                                                                                value={
                                                                                    step.reqType
                                                                                        ? reqTypeOptions.find(opt => opt.value === step.reqType) || null
                                                                                        : null
                                                                                }
                                                                                tabIndex={getNextTabIndex()}
                                                                                onChange={(option: any) => {
                                                                                    if (option && !Array.isArray(option)) {
                                                                                        setFieldValue(`steps[${index}].reqType`, option.value);
                                                                                        setFieldValue(`steps[${index}].reqTypeLbl`, option.label);
                                                                                    }
                                                                                }}
                                                                                onBlur={() => setFieldTouched(`steps[${index}].reqType`, true)}
                                                                                required
                                                                            />

                                                                            <ErrorMessage name={`steps[${index}].reqType`} component="div" className="ErrorMessage" />
                                                                        </Col>

                                                                        <Col md={4} className="mb-3">
                                                                            <SelectField
                                                                                label="Content Type"
                                                                                placeholder="Select Content Type"
                                                                                options={contentTypeOptions}
                                                                                required
                                                                                tabIndex={getNextTabIndex()}
                                                                                value={
                                                                                    step.contentType
                                                                                        ? contentTypeOptions.find(opt => opt.value === step.contentType) || null
                                                                                        : null
                                                                                }
                                                                                onChange={(option: any) => {
                                                                                    if (option && !Array.isArray(option)) {
                                                                                        setFieldValue(`steps[${index}].contentType`, option.value);
                                                                                        setFieldValue(`steps[${index}].contentTypeLbl`, option.label);
                                                                                    }
                                                                                }}
                                                                                onBlur={() => setFieldTouched(`steps[${index}].contentType`, true)}
                                                                            />
                                                                            <ErrorMessage name={`steps[${index}].contentType`} component="div" className="ErrorMessage" />
                                                                        </Col>

                                                                        <Col md={4} className="mb-3">
                                                                            <SelectField
                                                                                label="Response Type"
                                                                                placeholder="Select Response Type"
                                                                                options={responseTypeOptions}
                                                                                required
                                                                                tabIndex={getNextTabIndex()}
                                                                                value={
                                                                                    step.contentType
                                                                                        ? responseTypeOptions.find((opt: any) => opt.value === step.responseType) || null
                                                                                        : null
                                                                                }
                                                                                onChange={(option: any) => {
                                                                                    if (option && !Array.isArray(option)) {
                                                                                        setFieldValue(`steps[${index}].responseType`, option.value);
                                                                                        setFieldValue(`steps[${index}].responseTypeLbl`, option.label);
                                                                                    }
                                                                                }}
                                                                                onBlur={() => setFieldTouched(`steps[${index}].contentType`, true)}
                                                                            />
                                                                            <ErrorMessage name={`steps[${index}].responseType`} component="div" className="ErrorMessage" />
                                                                        </Col>

                                                                        <Col md={4} className="mb-2">
                                                                            <SelectField
                                                                                label="Auth Type"
                                                                                placeholder="Select Auth Type"
                                                                                options={authTypeOptions}
                                                                                required
                                                                                tabIndex={getNextTabIndex()}
                                                                                value={
                                                                                    step.authType
                                                                                        ? authTypeOptions.find(opt => opt.value === step.authType) || null
                                                                                        : null
                                                                                }
                                                                                onChange={(option: any) => {
                                                                                    if (option && !Array.isArray(option)) {
                                                                                        setFieldValue(`steps[${index}].authType`, option.value);
                                                                                        setFieldValue(`steps[${index}].authTypeLbl`, option.label);
                                                                                    }
                                                                                }}
                                                                                onBlur={() => setFieldTouched(`steps[${index}].authType`, true)}
                                                                            />
                                                                            <ErrorMessage name={`steps[${index}].authType`} component="div" className="ErrorMessage" />
                                                                        </Col>

                                                                        {step.authType === "B" && (
                                                                            <>
                                                                                <Col md={4} className="mb-3">
                                                                                    <Textfield
                                                                                        label="Username"
                                                                                        placeholder='Enter Username'
                                                                                        name={`steps[${index}].username`}
                                                                                        type={isShowUsername ? "text" : "password"}
                                                                                        maxLength={55}
                                                                                        tabIndex={getNextTabIndex()}
                                                                                        minLength={8}
                                                                                        // IconProp={() => (<Button variant='' className='p-0' onClick={() => setIsShowUsername(!isShowUsername)}>{isShowUsername ? <Eye size={12} className="text-slate-500" /> : <EyeOff className="text-slate-500" />}</Button>)}
                                                                                        value={step.username}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        required
                                                                                    />
                                                                                    <ErrorMessage name={`steps[${index}].username`} component="div" className="ErrorMessage" />
                                                                                </Col>

                                                                                <Col md={4} className="mb-3">
                                                                                    <Textfield
                                                                                        label="Password"
                                                                                        placeholder='Enter Password'
                                                                                        name={`steps[${index}].password`}
                                                                                        type={isShowPassword ? "text" : "password"}
                                                                                        maxLength={55}
                                                                                        // IconProp={() => (<Button variant='' className='p-0' onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <Eye size={12} className="text-slate-500" /> : <EyeOff className="text-slate-500" />}</Button>)}
                                                                                        minLength={8}
                                                                                        tabIndex={getNextTabIndex()}
                                                                                        value={step.password}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        required
                                                                                    />
                                                                                    <ErrorMessage name={`steps[${index}].password`} component="div" className="ErrorMessage" />
                                                                                </Col>
                                                                            </>
                                                                        )}

                                                                        {step.authType === "J" && (
                                                                            <>
                                                                                <Col md={8} className="mb-3">
                                                                                    <Textfield
                                                                                        label="Token"
                                                                                        placeholder='Enter Token'
                                                                                        name={`steps[${index}].authValue`}
                                                                                        type={isShowAuthValue ? "text" : "password"}
                                                                                        IconProp={() => (<Button variant='' className='p-0' onClick={() => setIsShowAuthValue(!isShowAuthValue)}>{isShowAuthValue ? <Eye /> : <EyeOff />}</Button>)}
                                                                                        minLength={25}
                                                                                        maxLength={300}
                                                                                        tabIndex={getNextTabIndex()}
                                                                                        value={step.authValue}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        required
                                                                                    />
                                                                                    <ErrorMessage name={`steps[${index}].authValue`} component="div" className="ErrorMessage" />
                                                                                </Col>
                                                                            </>
                                                                        )}

                                                                        {step.authType === "N" && (
                                                                            <>
                                                                                {/* <Col md={8} className="mb-3">
                                                                                    <Textfield
                                                                                        className="rounded-1 w-100 bg-light disable"
                                                                                        label=""
                                                                                        type="text"
                                                                                        style={{ height: "35px", backgroundColor: "rgb(227 227 227)" }}
                                                                                        disabled
                                                                                    />
                                                                                </Col> */}
                                                                            </>
                                                                        )}

                                                                        <div className="d-flex justify-content-start rounded-3 w-90 text-xs fw-medium mx-3 ms-1">
                                                                            <Button
                                                                                variant="link"
                                                                                className="text-primary fw-semibold text-xs p-0 pe-1 text-decoration-none"
                                                                                onClick={() => {
                                                                                    const currentHeaders = values.steps[index].headerData || [];
                                                                                    if (currentHeaders.filter((r: any) => r?.deleteFlag !== "Y").length >= 3) return;

                                                                                    if (currentHeaders[currentHeaders.length - 1]?.key === '' || currentHeaders[currentHeaders.length - 1]?.value === "") {
                                                                                        toastNotify("Please fill existing header fields before adding a new one.", "error");
                                                                                        return;
                                                                                    }

                                                                                    const nextSrCode = (currentHeaders.length + 1).toString();
                                                                                    const maxId = values.steps[index].headerData.length > 0
                                                                                        ? Math.max(...values.steps[index].headerData.map((m: any) => m.id))
                                                                                        : 0;

                                                                                    const newHeader = {
                                                                                        key: "",
                                                                                        value: "",
                                                                                        existFlag: "N",
                                                                                        deleteFlag: "N",
                                                                                        srCode: nextSrCode,
                                                                                        id: maxId + 1
                                                                                    };

                                                                                    const updatedHeaders = [...currentHeaders, newHeader];
                                                                                    setFieldValue(`steps.${index}.headerData`, updatedHeaders);
                                                                                }}
                                                                            >
                                                                                <PlusCircle style={{ marginBottom: "3px" }} size={15} /> Add More Header
                                                                            </Button>
                                                                            <div className="ms-auto pe-3">
                                                                                <Checkbox
                                                                                    name={`steps[${index}].apiResponseFlag`}
                                                                                    label="Do you want to check API Response"
                                                                                    checked={values.steps[index]?.apiResponseFlag === "Y"}
                                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                        setFieldValue(`steps[${index}].apiResponseFlag`, e.target.checked ? "Y" : "N");
                                                                                        if (e.target.checked) {
                                                                                            const successVal = values.steps[index]?.successData.map((s: any, index: number) => ({ ...s, checkFlag: "", checkFlagLbl: "", type: "", typeLbl: "", }));
                                                                                            const failedVal = values.steps[index]?.failedData.map((s: any, index: number) => ({ ...s, checkFlag: "", checkFlagLbl: "", type: "", typeLbl: "", }));
                                                                                            const exceptionVal = values.steps[index]?.exceptionData.map((s: any, index: number) => ({ ...s, checkFlag: "", checkFlagLbl: "", type: "", typeLbl: "", }));
                                                                                            setFieldValue(`steps[${index}].successData`, successVal);
                                                                                            setFieldValue(`steps[${index}].failedData`, failedVal);
                                                                                            setFieldValue(`steps[${index}].exceptionData`, exceptionVal);
                                                                                        } else {
                                                                                            const successVal = values.steps[index]?.successData.map((s: any, index: number) => ({ ...s, checkFlag: "N", checkFlagLbl: "HTTP Response", type: "I", typeLbl: "Integer", key: "" }));
                                                                                            const failedVal = values.steps[index]?.failedData.map((s: any, index: number) => ({ ...s, checkFlag: "N", checkFlagLbl: "HTTP Response", type: "I", typeLbl: "Integer", key: "" }));
                                                                                            const exceptionVal = values.steps[index]?.exceptionData.map((s: any, index: number) => ({ ...s, checkFlag: "N", checkFlagLbl: "HTTP Response", type: "I", typeLbl: "Integer", key: "" }));
                                                                                            setFieldValue(`steps[${index}].successData`, successVal);
                                                                                            setFieldValue(`steps[${index}].failedData`, failedVal);
                                                                                            setFieldValue(`steps[${index}].exceptionData`, exceptionVal);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            {step.headerData.filter((r: any) => r?.deleteFlag !== "Y").length > 0 &&
                                                                                <fieldset className="border rounded-3 px-3 mb-3">
                                                                                    <legend className="float-none w-auto px-2 text-primary mb-0 text-xs fw-medium">Headers</legend>
                                                                                    {(step.headerData || []).filter((h: any) => h.deleteFlag !== "Y").map((header: any) => {

                                                                                        const FindIndex = values.steps[index].headerData.findIndex((f: any) => f.id === header.id);
                                                                                        if (FindIndex === -1) return null;

                                                                                        const namePath = `steps[${index}].headerData[${FindIndex}]`;

                                                                                        const headerIndex = (step.headerData || []).filter((h: any) => h.deleteFlag !== "Y").findIndex((f: any) => f.id === header.id);

                                                                                        return (
                                                                                            <div key={header.id}>
                                                                                                <div className="mb-2 d-flex align-items-center gap-2 pt-2">
                                                                                                    <Col md={3} className="ps-0 mb-2">
                                                                                                        <Textfield
                                                                                                            label="Key"
                                                                                                            placeholder='Enter Key'

                                                                                                            type="text"
                                                                                                            name={`${namePath}.key`}
                                                                                                            value={header.key}
                                                                                                            tabIndex={getNextTabIndex()}
                                                                                                            maxLength={45}
                                                                                                            onChange={handleChange}
                                                                                                            onBlur={handleBlur}
                                                                                                        />
                                                                                                    </Col>

                                                                                                    <Col md={8} className="p-0 mb-2">
                                                                                                        <Textfield
                                                                                                            label="Value"
                                                                                                            placeholder='Enter Value'
                                                                                                            type={showHeaderFields[headerIndex] ? "text" : "password"}
                                                                                                            IconProp={() => (<Button variant="" className="p-0" onClick={() => toggleShowHeader(headerIndex)}> {showHeaderFields[headerIndex] ? <Eye /> : <EyeOff />} </Button>)}
                                                                                                            tabIndex={getNextTabIndex()}
                                                                                                            name={`${namePath}.value`}
                                                                                                            value={header.value}
                                                                                                            maxLength={255}
                                                                                                            onChange={handleChange}
                                                                                                            onBlur={handleBlur}
                                                                                                        />
                                                                                                    </Col>

                                                                                                    <Col md={1} className="d-flex p-0 mb-2">
                                                                                                        <Button
                                                                                                            variant="outline-danger"
                                                                                                            className="btn-sm rounded-2 border-1 pe-0"
                                                                                                            onClick={() => {
                                                                                                                const currentHeaders = [...values.steps[index].headerData];
                                                                                                                const findInd = currentHeaders.findIndex((f: any) => f.id === header.id);

                                                                                                                if (findInd === -1) return;

                                                                                                                if (header.existFlag === "Y") {
                                                                                                                    currentHeaders[findInd] = { ...currentHeaders[findInd], deleteFlag: "Y" };
                                                                                                                } else {
                                                                                                                    currentHeaders.splice(findInd, 1);
                                                                                                                }
                                                                                                                setFieldValue(`steps[${index}].headerData`, currentHeaders);
                                                                                                            }}
                                                                                                        ><Trash className="me-2" /></Button>
                                                                                                    </Col>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                                </fieldset>}
                                                                        </div>

                                                                        <Col md={12} className="mb-3 mt-2">
                                                                            <TextArea
                                                                                label="Request Payload"
                                                                                placeholder='Enter Request Payload'
                                                                                name={`steps[${index}].reqPayload`}
                                                                                value={step.reqPayload}
                                                                                id="remarks"
                                                                                required
                                                                                tabIndex={getNextTabIndex()}
                                                                                size="small"
                                                                                maxLength={2000}
                                                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                                                    const value = e.target.value;
                                                                                    setFieldValue(`steps[${index}].reqPayload`, value);
                                                                                }}
                                                                                onBlur={() => {
                                                                                    if (servicesDtlData) return;
                                                                                    const payloadText = values.steps[index].reqPayload?.trim();

                                                                                    if (payloadText === "") {
                                                                                        setFieldValue(`steps[${index}].reqData`, [
                                                                                            { type: "", typeLbl: "", label: "", payloadVal: "", minLength: "", maxLength: "", required: false, existFlag: "N", deleteFlag: "N", columnData: [{ val: "", id: 1 }] }
                                                                                        ]);
                                                                                        return;
                                                                                    }

                                                                                    try {
                                                                                        const payload = JSON.parse(payloadText);
                                                                                        if (typeof payload !== "object" || Array.isArray(payload)) {
                                                                                            // toastNotify("Payload must be a valid JSON object", "error");
                                                                                            return;
                                                                                        }
                                                                                        const payloadArray = Object.keys(payload).map((key) => ({
                                                                                            payloadVal: key,
                                                                                        }));

                                                                                        setFieldValue(`steps[${index}].reqData`, payloadArray);
                                                                                    } catch (error) {
                                                                                        // toastNotify("Request Payload must be valid JSON", "error");
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <ErrorMessage name={`steps[${index}].reqPayload`} className="ErrorMessage" component="div" />
                                                                            {!servicesDtlData && <p className="m-0 text-sm ps-1">Keys that are you will insert in payload will automatically set in the payload input. </p>}
                                                                        </Col>

                                                                        {/* API Headers */}
                                                                        < div className="d-flex justify-content-end w-90 mb-0 me-1" >
                                                                            <Button
                                                                                type="button"
                                                                                className="bg-transparent text-primary fw-semibold border-0 text-xs p-0 text-decoration-none"
                                                                                onClick={() => {

                                                                                    const lastPayloadData = step.reqData[step.reqData.length - 1];

                                                                                    if (lastPayloadData?.type === "" || (lastPayloadData?.type !== "P" && lastPayloadData?.label === "") || lastPayloadData?.payloadVal === "") {
                                                                                        toastNotify("Please fill existing payload fields before adding a new one.", "error");
                                                                                        return;
                                                                                    } else if (lastPayloadData?.type === "D" && lastPayloadData.columnData.length === 0) {
                                                                                        toastNotify("Please fill existing payload fields before adding a new one.", "error");
                                                                                        return;
                                                                                    } else if (lastPayloadData?.type === "T" && (lastPayloadData.minLength === "" || lastPayloadData.maxLength === "" || lastPayloadData.maxLength === "0")) {
                                                                                        toastNotify("Please fill existing payload fields before adding a new one.", "error");
                                                                                        return;
                                                                                    }

                                                                                    setFieldValue(`steps[${index}].reqData`, [
                                                                                        ...(step.reqData || []),
                                                                                        {
                                                                                            type: "",
                                                                                            typeLbl: "",
                                                                                            label: "",
                                                                                            payloadVal: "",
                                                                                            minLength: "",
                                                                                            maxLength: "",
                                                                                            required: false,
                                                                                            existFlag: "N",
                                                                                            deleteFlag: "N",
                                                                                            columnData: [
                                                                                                { val: "", id: 1 }
                                                                                            ]
                                                                                        }
                                                                                    ]);
                                                                                }}
                                                                                disabled={step.reqData.length >= 5}>
                                                                                <div className="bg-white text-primary">
                                                                                    <PlusCircle style={{ marginBottom: "3px" }} size={15} /> Add Payload Input
                                                                                </div>
                                                                            </Button>
                                                                        </div>

                                                                        {/* Dynamic Input Component */}
                                                                        <div className="mx-0">
                                                                            <fieldset className="border rounded-3 p-3 mb-3">
                                                                                <legend className="float-none w-auto px-2  mb-0 text-xs fw-medium">Payload <span className="text-primary">Input</span> </legend>
                                                                                {step.reqData.filter((r: any) => r?.deleteFlag !== "Y").map((payloadItem: any, payloadIndex: number) => (
                                                                                    <>
                                                                                        {step.reqData.length > 1 && payloadIndex > 0 && (
                                                                                            <div className="d-flex justify-content-end me-1" key={payloadIndex}>
                                                                                                <Button
                                                                                                    type="button"
                                                                                                    className="bg-transparent text-danger fw-semibold border-0 text-xs p-0 text-decoration-none ms-2 mb-2   "
                                                                                                    onClick={() => {
                                                                                                        if (payloadItem?.existFlag === "Y") {
                                                                                                            const updatedPayload = [...step.reqData];
                                                                                                            updatedPayload[payloadIndex].deleteFlag = "Y"
                                                                                                            setFieldValue(`steps[${index}].reqData`, updatedPayload);
                                                                                                        } else {
                                                                                                            const updatedPayload = [...step.reqData];
                                                                                                            updatedPayload.splice(payloadIndex, 1);
                                                                                                            setFieldValue(`steps[${index}].reqData`, updatedPayload);
                                                                                                        }
                                                                                                    }}>
                                                                                                    Remove
                                                                                                </Button>
                                                                                            </div>)}

                                                                                        <div key={payloadIndex} className="d-flex align-items-start gap-2">
                                                                                            <div className="flex-grow-1">
                                                                                                <DynamicInput
                                                                                                    mainInitialFieldValue={values}
                                                                                                    values={payloadItem}
                                                                                                    handleChange={handleChange}
                                                                                                    handleBlur={handleBlur}
                                                                                                    setFieldValue={(field: string, value: any) => setFieldValue(`steps[${index}].reqData[${payloadIndex}].${field}`, value)}
                                                                                                    setFieldTouched={(field: string, touched: boolean | undefined) => setFieldTouched(`steps[${index}].reqData[${payloadIndex}].${field}`, touched)}
                                                                                                    nameIndex={`steps[${index}].reqData[${payloadIndex}]`}
                                                                                                    totalSteps={values.steps.length}
                                                                                                    stepIndex={index}
                                                                                                    payloadIndex={payloadIndex}
                                                                                                    tabIndex={getNextTabIndex}
                                                                                                />
                                                                                            </div>
                                                                                        </div >
                                                                                    </>
                                                                                ))}
                                                                            </fieldset>
                                                                        </div>

                                                                        {/* Response payload */}
                                                                        <div className="flex-grow-1">
                                                                            <h6 className="text-sm ps-2 fw-semibold">Response <span className="text-primary">Config</span> </h6>
                                                                            <ServiceResponseMdl
                                                                                flag="S"
                                                                                setFieldValue={setFieldValue}
                                                                                apiResponseFlag={values.steps[index]?.apiResponseFlag}
                                                                                index={index}
                                                                                values={values}
                                                                                setFieldTouched={setFieldTouched}
                                                                                tabIndex={getNextTabIndex}
                                                                            />
                                                                            <ServiceResponseMdl
                                                                                flag="F"
                                                                                setFieldValue={setFieldValue}
                                                                                apiResponseFlag={values.steps[index]?.apiResponseFlag}
                                                                                index={index}
                                                                                values={values}
                                                                                setFieldTouched={setFieldTouched}
                                                                                tabIndex={getNextTabIndex}
                                                                            />
                                                                            <ServiceResponseMdl
                                                                                flag="E"
                                                                                setFieldValue={setFieldValue}
                                                                                apiResponseFlag={values.steps[index]?.apiResponseFlag}
                                                                                index={index}
                                                                                values={values}
                                                                                setFieldTouched={setFieldTouched}
                                                                                tabIndex={getNextTabIndex}
                                                                            />
                                                                        </div>

                                                                        <div>
                                                                            <Col md={6} className="pt-2 mb-3">
                                                                                <Checkbox
                                                                                    name={`steps[${index}].confirmFlag`}
                                                                                    label="Step Confirmation"
                                                                                    id={`steps[${index}].confirmFlag`}
                                                                                    checked={values.steps[index]?.confirmFlag === "Y"}
                                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                        setFieldValue(`steps[${index}].confirmFlag`, e.target.checked ? "Y" : "N");
                                                                                    }}
                                                                                />
                                                                            </Col>

                                                                        </div>

                                                                        {values.steps[index]?.confirmFlag === "Y" && (
                                                                            <Col md={12} className="mb-3">
                                                                                <TextArea
                                                                                    label="Confirmation Message"
                                                                                    placeholder='Enter Confirmation Message'

                                                                                    name={`steps[${index}].confirmMsg`}
                                                                                    value={step.confirmMsg}
                                                                                    required
                                                                                    size="small"
                                                                                    maxLength={300}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                />
                                                                                <ErrorMessage name={`steps[${index}].confirmMsg`} className="ErrorMessage" component="div" />
                                                                            </Col>
                                                                        )}


                                                                    </Row>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        ))}
                                                    </Accordion>

                                                    <div className="p-3">
                                                        <p className="text-sm text-success"><span>Select ticket template for the auto ticket generation,</span> If you execute the service directly than ticket will automatically generate.</p>
                                                        <Col md={4} className="mb-3">
                                                            <SelectField
                                                                name="ticketTmpValue"
                                                                label="Ticket Template"
                                                                placeholder="Select Ticket Template"
                                                                options={[{ value: "", label: "Select Template" }, ...getTemplateDropdownData.map((item: any) => ({ value: item.TranCode, label: item.TemplateName, })),]}
                                                                value={
                                                                    getTemplateDropdownData.find((item: any) => item.TranCode === values.ticketTmpValue) ? {
                                                                        value: values.ticketTmpValue,
                                                                        label: getTemplateDropdownData.find((item: any) => item.TranCode === values.ticketTmpValue)?.TemplateName || "",
                                                                    } : null}
                                                                onChange={(option: any) => {
                                                                    setFieldValue("ticketTmpValue", option?.value || "");
                                                                    setFieldValue("ticketTmpLabel", option?.label || "");
                                                                }}
                                                                onBlur={() => setFieldTouched('ticketTmpValue', true)}
                                                            />
                                                            <ErrorMessage name="ticketTmpValue" className="ErrorMessage" component="div" />
                                                        </Col>
                                                    </div>
                                                </div>
                                            </Row>
                                        </Col>

                                        <Col xs={12} sm={12} md={4} lg={4}>
                                            <div className="p-3 border rounded" style={{ position: "sticky", maxHeight: "calc(100vh - 195px)", overflowY: "auto" }}>
                                                <h6 className=" text-sm ps-1">Instructions</h6>
                                                <Row className="mt-2 note-section bg-primary-50 rounded px-3 pt-3 pb-0 mx-1">
                                                    {(values.steps.length > 1 ? Instruction2 : Instruction).map((ins, idx) => (
                                                        <div key={idx} className="d-flex">
                                                            <Col xs={1}><Info className="mt-1" size={14} /></Col>
                                                            <Col xs={11}><p className="text-xs">{ins.apiNm}</p></Col>
                                                        </div>
                                                    ))}
                                                </Row>
                                            </div>

                                            {/* <div className="d-flex justify-content-end gap-2 position-absolute bottom-0 end-0 mt-4 p-4">
                                                <CustomButton text="Close" variant="light" icon={CgCloseO} onClick={() => { handleClose(); setServicesDtlData([]); }} />
                                                <CustomButton type='submit' icon={!isLoader ? BiCheckCircle : <BiLoader className='icon-loader text-white text-lg' />} text={!isLoader ? `${servicesDtlData ? "Update" : "Submit"}` : "Loading..."} disabled={isLoader} />
                                            </div> */}
                                        </Col>
                                    </Row >

                                </Form >
                            </>
                        )
                    }
                    }
                </Formik>
            </Offcanvas.Body >
        </Offcanvas >
    );
};

export default ServiceCreateMdl;
