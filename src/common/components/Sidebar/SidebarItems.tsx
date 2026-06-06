import React, { useState } from "react";
import { menuItems } from "./menus";
import Navmenu from "./Navmenu";
import { getUserData } from "../../../services/storage/common";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
  isMobile: boolean;
};

const SidebarItems: React.FC<SidebarProps> = ({ collapsed, isMobile, mobileOpen, setMobileOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const userData = getUserData();

  return (
    <>
      <div style={{ left: isMobile && !mobileOpen ? "-250px" : "0", }}
        className={`sidebar-wrapper sidebar-bg-img ${isMobile ? `${mobileOpen && isHovered ? "d-block" : "d-none"}` : `${collapsed ? "closed" : ""}`}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { collapsed && setIsHovered(false); isMobile && setMobileOpen(false) }} >
        <Navmenu menus={menuItems(userData)} collapsed={collapsed} isHovered={isHovered} mobileOpen={mobileOpen} />
      </div>
    </>
  );
};
export default SidebarItems;
