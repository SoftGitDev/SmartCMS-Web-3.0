import { LucideIcon } from "lucide-react";
export interface tableColumnProps {
  field: string;
  header: string;
  sorting?: boolean;
  align?: string;
  width?: string | number;
  isShow?: string;
}

export type AnimationType =
  | "slide-up"
  | "fade-in"
  | "slide-down"
  | "zoom-in"
  | "slide-left"
  | "slide-right"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-out";

export interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  duration?: string;
  animation?: AnimationType;
}

export interface menusProps {
    title?: string,
    icon?: LucideIcon,
    link?: string,
    isShow?: boolean,
    child?: childMenusProps[]
}

export interface childMenusProps {
    childtitle: string,
    childlink: string,
    childicon: LucideIcon,
    isShow: boolean,
} 


export interface roleProps {
  insertBy: string;
  insertDt: string;
  insertMachineNm: string;
  insertIP: string;
  modifyBy: string;
  modifyDt: string;
  modifyMachineNm: string;
  modifyIP: string;
  bankCode: string;
  bankName: string;
  roleId: string;
  roleName: string;
  roleType: string;
}

export type MasterDriveTblType = {
  id:number
  name: string;                          // file name with extension
  status: string;
  modified: string;                      // "YYYY-MM-DD"
  size: string;                          // human-readable e.g. "2.4 MB"
  tags: string[];                        // array of label strings
  action: string;   // drives action button rendering
  type:string;
  level:number;
};

export interface StatCard {
    label: string;
    count: number;
    pct: number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    countColor: string;
    pillBg: string;
    pillColor: string;
    dotColor: string;
    barColor: string;
    pillText: string;
    trend: string;
}