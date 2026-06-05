// Purpose: Sub Category module components 
// Created by: Harish
// Created Date: 28-05-2026

import React, { useState, lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const SubCategoryMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/SubCategoryMdl'));
const SubCategoryTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/SubCategoryTbl'));

interface subCategoryProps {
    show: boolean
    handleClose: () => void
}

const SubCategory: React.FC<subCategoryProps> = ({ show, handleClose }) => {
    const [editData, setEditeData] = useState<any>(null);

    return (
        <Suspense fallback={<LoaderUI />}>
            <SubCategoryTbl
                handleCloseSubCategoryMdl={handleClose}
            />

            {/* Sub Category */}
            {show &&
                <SubCategoryMdl
                    show={show}
                    handleClose={handleClose}
                    editedData={editData}
                />
            }
        </Suspense>
    )
}

export default SubCategory