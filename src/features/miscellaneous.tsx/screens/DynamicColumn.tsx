import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import DynamicColumnTbl from '../components/DynamicColumnTbl'
import DynamicColumnMdl from '../components/DynamicColumnMdl'

interface DynamicColumnProps {
    show: boolean
    handleClose: () => void
}

const DynamicColumn: React.FC<DynamicColumnProps> = ({ show, handleClose }) => {
    return (
        <Suspense fallback={<LoaderUI />}>
            <div>
                {/* table  */}
                <DynamicColumnTbl
                    handleditData={handleClose}
                />

                {/* Modal */}
                {show &&
                    <DynamicColumnMdl
                        show={show}
                        handleClose={handleClose}
                    />
                }
            </div>
        </Suspense>
    )
}

export default DynamicColumn