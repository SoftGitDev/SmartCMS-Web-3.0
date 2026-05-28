// Purpose: Sub Category module components 
// Created by: Harish
// Created Date: 28-05-2026

import React, { useState } from 'react'
import SubCategoryMdl from '../../../content/modal/miscellaneous.tsx/SubCategoryMdl';
import SubCategoryTbl from '../../../content/table/miscellaneous.tsx/SubCategoryTbl';

interface subCategoryProps {
    show: boolean
    handleClose: () => void
}

const SubCategory: React.FC<subCategoryProps> = ({ show, handleClose }) => {
    const [editData, setEditeData] = useState<any>(null);

    return (
        <>

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
        </>
    )
}

export default SubCategory
