// Purpose: Form Mapping Components
// Created by: Harish
// Created Date: 01-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import FormMappingTbl from '../components/FormMappingTbl'
import FormMappingMdl from '../components/FormMappingMdl'

interface FormMappingProps {
    show: boolean
    handleClose: () => void
}

const FormMapping: React.FC<FormMappingProps> = ({ show, handleClose }) => {
    return (
        <Suspense fallback={<LoaderUI />}>
            {/* Table  */}
            <FormMappingTbl
                handleCloseFormMappingMdl={handleClose}
            />

            {/* Modal */}
            {show && (
                <FormMappingMdl
                    show={show}
                    handleClose={handleClose}
                />
            )}
        </Suspense>
    )
}

export default FormMapping