// Purpose: Category View Rights Module Screen
// Created by: Harish
// Created Date: 02-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../components/loader/Loader';

// Lazy loading the Table component
const CategoryVieWrightTdl = lazy(() => import('../../../content/table/miscellaneous.tsx/CategoryVieWrightTdl'));

const CategoryVieWright = () => {
    return (
        <Suspense fallback={<LoaderUI />}>
            <CategoryVieWrightTdl />
        </Suspense>
    )
}

export default CategoryVieWright