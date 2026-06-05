// Purpose: Category module components
// Created by: Harish
// Created Date: 26-05-2026

import React, { useState, lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const CategoryTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/CategoryTbl'));
const CategoryMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/CategoryMdl'));

interface CategoryProps {
    show: boolean
    handleClose: () => void
}

const Category: React.FC<CategoryProps> = ({ show, handleClose }) => {
    const [editData, setEditeData] = useState<any>(null);

    return (
        <Suspense fallback={<LoaderUI />}>
            {/* Table */}
            <CategoryTbl
                handleCloseCategoryMdl={handleClose}
            />

            {/* Modal */}
            {show &&
                <CategoryMdl
                    show={show}
                    handleClose={handleClose}
                    editedData={editData}
                />
            }
        </Suspense>
    )
}

export default Category