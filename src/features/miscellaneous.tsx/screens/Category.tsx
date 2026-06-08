// Purpose: Category module components
// Created by: Harish
// Created Date: 26-05-2026

import React, { useState, lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import CategoryTbl from '../components/CategoryTbl';
import CategoryMdl from '../components/CategoryMdl';
import CategoryWiseTicketAssignMdl from '../components/CategoryWiseTicketAssignMdl';
import ServiceMappingMdl from '../components/ServiceMappingMdl';

// Lazy loading the Table and Modal components
// const CategoryTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/CategoryTbl'));
// const CategoryMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/CategoryMdl'));

interface CategoryProps {
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

const Category: React.FC<CategoryProps> = ({ show, handleClose }) => {
    const [editData, setEditeData] = useState<any>(null);
    const [isCategoryAssigne, setIsCategoryAssigne] = useState<boolean>(false)
    const [isMapService, setIsMapService] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<any>()

    // Map Service Mdl
    const handleMapSerivesMdl = () => {
        setIsMapService(!isMapService)
    }

    // Handle Categort assigne 
    const handleCategoryAssigneMdl = () => {
        setIsCategoryAssigne(!isCategoryAssigne)
    }

    return (
        <Suspense fallback={<LoaderUI />}>
            {/* Table */}
            <CategoryTbl
                handleCloseCategoryMdl={handleClose}
                handleCategoryAssigneMdl={handleCategoryAssigneMdl}
                handleMapSerivesMdl={handleMapSerivesMdl}
            />

            {/* Modal */}
            {show &&
                <CategoryMdl
                    show={show}
                    handleClose={handleClose}
                    editedData={editData}
                />
            }

            {isCategoryAssigne &&
                <CategoryWiseTicketAssignMdl
                    isAssignCategoryMdl={isCategoryAssigne}
                    setIsAssignCategoryMdl={setIsCategoryAssigne}
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
                    flag="C"
                />
            }
        </Suspense>
    )
}

export default Category 