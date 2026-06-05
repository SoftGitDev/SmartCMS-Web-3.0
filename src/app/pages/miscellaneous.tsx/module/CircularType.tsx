// Purpose: Circular Type Components
// Created by: Harish
// Created Date: 29-05-2026

import React, { useState, lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const CircularTypeTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/CircularTypeTbl'));
const CircularTypeMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/CircularTypeMdl'));

interface CategoryTypeProps {
  show: boolean
  handleClose: () => void
}

const CircularType: React.FC<CategoryTypeProps> = ({ show, handleClose }) => {
  const [editData, setEditeData] = useState<any>(null);

  return (
    <Suspense fallback={<LoaderUI />}>
      {/* Table  */}
      <CircularTypeTbl
        handleCloseCategoryTypeMdl={handleClose}
      />

      {/* Modal */}
      {show &&
        <CircularTypeMdl
          show={show}
          handleClose={handleClose}
          editedData={editData}
        />
      }
    </Suspense>
  )
}

export default CircularType