// Purpose: Sub Category module components 
// Created by: Harish
// Created Date: 28-05-2026

import React, { useState, lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import SubCategoryTbl from '../components/SubCategoryTbl';
import SubCategoryMdl from '../components/SubCategoryMdl';
import ServiceMappingMdl from '../components/ServiceMappingMdl';
import CategoryWiseTicketAssignMdl from '../components/CategoryWiseTicketAssignMdl';

interface subCategoryProps {
    show: boolean
    handleClose: () => void
}

const mockServiceData = [
    {
        ServiceCode: "SRV-001",
        ServiceName: "General Consultation",
        MapFlag: "Y",     // Currently checked in UI
        existing: "Y",    // Already exists in the database
        delete: "N",      // Not marked for deletion
    },
    {
        ServiceCode: "SRV-002",
        ServiceName: "Specialist Consultation",
        MapFlag: "N",     // Unchecked in UI
        existing: "Y",    // Exists in database, meaning user might have just unchecked it
        delete: "Y",      // Marked for deletion because it was existing but unchecked
    },
    {
        ServiceCode: "SRV-003",
        ServiceName: "Diagnostic X-Ray",
        MapFlag: "N",     // Unchecked in UI
        existing: "N",    // New service altogether, never mapped before
        delete: "N",
    },
    {
        ServiceCode: "SRV-004",
        ServiceName: "Blood Panel Test",
        MapFlag: "Y",     // Checked in UI
        existing: "N",    // New service that the user wants to map right now
        delete: "N",
    },
    {
        ServiceCode: "SRV-005",
        ServiceName: "Physical Therapy Session",
        MapFlag: "Y",     // Checked
        existing: "Y",    // Exists in database
        delete: "N",
    }
];

const SubCategory: React.FC<subCategoryProps> = ({ show, handleClose }) => {
    const [editData, setEditeData] = useState<any>(null);

    const [isMapService, setIsMapService] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<any>()
    const [isSubCategoryAssigne, setIsSubCategoryAssigne] = useState<boolean>(false)

    // Map Service Mdl
    const handleMapSerivesMdl = () => {
        setIsMapService(!isMapService)
    }

    // Handle Categort assigne 
    const handleSubCategoryAssigneMdl = () => {
        setIsSubCategoryAssigne(!isSubCategoryAssigne)
    }

    return (
        <Suspense fallback={<LoaderUI />}>
            <SubCategoryTbl
                handleCloseSubCategoryMdl={handleClose}
                handleMapSerivesMdl={handleMapSerivesMdl}
                handleSubCategoryAssigneMdl={handleSubCategoryAssigneMdl}

            />

            {/* Sub Category */}
            {show &&
                <SubCategoryMdl
                    show={show}
                    handleClose={handleClose}
                    editedData={editData}
                />
            }

            {isSubCategoryAssigne &&
                <CategoryWiseTicketAssignMdl
                    isAssignCategoryMdl={isSubCategoryAssigne}
                    setIsAssignCategoryMdl={setIsSubCategoryAssigne}
                    departmentList={undefined}
                    formData={undefined}
                    setDepartmentList={undefined}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                />
            }

            {isMapService &&
                <ServiceMappingMdl
                    isOpen={isMapService}
                    handleClose={handleMapSerivesMdl}
                    serviceData={mockServiceData}
                    editCategoryData={editData}
                    flag="S"
                />
            }
        </Suspense>
    )
}

export default SubCategory