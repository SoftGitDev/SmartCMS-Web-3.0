// Purpose: Ticket Status module screen 
// Created by: Harish
// Created Date: 02-06-2026


import React from 'react'
import TicketStatusTbl from '../../../content/table/miscellaneous.tsx/TicketStatusTbl'
import TicketStatusMdl from '../../../content/modal/miscellaneous.tsx/TicketStatusMdl'

interface TicketStatusProps {
    show: boolean
    handleClose: () => void
}

const TicketStatus: React.FC<TicketStatusProps> = ({ show, handleClose }) => {
    return (
        <>
            {/* Table */}
            <TicketStatusTbl
                handleCloseTicketStatus={handleClose}
            />

            {/* Modal */}
            <TicketStatusMdl
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}

export default TicketStatus