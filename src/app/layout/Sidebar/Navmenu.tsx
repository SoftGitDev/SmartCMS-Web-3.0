// Purpose: Application Navmenu
// Created by: Prateek
// Created Date: 27-07-2025
// Description: This is application common sidebar show with layout after login.

// Change history:
//***********************/

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
// import { menusProps } from "../../types/type";
import { SweetAlerts } from "../../utils/sweetAlert";
import { useLayout } from "../../provider/layout";
import SelectField from "../../components/ui/SelectBox/SelectField";
import companyLogo from '../../assets/images/Company_logo.png'
const packageJson = require("../../../../package.json");

// Props passed to Navmenu
interface NavmenuProps {
  menus: any[];
  collapsed: boolean;
  isHovered: boolean;
  mobileOpen: boolean;
}

const handleNoAccess = (e: React.MouseEvent) => {
  e.preventDefault();
  SweetAlerts("Permission Not Granted", "You do not have access to this module.", "warning");
};

const Navmenu: React.FC<NavmenuProps> = ({ menus, collapsed, isHovered, mobileOpen }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const { pathname } = useLocation();
  const { bankLogoDetails, selectedProduct, setSelectedProduct } = useLayout();

  // const productCombo = [
  //   { value: "N", label: "NCRP" },
  //   { value: "M", label: "MNRL" },
  //   { value: "F", label: "FRI" },
  // ]

  // Version
  const currentVersion = packageJson.version;

  // Normalize pathname - remove leading slash
  const normalizedPathname = pathname.replace(/^\//, "");
  const pathSegment = pathname.split("/")[1];

  // Handle submenu toggle (open/close)
  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(prev => (prev === index ? null : index));
  };

  // Auto-expand submenu on page load based on current URL 
  useEffect(() => {
    const matchedIndex = menus.findIndex(item => {
      if (!item.child) return false;

      return item.child.some((ci: any) => {
        // Normalize child link by ensuring it starts with /
        const childPath = ci.childlink.startsWith('/') ? ci.childlink : `/${ci.childlink}`;
        return pathname.startsWith(childPath);
      });
    });

    if (matchedIndex !== -1) {
      setActiveSubmenu(matchedIndex);
    }
  }, [pathname, menus]);


  useEffect(() => {
    if (collapsed && !isHovered) {
      setActiveSubmenu(null);
    }
  }, [collapsed, isHovered]);


  return (
    <>
      <div className="mt-3 pb-3 d-flex align-items-center gap-2 border-bottom">

        {!collapsed &&
          <div>
            {/* {bankLogoDetails?.mainLogo ? (
              <img
                src={bankLogoDetails?.mainLogo}
                alt="Bank Logo"
                className="img-fluid"
                style={{ maxHeight: bankLogoDetails?.mainLogoHeight, width: bankLogoDetails?.mainLogoWidth }}
              />
            ) : (
              <>
                <div className="d-flex gap-2">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{ width: "34px", height: "34px", fontSize: "14px" }}>C
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-md text-white">CRM</h6>
                    <p className="text-white mb-0 text-xs">Compliance management system</p>
                  </div>
                </div>
              </>
            )} */}
            <img
              src={companyLogo}
              alt="Bank Logo"
              className="img-fluid d-flex"
              style={{ height: 25, width: 'auto' }}
            // style={{ maxHeight: bankLogoDetails?.mainLogoHeight, width: bankLogoDetails?.mainLogoWidth }}
            />
          </div>
        }
      </div>

      {/* === MENU LIST === */}
      <ul className="mt-3 h-95 p-0">

        {menus.filter((items: any) => items.isShow).map((item, i) => {
          const isActive = activeSubmenu === i;

          // Normalize item.link - remove leading slash if present
          const normalizedLink = item.link ? item.link.replace(/^\//, "") : "";

          // Check if current route matches this menu item
          const isCurrent = normalizedPathname === normalizedLink ||
            pathSegment === normalizedLink;

          const Icon = item?.icon;

          const isNoAccess = item.link === "/not-access";

          return (
            <li key={i} className={`single-sidebar-menu ${item.child ? "item-has-children" : ""} ${isActive ? "open" : ""} ${isCurrent ? "menu-item-active" : ""}`}>
              {/* === SINGLE LINK (NO CHILDREN) === */}
              {!item.child && item.link && (
                <>
                  {isNoAccess ? (
                    // 3. Render a clickable Div instead of NavLink for No Access items
                    <div className="menu-link cursor-pointer" onClick={handleNoAccess}>
                      {Icon && <span className="menu-icon me-2 pe-2"> <Icon size={16} /></span>}
                      {(!collapsed || isHovered) && (<span className="menu-text text-white fw-medium">{item.title}</span>)}
                    </div>
                  ) : (
                    // Normal NavLink for valid routes
                    <NavLink className="menu-link" to={item.link}>
                      {Icon && <span className="menu-icon me-2 pe-2"> <Icon size={16} /></span>}
                      {(!collapsed || isHovered) && (<span className="menu-text text-white fw-medium">{item.title}</span>)}
                    </NavLink>
                  )}
                </>
              )}

              {/* === DROPDOWN MENU PARENT === */}
              {item.child && (
                <div
                  className={`menu-link d-flex justify-content-between align-items-center px-2 ps-1 py-2 cursor-pointer ${isActive ? "parent_active not-collapsed background-light" : "collapsed"} `}
                  onClick={() => toggleSubmenu(i)}
                >
                  {/* Icon + Title */}
                  <div className="d-flex align-items-center gap-2 px-1">
                    {Icon && <span className="menu-icon m-0 pe-2"> <Icon width="18" height="18" /></span>}
                    {(!collapsed || isHovered) && (
                      <div className="menu-text fw-medium">{item.title}</div>
                    )}
                  </div>

                  {/* Arrow icon */}
                  {(!collapsed || isHovered) && (
                    <div className={`menu-arrow d-flex align-items-center justify-content-center rounded-circle transition-transform ${activeSubmenu === i ? "rotate-icon" : ""}`}>
                      <ChevronDown size={12} />
                    </div>
                  )}
                </div>
              )}

              {/* === SUBMENU SECTION === */}
              <Sidebar activeSubmenu={activeSubmenu} item={item} i={i} collapsed={collapsed} isHovered={isHovered} isMenuBar={false} />
            </li>
          );
        })}
      </ul>

      {/* Version */}
      <div className="d-flex justify-content-end mb-2">
        <p className="text-white mb-0 text-xs">Version : {currentVersion} </p>
      </div>
    </>
  );
};

export default Navmenu;