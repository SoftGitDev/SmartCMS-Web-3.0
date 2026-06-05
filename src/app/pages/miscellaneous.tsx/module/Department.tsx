// Purpose: Department Misc Module 
// Created by: Harish
// Created Date: 29-05-2026


import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const DynamicColumnTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/DynamicColumnTbl'));
const DynamicColumnMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/DynamicColumnMdl'));

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