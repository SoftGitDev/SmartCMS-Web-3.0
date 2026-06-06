// Purpose: Ticket Status module screen 
// Created by: Harish
// Created Date: 02-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import TicketStatusTbl from '../components/TicketStatusTbl'
import TicketStatusMdl from '../components/TicketStatusMdl'

interface TicketStatusProps {
    show: boolean
    handleClose: () => void
}

const TicketStatus: React.FC<TicketStatusProps> = ({ show, handleClose }) => {
    return (
        <Suspense fallback={<LoaderUI />}>
            {/* Table */}
            <TicketStatusTbl
                handleCloseTicketStatus={handleClose}
            />

            {/* Modal */}
            {show && (
                <TicketStatusMdl
                    show={show}
                    handleClose={handleClose}
                />
            )}
        </Suspense>
    )
}

export default TicketStatus