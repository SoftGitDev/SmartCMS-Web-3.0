// Purpose: Category module components
// Created by: Harish
// Created Date: 26-05-2026



import React, { useState } from 'react'
import CategoryTbl from '../../../content/table/miscellaneous.tsx/CategoryTbl'
import CategoryMdl from '../../../content/modal/miscellaneous.tsx/CategoryMdl'

interface CategoryProps {
    show: boolean
    handleClose: () => void
}

const Category: React.FC<CategoryProps> = ({ show, handleClose }) => {
    const [editData, setEditeData] = useState<any>(null);

    return (
        <>
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
        </>
    )
}

export default Category
