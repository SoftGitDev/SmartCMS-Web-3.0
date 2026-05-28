// Purpose: Application Sidebar Layout
// Created by: Prateek
// Created Date: 30-08-2025
// Description: Common application layout for sidebar, header, and content display.

// Change history:
//********************************************************/

import React, { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import SidebarItems from "./Sidebar/SidebarItems";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);


  // Handle window resize to adjust layout behavior
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      // Automatically collapse sidebar on small screens
      if (currentWidth <= 875) {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 875;
  const sidebarWidth = isMobile ? 0 : collapsed ? 57 : 210;

  return (
    <div>
      {/* Header Component */}
      <Header collapsed={collapsed} setCollapsed={setCollapsed} width={width} isMobile={isMobile} setMobileSidebarOpen={setMobileSidebarOpen} />
      <div style={{ marginTop: "60px" }} className="d-flex">
        {/* Sidebar */}
        <div style={{ width: `${sidebarWidth}px`, transition: "width 0.3s ease", opacity: isMobile && !mobileSidebarOpen ? 0 : 1 }}>
          <SidebarItems collapsed={collapsed} mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} isMobile={isMobile} />
        </div>
        {/* Main Content */}
        <div className="Screens-Container position-relative flex-grow-1 overflow-auto overflow-x-hidden bg-light" style={{ width: `calc(100vw - ${sidebarWidth}px)`, height: "calc(-94px + 100vh)" }}>
          <div className="position-relative flex-grow-1 h-100">
            {/* Dynamic routed page content */}
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
