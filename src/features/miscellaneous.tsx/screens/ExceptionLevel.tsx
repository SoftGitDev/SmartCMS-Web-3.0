import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import ExceptionLeveleTbl from '../components/ExceptionLeveleTbl'
import ExceptionLevelMdl from '../components/ExceptionLevelMdl'

// Lazy loading the Table and Modal components

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