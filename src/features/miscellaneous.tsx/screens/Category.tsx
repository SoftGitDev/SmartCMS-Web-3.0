// Purpose: Category module components
// Created by: Harish
// Created Date: 26-05-2026

import React, { useState, lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import CategoryTbl from '../components/CategoryTbl';
import CategoryMdl from '../components/CategoryMdl';
import CategoryWiseTicketAssignMdl from '../components/CategoryWiseTicketAssignMdl';

// Lazy loading the Table and Modal components
// const CategoryTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/CategoryTbl'));
// const CategoryMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/CategoryMdl'));

interface CategoryProps {
    show: boolean
    handleClose: () => void
}

const Category: React.FC<CategoryProps> = ({ show, handleClose }) => {
    const [editData, setEditeData] = useState<any>(null);
    const [isCategoryAssigne, setIsCategoryAssigne] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<any>()

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

        </Suspense>
    )
}

export default Category