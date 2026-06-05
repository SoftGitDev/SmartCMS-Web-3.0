import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const ExceptionMatrixTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/ExceptionMatrixTbl'));
const ExceptionMatrixMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/ExceptionMatrixMdl'));

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