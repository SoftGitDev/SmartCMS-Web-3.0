// Purpose:Escalation Level Assign Module Screen
// Created by: Harish
// Created Date: 02-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader'; // Using the loader path from previous steps

// Lazy loading the Table component
const EscalationLevelAssignTbl = lazy(() => import('../../../content/table/miscellaneous.tsx/EscalationLevelAssignTbl'));

const EscalationLevelAssign = () => {
    return (
        <Suspense fallback={<LoaderUI />}>
            <EscalationLevelAssignTbl />
        </Suspense>
    )
}

export default EscalationLevelAssign