import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import ExceptionMatrixTbl from '../components/ExceptionMatrixTbl'
import ExceptionMatrixMdl from '../components/ExceptionMatrixMdl'

interface ExceptionMatrixProps {
    show: boolean
    handleClose: () => void
}

const ExceptionMatrix: React.FC<ExceptionMatrixProps> = ({ show, handleClose }) => {
    return (
        <Suspense fallback={<LoaderUI />}>
            {/* Table */}
            <ExceptionMatrixTbl
                handleCloseExcepMatrixMdl={handleClose}
            />

            {/* Modal */}
            {show && (
                <ExceptionMatrixMdl
                    show={show}
                    handleClose={handleClose}
                />
            )}
        </Suspense>
    )
}

export default ExceptionMatrix