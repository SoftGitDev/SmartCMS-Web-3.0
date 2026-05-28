/************************************************************
// Purpose       : Application Header
// Created by    : Yogesh 
// Created Date  : 01-01-2026
// Description   : This is application common header show with layout after login.
//
// Change history:
// 01-01-2026 | Yogesh | Write Comments 
// 01-01-2026 | Yogesh | Added framer-motion animations for sidebar toggle, notification & profile dropdown
// 28-01-2026 | Yogesh | Add Login user information with bank.
************************************************************/

import { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import Profile from "./Profile";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getUserData } from "../../utils/common";

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
              <h6 className="mb-0 fw-bold text-base text-primary">{userData?.bankCode || 1001}-{userData?.bank?.bankName || 'Soft Tech'}</h6>
              <p className="mb-0 text-dark text-sm fw-semibold">Hello..! , {userData?.personName?.toUpperCase() || 'Harish Suthar'} | Last Login : {userData?.lastLoginDt || '21-05-2026'}</p>
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

            {/* Profile Section with dropdown toggle */}
            <motion.div
              onClick={() => setIsProfile(!isProfile)}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center gap-2"
            >

              <div
                className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                // style={{ width: "40px", height: "40px", color: '#4880ff', fontSize: 22 }}
                style={{ width: "40px", height: "40px", color: 'rgb(var(--primaryColor))', fontSize: 22 }}
              >
                {userData?.userId?.slice(0, 1)?.toUpperCase() || 'H'}
              </div>

              <div className="d-none d-md-block">
                <span className="text-sm">{userData?.userId || 'Harish Suthar'}</span>
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
