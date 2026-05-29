// Purpose: Circular Type Components
// Created by: Harish
// Created Date: 29-05-2026


import React, { useState } from 'react'
import CircularTypeTbl from '../../../content/table/miscellaneous.tsx/CircularTypeTbl'
import CircularTypeMdl from '../../../content/modal/miscellaneous.tsx/CircularTypeMdl'

interface CategoryTypeProps {
  show: boolean
  handleClose: () => void
}


const CircularType: React.FC<CategoryTypeProps> = ({ show, handleClose }) => {
  const [editData, setEditeData] = useState<any>(null);

  return (
    <>
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
    </>
  )
}

export default CircularType
