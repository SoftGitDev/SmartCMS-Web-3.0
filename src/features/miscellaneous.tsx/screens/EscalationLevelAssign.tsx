// Purpose:Escalation Level Assign Module Screen
// Created by: Harish
// Created Date: 02-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import EscalationLevelAssignTbl from '../components/EscalationLevelAssignTbl'

// Lazy loading the Table component

const EscalationLevelAssign = () => {
    return (
        <Suspense fallback={<LoaderUI />}>
            <EscalationLevelAssignTbl />
        </Suspense>
    )
}

export default EscalationLevelAssign