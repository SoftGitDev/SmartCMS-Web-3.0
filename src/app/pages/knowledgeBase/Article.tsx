// Purpose: Article module screen
// Created by: Harish 
// Created Date: 03-06-2026

import React, { lazy, Suspense, useState } from 'react'
import LoaderUI from '../../components/loader/Loader'
import PageHeaeder from '../../components/common/PageHeaeder' // Kept your exact file path spelling
import { FileText, PlusCircle } from 'lucide-react'
import { Button, Card, CardBody } from 'react-bootstrap'


// Lazy loading the Table and Modal components
const ArticleTbl = lazy(() => import('../../content/table/knowledgeBase/ArticleTbl'));
const ArticleMdl = lazy(() => import('../../content/modal/knowledgeBase/ArticleMdl'));

const Article = () => {
    const [isArticleMdl, setIsArticleMdl] = useState<boolean>(false)

    // Clear open/close switch toggle
    const handleToggleArticleMdl = () => {
        setIsArticleMdl(prev => !prev)
    }

    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={FileText}
                    title="Article Management"
                    description="Create, edit, and publish knowledge base entries, documentation, or system announcements."
                    button={
                        <div className='ms-auto'>
                            {/* Fixed: Moved onClick handler here to cover the entire button area */}
                            <Button size='sm' onClick={handleToggleArticleMdl}>
                                <PlusCircle size={15} className='me-1' />
                                <span>Add Article</span>
                            </Button>
                        </div>
                    }
                />
            </Suspense>

            {/* Table UI Layout Grid Container */}
            <div className='p-3'>
                <Card >
                    <CardBody>
                        <Suspense fallback={<LoaderUI />}>
                            <ArticleTbl />
                        </Suspense>
                    </CardBody>
                </Card>
            </div>

            {/* Optimized: Removed the conditional short-circuit wrapper so 
              Bootstrap's exit-fade animations render perfectly on dismissal 
            */}
            <Suspense fallback={<LoaderUI />}>
                <ArticleMdl
                    show={isArticleMdl}
                    handleClose={handleToggleArticleMdl}
                />
            </Suspense>
        </>
    )
}

export default Article