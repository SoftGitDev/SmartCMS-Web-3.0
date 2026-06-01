import React from 'react'
import DynamicColumnTbl from '../../../content/table/miscellaneous.tsx/DynamicColumnTbl'
import DynamicColumnMdl from '../../../content/modal/miscellaneous.tsx/DynamicColumnMdl'

interface DynamicColumnProps {
    show: boolean
    handleClose: () => void
}

const DynamicColumn: React.FC<DynamicColumnProps> = ({ show, handleClose }) => {
    return (
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
    )
}

export default DynamicColumn
