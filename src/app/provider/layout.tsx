import React, {
  createContext,
  ReactNode,
  useContext,
  JSX,
  useState,
  useCallback,
  useEffect
} from "react";
import * as LucideIcons from 'lucide-react';
import { bankLogoProps } from "../types/bank";
import { apiRequest } from "../utils/apiRequest";
import toastNotify from "../utils/tostNotify";
import * as urls from '../utils/url';


interface layoutProvideProps {
  children: ReactNode;
}

export interface layoutContextValProps {
  getIconComponent: (icon: string) => JSX.Element,
  setupData: any,
  setSetupData: React.Dispatch<React.SetStateAction<any>>,
  setBankLogoDetails: React.Dispatch<React.SetStateAction<bankLogoProps>>,
  bankLogoDetails: bankLogoProps;
  selectedProduct: string | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string | null>>;
}

export const LayoutContext = createContext<layoutContextValProps | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutContext.Provider");
  }
  return context;
};


export const LayoutProvide: React.FC<layoutProvideProps> = ({ children }) => {

  const [setupData, setSetupData] = useState<any>(null); // STATE USED FOR GETTING ONBOARDING DATA
  const [bankLogoDetails, setBankLogoDetails] = useState<any>(null); // STATE USED FOR STORING Organization Logo DETAILS
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);


  // FUNCTION USED FOR GETTING Organization Logo AT LOGIN TIME
  const getSetupDetail = useCallback(async () => {
    try {
      const result = await apiRequest("POST", urls.authLogoDetails, {});
      if (result.status === "200" && result.success) {
        setBankLogoDetails(result.response)

      } else {
        if (result.message !== "No data found") {
          toastNotify(result?.message || "Failed to load setup details", "error");
        }
      }
    } catch (err) {
      console.error("Error fetching setup details:", err);
      toastNotify("Failed to load data", "error");
    } finally {
    }
  }, [])

  // INTIALLY CALLS API WHEN COMPONENT RENDER
  // useEffect(() => {
  //   getSetupDetail()
  // }, [])

  // THIS FUNCTION IS USED FOR GETTING DYNAMIC ICON RENDER
  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon size={20} /> : <LucideIcons.FileQuestion size={20} />;
  };


  const contextVal: layoutContextValProps = {
    getIconComponent,
    setupData,
    setSetupData,
    bankLogoDetails,
    setBankLogoDetails,
    selectedProduct,
    setSelectedProduct
  };


  return (
    <LayoutContext.Provider value={contextVal}>
      {children}
    </LayoutContext.Provider>
  );
};
