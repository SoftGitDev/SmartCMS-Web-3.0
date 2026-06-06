// Purpose: Circular Type Components
// Created by: Harish
// Created Date: 29-05-2026

import React, { useState, lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import CircularTypeTbl from '../components/CircularTypeTbl';
import CircularTypeMdl from '../components/CircularTypeMdl';


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