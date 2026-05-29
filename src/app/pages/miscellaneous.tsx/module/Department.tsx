// Purpose: Department Misc Module 
// Created by: Harish
// Created Date: 29-05-2026

import React from 'react'
import DepartmentTbl from '../../../content/table/miscellaneous.tsx/DepartmentTbl'
import DepartmentMdl from '../../../content/modal/miscellaneous.tsx/DepartmentMdl'

interface DepartmentProps {
  show: boolean
  handleClose: () => void
}

const Department: React.FC<DepartmentProps> = ({ show, handleClose }) => {
  return (
    <>
      {/* Table */}
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
    </>
  )
}

export default Department
