// Purpose: Ticket Status module screen 
// Created by: Harish
// Created Date: 02-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const TicketStatusTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/TicketStatusTbl'));
const TicketStatusMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/TicketStatusMdl'));

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