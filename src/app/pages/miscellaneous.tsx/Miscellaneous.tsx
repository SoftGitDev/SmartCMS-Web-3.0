// Purpose: Misc Menu 
// Created by: Harish
// Created Date: 25-05-2026


import React, { lazy, Suspense, useState } from 'react'
import { Building2, ClipboardList, Columns3, Cuboid, Files, FileText, FolderKanban, GitBranch, Layers3, Mail, Plus, PlusCircle, Settings2, ShieldCheck, Ticket, Workflow } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { getUserData } from '../../utils/common';
import LoaderUI from '../../components/loader/Loader';
import SideMenu from '../../components/common/SideMenu';
import Category from './module/Category';
import SubCategory from './module/SubCategory';
import Department from './module/Department';
import CircularType from './module/CircularType';
import DynamicColumn from './module/DynamicColumn';

const PageHeaeder = lazy(() => import("../../components/common/PageHeaeder").then(({ default: PageHeaeder }) => ({ default: PageHeaeder })));


const Miscellaneous = () => {

    const userData = getUserData();
    const menus = [
        {
            title: "Category",
            description: "Manage ticket categories",
            Icon: FolderKanban,
            link: "category",
            buttonName: "Add Category",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Sub Category",
            description: "Manage sub categories",
            Icon: Layers3,
            link: "sub-category",
            buttonName: "Add Sub Category",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Circular Type",
            description: "Manage circular types",
            Icon: Files,
            link: "circular-type",
            buttonName: "Add Circular Type",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Category View Rights",
            description: "Manage category access rights",
            Icon: ShieldCheck,
            link: "category-view-rights",
            buttonName: "Add Rights",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Department",
            description: "Manage departments",
            Icon: Building2,
            link: "department",
            buttonName: "Add Department",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Dynamic Column",
            description: "Manage dynamic fields",
            Icon: Columns3,
            link: "dynamic-column",
            buttonName: "Add Dynamic Column",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Form Mapping",
            description: "Manage form mappings",
            Icon: GitBranch,
            link: "form-mapping",
            buttonName: "Add Form Mapping",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Mail SMS Template",
            description: "Manage mail and sms templates",
            Icon: Mail,
            link: "mail-sms-template",
            buttonName: "Add Template",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Ticket Template",
            description: "Manage ticket templates",
            Icon: FileText,
            link: "ticket-template",
            buttonName: "Add Ticket Template",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Ticket Status",
            description: "Manage ticket statuses",
            Icon: Ticket,
            link: "ticket-status",
            buttonName: "Add Ticket Status",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Service Assign",
            description: "Manage service assignments",
            Icon: ClipboardList,
            link: "service-assign",
            buttonName: "Assign Service",
            buttonPermission: true,
            isShow: true,
        },
        {
            title: "Escalation Assign",
            description: "Manage escalation mappings",
            Icon: Workflow,
            link: "escalation-assign",
            buttonName: "Add Escalation",
            buttonPermission: true,
            isShow: true,
        },
    ];

    const [activeTab, setActiveTab] = useState<string>(menus.filter((i) => i.isShow)[0]?.link || "");

    // Modal states
    const [isCategoryMdl, setIsCategoryMdl] = useState<boolean>(false);
    const [isSubCategoryMdl, setIsSubCategoryMdl] = useState<boolean>(false);
    const [isCircularTypeMdl, setIsCircularTypeMdl] = useState<boolean>(false);
    const [isCategoryViewRightsMdl, setIsCategoryViewRightsMdl] = useState<boolean>(false);
    const [isDepartmentMdl, setIsDepartmentMdl] = useState<boolean>(false);
    const [isDynamicColumnMdl, setIsDynamicColumnMdl] = useState<boolean>(false);
    const [isFormMappingMdl, setIsFormMappingMdl] = useState<boolean>(false);
    const [isMailSmsTemplateMdl, setIsMailSmsTemplateMdl] = useState<boolean>(false);
    const [isTicketTemplateMdl, setIsTicketTemplateMdl] = useState<boolean>(false);
    const [isTicketStatusMdl, setIsTicketStatusMdl] = useState<boolean>(false);
    const [isServiceAssignMdl, setIsServiceAssignMdl] = useState<boolean>(false);
    const [isEscalationAssignMdl, setIsEscalationAssignMdl] = useState<boolean>(false);

    const [editData, setEditeData] = useState<any>(null);

    const handleCommonMdl = (currentState: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, data?: any) => {
        setState(!currentState);
        setEditeData(data ?? null);
    }

    const handleAddMis = () => {
        switch (activeTab) {

            case "category":
                handleCommonMdl(isCategoryMdl, setIsCategoryMdl);
                break;

            case "sub-category":
                handleCommonMdl(isSubCategoryMdl, setIsSubCategoryMdl);
                break;

            case "circular-type":
                handleCommonMdl(isCircularTypeMdl, setIsCircularTypeMdl);
                break;

            case "category-view-rights":
                handleCommonMdl(isCategoryViewRightsMdl, setIsCategoryViewRightsMdl);
                break;

            case "department":
                handleCommonMdl(isDepartmentMdl, setIsDepartmentMdl);
                break;

            case "dynamic-column":
                handleCommonMdl(isDynamicColumnMdl, setIsDynamicColumnMdl);
                break;

            case "form-mapping":
                handleCommonMdl(isFormMappingMdl, setIsFormMappingMdl);
                break;

            case "mail-sms-template":
                handleCommonMdl(isMailSmsTemplateMdl, setIsMailSmsTemplateMdl);
                break;

            case "ticket-template":
                handleCommonMdl(isTicketTemplateMdl, setIsTicketTemplateMdl);
                break;

            case "ticket-status":
                handleCommonMdl(isTicketStatusMdl, setIsTicketStatusMdl);
                break;

            case "service-assign":
                handleCommonMdl(isServiceAssignMdl, setIsServiceAssignMdl);
                break;

            case "escalation-assign":
                handleCommonMdl(isEscalationAssignMdl, setIsEscalationAssignMdl);
                break;

            default:
                break;
        }
    };

    // Close handlers

    // CategoryMdl
    const handleCloseCategoryMdl = (data?: any) => {
        handleCommonMdl(isCategoryMdl, setIsCategoryMdl, data);
    }

    // SubCategoryMdl
    const handleCloseSubCategoryMdl = (data?: any) => {
        handleCommonMdl(isSubCategoryMdl, setIsSubCategoryMdl, data);
    }

    // CircularTypeMdl
    const handleCloseCircularTypeMdl = (data?: any) => {
        handleCommonMdl(isCircularTypeMdl, setIsCircularTypeMdl, data);
    }

    // DepartmentMdl
    const handleCloseDepartmentMdl = (data?: any) => {
        handleCommonMdl(isCircularTypeMdl, setIsCircularTypeMdl, data);
    }

    // DyanmicColumMdl
    const handleCloseDyanmicColumMdl = (data?: any) => {
        handleCommonMdl(isDynamicColumnMdl, setIsDynamicColumnMdl, data);
    }

    // Get current menu item to access button name
    const currentMenu = menus.find(menu => menu.link === activeTab);

    return (
        <div>
            <Suspense>
                <PageHeaeder
                    Icon={Settings2}
                    title={'Miscellaneous Configuration'}
                    description={
                        "Manage system masters, service mappings, ticket settings, templates, and operational configurations."
                    }
                    button={
                        <>
                            {activeTab !== "authorizations" && (
                                <>
                                    {currentMenu?.buttonPermission && (
                                        <Button
                                            variant='primary'
                                            size='sm'
                                            className="ms-auto"
                                            onClick={handleAddMis}
                                        >
                                            <PlusCircle size={16} className="me-1" />
                                            {currentMenu?.buttonName || "Add New"}
                                        </Button>
                                    )}
                                </>
                            )}
                        </>
                    }
                />
            </Suspense>

            <div className="d-flex h-100">
                {/* Sidebar */}
                <div className="custom-tabs-sidebar">
                    <SideMenu
                        menus={menus}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>

                {/* Content Panel */}
                <div className="tab-content-panel w-100" style={{ backgroundColor: "rgb(235 243 250)", height: "calc(-170px + 100vh)" }}>
                    {/* Category */}
                    {activeTab === "category" &&
                        <Suspense fallback={<LoaderUI />}>
                            <Category
                                show={isCircularTypeMdl}
                                handleClose={handleCloseCategoryMdl}
                            />
                        </Suspense>
                    }

                    {/* Sub Category */}
                    {activeTab === "sub-category" &&
                        <Suspense fallback={<LoaderUI />}>
                            <SubCategory
                                show={isSubCategoryMdl}
                                handleClose={handleCloseSubCategoryMdl}
                            />
                        </Suspense>
                    }

                    {/* Circular Type */}
                    {activeTab === "circular-type" &&
                        <Suspense fallback={<LoaderUI />}>
                            <CircularType
                                show={isSubCategoryMdl}
                                handleClose={handleCloseCircularTypeMdl}
                            />
                        </Suspense>
                    }

                    {/* Department */}
                    {activeTab === 'department' &&
                        <Suspense fallback={<LoaderUI />}>
                            <Department
                                show={isDepartmentMdl}
                                handleClose={handleCloseDepartmentMdl}
                            />
                        </Suspense>
                    }

                    {/* dynamic-column */}
                    {activeTab === 'dynamic-column' &&
                        <Suspense fallback={<LoaderUI />}>
                            <DynamicColumn
                                show={isDynamicColumnMdl}
                                handleClose={handleCloseDyanmicColumMdl}
                            />
                        </Suspense>
                    }
                </div>


            </div>
        </div>
    )
}

export default Miscellaneous