import React, { Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import DepartmentTbl from '../components/DepartmentTbl'
import DepartmentMdl from '../components/DepartmentMdl'

interface DepartmentProps {
    show: boolean
    handleClose: () => void
}
const Department: React.FC<DepartmentProps> = ({ show, handleClose }) => {
    return (
        <Suspense fallback={<LoaderUI />}>
            <div>
                {/* table  */}
                <DepartmentTbl
                    handleCloseDepartmentMdl={handleClose}
                />

                {/* Modal */}
                {show &&
                    <DepartmentMdl
                        show={show}
                        handleClose={handleClose}
                    />
                }
            </div>
        </Suspense>
    )
}

export default Department