import { CalendarClock, Globe, Key, Lock } from "lucide-react";


export interface mailsmstemplate {
    templateNm: string;
    mailStatus: boolean;
    smsStatus: boolean;
    mailDescription: string;
    smsDescription: string;
    createBy: string;
    createDt: string;
    updateBy: string | null;
    updateDt: string | null;
    subject: string;
}


export interface productServiceListProps {
    ServiceNm: string,
    Icon: string,
    Description: string,
    ServiceCode: string,
    ServiceEnv: string
}

export interface serviceParameterListProps {
    ParaCode: string,
    ParaName: string,
    ParaDesc: string,
    ParaType: string,
    MaxValue: number,
    ParaValue?: string,
    DefaultValue: string | null,
    ComboValue: string | null,
    UatValue: string | null,
    LiveValue: string | null,
}

export interface servicePamaterGroupProps {
    SubGroup: string,
    SubGroupIcon: string,
    BankEnvStatus: string,
    Data: serviceParameterListProps[]
}

// Variant color mapping
export const variantMap: Record<string, string> = {
    ADSD: 'blue',
    BASE: 'green',
    ITR: 'yellow',
    MNDT: 'purple',
    SPNM: 'red',
};

// Icon mapping
export const iconMap: Record<string, string> = {
    ADSD: 'ShieldCheck',
    BASE: 'CheckCircle2',
    ITR: 'FileCheck',
    MNDT: 'Zap',
    SPNM: 'FileText',
};

interface ChecklistItem {
    icon: any;
    title: string;
    description: string;
    color: string;
}

export const checklistItems: ChecklistItem[] = [
    {
        icon: Key,
        title: 'Public Keys',
        description: 'Verify public key configuration and validity',
        color: '#3b82f6'
    },
    {
        icon: Lock,
        title: 'Private Keys',
        description: 'Check private key security and accessibility',
        color: '#a855f7'
    },
    {
        icon: Globe,
        title: 'API Tests',
        description: 'Test API connectivity and response times',
        color: '#10b981'
    },
    {
        icon: CalendarClock,
        title: 'Expiry Checks',
        description: 'Validate certificate and token expiration dates',
        color: '#f59e0b'
    },
    // {
    //     icon: Database,
    //     title: 'Database Config',
    //     description: 'Verify database connections and configurations',
    //     color: '#ec4899'
    // },
    // {
    //     icon: Settings,
    //     title: 'Service Config',
    //     description: 'Check service parameters and settings',
    //     color: '#8b5cf6'
    // }
];


export interface ApiConfigDataProps {
    ServiceDesc: string,
    ServiceNm: string,
    ServiceIcon: string,
    tranCd: string,
    ServiceStatus: true,
    ServiceType: string,
    Steps: [
        {
            StepCode: number,
            ApiResponseCheck: string,
            ApiUrl: string,
            ApiAuthType: string,
            AuthUserNm: string,
            AuthUserPass: string,
            AuthValue: null,
            ReqContentType: string,
            ReqPayload: string,
            isFinalStep: string,
            ReqType: string,
            ResponseBody: string,
            ResponseContentType: string,
            StepNm: string,
            ExistFlag: string,
            FinalStepStatus: string,
            HeaderData: [],
            SuccessData: [
                {
                    LineCd: number,
                    RespKey: string,
                    DataType: string,
                    RespValue: string,
                    ExistFlag: string
                }
            ],
            FailedData: [
                {
                    LineCd: number,
                    RespKey: string,
                    DataType: string,
                    RespValue: string,
                    ExistFlag: string
                }
            ],
            StatusMapData: [],
            RespKeyMapData: []
        },
        {
            StepCode: number,
            ApiResponseCheck: string,
            ApiUrl: string,
            ApiAuthType: string,
            AuthUserNm: string,
            AuthUserPass: string,
            AuthValue: string,
            ReqContentType: string,
            ReqPayload: string,
            ReqType: string,
            ResponseBody: string,
            ResponseContentType: string,
            StepNm: string,
            ExistFlag: string,
            FinalStepStatus: string,
            HeaderData: [],
            SuccessData: [],
            FailedData: [],
            StatusMapData: [],
            RespKeyMapData: []
        }
    ]


}


export interface KeywordType {
    key: string,
    description: string
}

export interface validateCertificateProps {
    IssuedTo: string,
    IssuedBy: string,
    ValidFrom: string,
    ValidTo: string,
    SerialNumber: string,
    SerialNo: string,
    SignatureAlg: string | null,
    ExpiredStatus: boolean
}

export interface apiConfigListProps {
    serviceNm: string,
    stepCount: number,
    serviceType: string,
    serviceDesc: string,
    serviceIcon: string,
    tranCd: 1
}

export interface SMTPConfigListProps {
    "insertBy": string,
    "insertDt": string,
    "insertMachineNm": string,
    "insertIP": string,
    "modifyBy": string | null,
    "modifyDt": string | null,
    "modifyMachineNm": string | null,
    "modifyIP": string | null,
    "tranCode": number,
    "description": string,
    "host": string,
    "port": number,
    "pass": string,
    "fromId": string,
    "fromName": string,
    "tls": boolean,
    "status": boolean
}

export interface servicelistProps {
    serviceNm: string,
    stepCount: number,
    serviceType: string,
    serviceDesc: string,
    serviceIcon: string,
    tranCd: number,
    tranDate: string,
    serviceStatus: boolean
}


export interface serviceStepProps {
    id: number,
    StepName: string,
    existFlag: string,
    deleteFlag: string,
    stepName: string,
    apiUrl: string,
    srCode: number,
    serviceCode: string,
    reqType: string,
    contentType: string,
    responseType: string,
    authType: string,
    username: string,
    password: string,
    authValue: string,
    reqPayload: string,
    respPayload: string,
    apiResponseFlag: string,
    isFinalStep: string,
    responseKeywordMappingData: [],
    successData: [],
    failedData: [],
    headerData: []
}

export interface ResponseKeywordItem {
    rawKey: string;
    replaceKey: string;
};