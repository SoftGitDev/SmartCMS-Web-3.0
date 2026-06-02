import React from 'react'
import ExceptionLevelMdl from '../../../content/modal/miscellaneous.tsx/ExceptionLevelMdl'
import ExceptionLeveleTbl from '../../../content/table/miscellaneous.tsx/ExceptionLeveleTbl'

interface ExceptionLevelProps {
    show: boolean
    handleClose: () => void
}


const ExceptionLevel: React.FC<ExceptionLevelProps> = ({ show, handleClose }) => {
    return (
        <>
            {/* Table */}
            <ExceptionLeveleTbl
                handleCloseExcepLevelMdl={handleClose}
            />

            {/* Modal */}
            <ExceptionLevelMdl
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}

export default ExceptionLevel