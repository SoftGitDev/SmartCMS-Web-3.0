import React, { ReactNode, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getToken, getUserData } from '../../services/storage/common';
import { menuItems } from '../../common/components/Sidebar/menus';


interface privateRouteProps {
    children: ReactNode
}

const PrivateRoute: React.FC<privateRouteProps> = ({ children }) => {
    const userData = getUserData();
    const token = getToken();
    const location = useLocation();

    const commonPaths = ["/profile", "/changepwd", "/dashboard"];

    const allowedPaths = useMemo(() => {
        const paths: string[] = [...commonPaths];
        const menus = menuItems(userData);

        menus.forEach((menu: any) => {
            if (menu.isShow) {
                if (menu.link) paths.push(menu.link);
                menu.child?.forEach((sub: any) => {
                    if (sub.isShow && sub.childlink) {
                        paths.push(sub.childlink);
                    }
                });
            }
        });

        if (userData?.parentRole === "S") {
            paths.push("/debug-log");
        }

        return paths;
    }, [userData, commonPaths]);


    if (userData?.loginFlag !== "Y" || !token) {
        document.title = "Softtech NCRP - National Crime Report Portal";
        return <Navigate to='/' replace />;
    }

    const currentPath = "/" + location.pathname.split("/")[1];
    const isAuthorized = allowedPaths.some(path =>
        path === currentPath || (path !== "/" && location.pathname.startsWith(path))
    );


    if (!isAuthorized) {
        return <Navigate to="*" replace />;
    }

    document.title = `Softtech NCRP - National Crime Report Portal | User: ${userData?.userId} | Last Login: ${userData?.LastLoginDt}`;

    return <>{children}</>;
}

export default PrivateRoute;