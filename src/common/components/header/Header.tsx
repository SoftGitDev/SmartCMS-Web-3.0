/************************************************************
// Purpose       : Application Header
// Created by    : Harish 
// Created Date  : 01-01-2026
// Description   : This is application common header show with layout after login.
//

************************************************************/

import { useState } from "react";
import { Navbar, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import Profile from "./Profile";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, LogOutIcon } from "lucide-react";
import { getUserData } from "../../../services/storage/common";
import { sessionStoreData } from "../../../services/storage/Helper";


type HeaderProps = {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  collapsed: boolean;
  isMobile: boolean;
  setMobileSidebarOpen: (val: boolean) => void;
};

const Header = ({ collapsed, setCollapsed, isMobile, setMobileSidebarOpen, }: HeaderProps) => {
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const headreWidth = isMobile ? 0 : collapsed ? 65 : 210;
  const userData = getUserData();

  const handleSidebarToggle = () => {
    isMobile ? setMobileSidebarOpen(true) : setCollapsed(!collapsed);
  };

  const handleLoginOnMain = () => {
    const updateClient = {
      ...userData,
      reqClientCd: userData?.clientCd,
      reqUserCd: userData?.userCd,
      reqbalance: userData?.balance,
      reqclientNm: userData?.clientNm,
      reqUserNm: userData?.userNm,
      reqClientId: userData?.clientId,
      reqpersonNm: userData?.personNm,
      reqlastLogin: userData?.lastLogin,
      isMobileAppAccess: null,
      isLoginAsClient: false,
      isSMTPFlag: userData?.smtpSourceType,
      isSMSConfigFlag: userData?.smsSourceType,
    };
    sessionStoreData(updateClient);
    window.location.reload();
  }

  const clientData = JSON.parse(
    sessionStorage.getItem("_client_data_") || "{}"
  );


  return (
    <>
      {/* === Fixed/Sticky Header === */}
      <Navbar
        expand="md"
        className="position-fixed top-0 start-3 end-0 bg-white border-bottom py-2 px-3"
        style={{ zIndex: 1, height: "60px", width: `calc(100vw - ${headreWidth}px)` }}
      >
        <Container fluid className="p-0 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">

            {/* Animated Sidebar Toggle */}
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="toggleicon rounded-circle p-2 bg-light d-flex align-items-center justify-content-center"
              style={{ cursor: "pointer" }}
              onClick={handleSidebarToggle}
            >
              <ChevronRight width="16" height="16" />
            </motion.div>

            <div className="my-1">
              <h6 className="mb-0 fw-bold text-base text-primary">{userData?.bankCode || (clientData?.reqClientCd || '1000')}-{userData?.bank?.bankName || (clientData?.reqclientNm || 'SOFTE_TECH ')}</h6>
              <p className="mb-0 text-dark text-sm fw-semibold">Hello..! , {userData?.personName?.toUpperCase() || (clientData?.reqUserNm || 'Abhishek ')} | Last Login : {userData?.lastLoginDt || '21-05-2026'}</p>
            </div>

          </div>

          {/* === Right Section === */}
          <div className="d-flex align-items-center gap-2">

            {/* Notification Bell with animation */}
            <AnimatePresence mode="popLayout">
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* <NotificationDropdown /> */}

              </motion.div>
            </AnimatePresence>

            {clientData?.isLoginAsClient &&
              <>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 100, hide: 100 }}
                  overlay={<Tooltip id="button-tooltip">
                    Logout From Client
                  </Tooltip>}
                >
                  <div className="notification-icon rounded-circle position-relative" onClick={handleLoginOnMain}>
                    <LogOutIcon />
                  </div>
                </OverlayTrigger>
              </>
            }

            {/* Profile Section with dropdown toggle */}
            <motion.div
              onClick={() => setIsProfile(!isProfile)}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center gap-2"
            >

              <div className="bg-primary-50 rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", color: 'var(--primaryColor)', fontSize: 22 }} >
                {userData?.userId?.slice(0, 1)?.toUpperCase() || ((clientData?.reqUserNm || 'Abhishek ')?.slice(0, 1)?.toUpperCase())}
              </div>

              <div className="d-none d-md-block">
                <span className="text-sm">{userData?.userId || (clientData?.reqUserNm || 'Abhishek ')}</span>
                <p className="mb-0 text-xs text-muted">{(userData?.parentRole === "S" && "Super Admin") || (userData?.parentRole === "A" && "Admin") || (userData?.parentRole === "U" && "User")} Admin</p>
              </div>

              <motion.div
                animate={{ rotate: isProfile ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown />
              </motion.div>
            </motion.div>
          </div>
        </Container >
      </Navbar >


      {isProfile && (
        <Profile isProfile={isProfile} setIsProfile={setIsProfile} />
      )}

    </>
  );
};

export default Header;
