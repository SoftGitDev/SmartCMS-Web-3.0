import React, { ReactNode } from 'react';
import { useLayout } from '../../../app/providers/layout';

interface sideMenuProps {
    menus: any;
    activeTab: any;
    setActiveTab: React.Dispatch<React.SetStateAction<any>>;
    tabHasError?: (tabLink: string, errors: Record<string, any>) => boolean;
    extraChild?: ReactNode;
    errors?: any
}

const SideMenu: React.FC<sideMenuProps> = ({ menus, activeTab, setActiveTab, tabHasError, extraChild, errors }) => {

    const { getIconComponent } = useLayout();

    return (
        <div className="custom-tabs-sidebar">
            <ul className="sidebar-tab-list mt-2 p-2">
                {menus.map(({ Icon, ...item }: any) => {

                    const isActive = item?.link ? (activeTab === item.link) : (JSON.stringify(activeTab) === JSON.stringify(item));
                    const hasError = tabHasError?.(item?.link, errors);

                    return (
                        <li
                            key={item.link}
                            className={`sidebar-tab-item  ${isActive ? "active" : ""} ${hasError ? "tab-has-error" : ""}`}
                            onClick={() => {
                                setActiveTab(item?.link || item);
                            }}
                        >
                            <div className="tab-card">
                                <div className="size-menu-icon-wrapper" style={{ position: 'relative' }}>
                                    {(item?.groupIcon || item?.serviceIcon) ? getIconComponent(item?.groupIcon || item?.serviceIcon) :
                                        <Icon size={16} />
                                    }

                                    {hasError && (
                                        <span style={{
                                            position: 'absolute', top: -4, right: -4,
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: '#dc3545', display: 'block',
                                        }} />
                                    )}
                                </div>
                                <div className="tab-text">
                                    <div className="tab-title d-flex align-items-center gap-2">
                                        {item?.title || item?.groupName || item?.ServiceNm || item?.serviceName}

                                        {hasError && !isActive && (
                                            <span className="badge" style={{
                                                fontSize: '9px', background: '#fff0f0',
                                                color: '#dc3545', border: '1px solid #fca5a5',
                                                padding: '1px 5px', borderRadius: '20px', fontWeight: 600,
                                            }}>
                                                Error
                                            </span>
                                        )}
                                    </div>
                                    <div className="tab-description">{item.description || item.Description}</div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {extraChild}
        </div>
    )
}

export default SideMenu