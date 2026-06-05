// Purpose: Ticket Template
// Created by: Harish
// Created Date: 01-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const TicketTemplateTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/TicketTemplateTbl'));
const TicketTemplateMdl = lazy(() => import('../../../content/modal/miscellaneous.tsx/TicketTemplateMdl'));

interface TicketTemplateProps {
    show: boolean
    handleClose: () => void
}

const TicketTemplate: React.FC<TicketTemplateProps> = ({ show, handleClose }) => {
    return (
        <Suspense fallback={<LoaderUI />}>
            {/* Table */}
            <TicketTemplateTbl
                handleCloseTicketTempMdl={handleClose}
            />

            {/* Modal */}
            {show && (
                <TicketTemplateMdl
                    show={show}
                    handleClose={handleClose}
                />
            )}
        </Suspense>
    )
}

export default TicketTemplate