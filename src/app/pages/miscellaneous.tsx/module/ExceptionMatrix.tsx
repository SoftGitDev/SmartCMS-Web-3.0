import React from 'react'
import ExceptionMatrixTbl from '../../../content/table/miscellaneous.tsx/ExceptionMatrixTbl'
import ExceptionMatrixMdl from '../../../content/modal/miscellaneous.tsx/ExceptionMatrixMdl'

interface ExceptionMatrixProps {
    show: boolean
    handleClose: () => void
}
const ExceptionMatrix: React.FC<ExceptionMatrixProps> = ({ show, handleClose }) => {
    return (
        <>
            {/* Table */}
            <ExceptionMatrixTbl
                handleCloseExcepMatrixMdl={handleClose}
            />

            {/* Modal */}
            <ExceptionMatrixMdl
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}

export default ExceptionMatrix