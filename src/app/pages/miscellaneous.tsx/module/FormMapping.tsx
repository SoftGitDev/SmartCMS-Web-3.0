// Purpose: Form Mapping Components
// Created by: Harish
// Created Date: 01-06-2026


import React from 'react'
import FormMappingTbl from '../../../content/table/miscellaneous.tsx/FormMappingTbl'
import FormMappingMdl from '../../../content/modal/miscellaneous.tsx/FormMappingMdl'

interface FormMappingProps {
    show: boolean
    handleClose: () => void
}

const FormMapping: React.FC<FormMappingProps> = ({ show, handleClose }) => {
    return (
        <>
            {/* Table  */}
            <FormMappingTbl
                handleCloseFormMappingMdl={handleClose}
            />

            {/* Modal */}
            <FormMappingMdl
                show={show}
                handleClose={handleClose}
            />

        </>
    )
}

export default FormMapping