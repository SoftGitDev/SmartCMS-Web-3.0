// Purpose: Category View Rights Module Screen
// Created by: Harish
// Created Date: 02-06-2026

import React, { lazy, Suspense } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import CategoryVieWrightTdl from '../components/CategoryVieWrightTdl'

// Lazy loading the Table component

const CategoryVieWright = () => {
    return (
        <Suspense fallback={<LoaderUI />}>
            <CategoryVieWrightTdl />
        </Suspense>
    )
}

export default CategoryVieWright