import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const ExceptionLevelMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/ExceptionLevelMdl'));
const ExceptionLeveleTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/ExceptionLeveleTbl'));

interface ExceptionLevelProps {
    show: boolean
    handleClose: () => void
}

const ExceptionLevel: React.FC<ExceptionLevelProps> = ({ show, handleClose }) => {
    return (
        <Suspense fallback={<LoaderUI />}>
            {/* Table */}
            <ExceptionLeveleTbl
                handleCloseExcepLevelMdl={handleClose}
            />

            {/* Modal */}
            {show && (
                <ExceptionLevelMdl
                    show={show}
                    handleClose={handleClose}
                />
            )}
        </Suspense>
    )
}

export default ExceptionLevel