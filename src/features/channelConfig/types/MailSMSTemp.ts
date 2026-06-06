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
