// // Purpose: Application Sidebar
// // Created by: Harish
// // Created Date: 21-05-2026
// // Description: This is application common sidebar show with layout after login.

// // Change history:
// //***********************/

// // sidebar submenu items code collapse
// import React from "react";
// import { Collapse } from "react-collapse";
// import { NavLink, useLocation } from "react-router-dom";

// interface SubMenuItem {
//   childtitle: string;
//   childlink: string;
//   childicon: string;
//   multi_menu?: boolean;
// }

// interface SubmenuProps {
//   activeSubmenu: number | null;
//   item?: any;
//   i: number;
//   isMenuBar: boolean;
//   collapsed: boolean;
//   isHovered: boolean;
// }

// const Sidebar: React.FC<SubmenuProps> = ({ activeSubmenu, item, i, collapsed, isHovered }) => {
//   const { pathname } = useLocation();
//   const shouldOpen = activeSubmenu === i && (!collapsed || isHovered);

//   return (
//     <Collapse isOpened={shouldOpen}>
//       <ul className="sub-menu ms-3 p-0 solid-line bg-white">
//         {item?.child?.filter((items: any) => items.isShow).map((subItem: SubMenuItem, j: number) => {
//           const childPath = subItem.childlink.startsWith('/') ? subItem.childlink : `/${subItem.childlink}`;

//           // Check if pathname matches exactly or starts with childPath followed by a slash
//           const isCurrent = pathname === childPath ||
//             pathname.startsWith(childPath + '/');

//           return (
//             <li key={j} className="ms-4  py-2 width-max-content">
//               <NavLink to={childPath}>
//                 <div className={`d-flex align-items-center gap-2 text-xs fw-medium ${isCurrent ? "fw-semibold text-white" : "text-muted"}`}>
//                   <span style={{ fontSize: "11px" }}>{subItem.childtitle}</span>
//                 </div>
//               </NavLink>
//             </li>
//           );
//         })}
//       </ul>
//     </Collapse>
//   );
// };

// export default Sidebar;


// Purpose: Application Sidebar - Submenu Component
// Created by: Harish
// Updated: 22-05-2026
// Description: Animated sidebar submenu with React Bootstrap and custom CSS

import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface SubMenuItem {
  childtitle: string;
  childlink: string;
  childicon?: string;
  multi_menu?: boolean;
}

interface SubmenuProps {
  activeSubmenu: number | null;
  item?: any;
  i: number;
  isMenuBar?: boolean;
  collapsed: boolean;
  isHovered: boolean;
}

/* ── Smooth height animation hook ─────── */
function useCollapseAnimation(isOpen: boolean) {
  const ref = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<string | number>(isOpen ? "auto" : 0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isOpen) {
      const scrollH = el.scrollHeight;
      setHeight(scrollH);
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setHeight("auto");
        setIsAnimating(false);
      }, 340);
      return () => clearTimeout(timer);
    } else {
      if (height === "auto") {
        const scrollH = el.scrollHeight;
        setHeight(scrollH);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeight(0);
            setIsAnimating(true);
          });
        });
      } else {
        setHeight(0);
        setIsAnimating(true);
      }
      const timer = setTimeout(() => setIsAnimating(false), 340);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return { ref, height, isAnimating };
}

/* ── Sidebar Submenu ─ */
const Sidebar: React.FC<SubmenuProps> = ({ activeSubmenu, item, i, collapsed, isHovered, }) => {
  const { pathname } = useLocation();
  const shouldOpen = activeSubmenu === i && (!collapsed || isHovered);

  const { ref, height } = useCollapseAnimation(shouldOpen);

  const children: SubMenuItem[] = item?.child?.filter((c: any) => c.isShow) ?? [];

  return (
    <>
      {/* Height-animated wrapper */}
      <div className="sb-submenu-wrap mb-2" style={{ height: typeof height === "number" ? `${height}px` : height }} aria-hidden={!shouldOpen} >
        <ul ref={ref} className="sb-submenu">
          {children.map((subItem: SubMenuItem, j: number) => {
            const childPath = subItem.childlink.startsWith("/") ? subItem.childlink : `/${subItem.childlink}`;
            const isCurrent = pathname === childPath || pathname.startsWith(childPath + "/");
            return (
              <li key={j} className={` sb-item${isCurrent ? " sb-item--active" : ""}`}>
                <NavLink to={childPath} className={`sb-link${isCurrent ? " sb-link--active" : ""}`} >
                  {/* Optional icon */}
                  {subItem.childicon && (
                    <i className={`${subItem.childicon} sb-link-icon`} aria-hidden="true" />
                  )}
                  <span>{subItem.childtitle}</span>
                  {/* Active indicator pill */}
                  {/* {isCurrent && (
                    <span className="sb-badge ms-auto">active</span>
                  )} */}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;