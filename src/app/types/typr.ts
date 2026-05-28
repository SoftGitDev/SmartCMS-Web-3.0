export interface tableColumnProps {
  field: string;
  header: string;
  sorting?: boolean;
  align?: string;
  width?: string | number;
  isShow?: string;
}

// Branch Props
export interface branchPropsType {
  branchCode: string;
  branchName: string;
  branchType: string;
  mobileNo: string;
  address: string;
  status: boolean;
  emailId: string;
}

// User props
export interface userPropsType {
  username: string;
  personName: string;
  mobileNo: string;
  emailId: string;
  roleNm: string;
  lastUpdate: string;
  status: boolean;
  unlock: boolean;
}
