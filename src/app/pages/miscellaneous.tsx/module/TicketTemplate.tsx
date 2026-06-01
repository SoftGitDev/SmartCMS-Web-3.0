// Purpose: Ticket Template
// Created by: Harish
// Created Date: 01-06-2026


import React from 'react'
import TicketTemplateTbl from '../../../content/table/miscellaneous.tsx/TicketTemplateTbl'
import TicketTemplateMdl from '../../../content/table/miscellaneous.tsx/TicketTemplateMdl'

interface TicketTemplateProps {
    show: boolean
    handleClose: () => void
}

const TicketTemplate: React.FC<TicketTemplateProps> = ({ show, handleClose }) => {
    return (
        <>
            {/* Table */}
            <TicketTemplateTbl
                handleCloseTicketTempMdl={handleClose}
            />

            {/* Modal */}
            <TicketTemplateMdl />
        </>
    )
}

export default TicketTemplate