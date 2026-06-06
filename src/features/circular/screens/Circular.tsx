// Purpose: Circular module screen
// Created by: Harish 
// Created Date: 03-06-2026

import React, { Suspense, useState, lazy } from 'react'
import { ScrollText, PlusCircle } from 'lucide-react'
import { Button, Card, CardBody } from 'react-bootstrap'
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import PageHeaeder from '../../../common/components/common/PageHeaeder';
import CircularTbl from '../components/CircularTbl';
import CircularMdl from '../components/CircularMdl';


// const CircularTbl = lazy(() => import("../../content/table/knowledgeBase/CircularTbl").then(({ default: CircularTbl }) => ({ default: CircularTbl })));
// const CircularMdl = lazy(() => import("../../content/modal/knowledgeBase/CircularMdl").then(({ default: CircularMdl }) => ({ default: CircularMdl })));

// Lazy load header component securely
// Lazy load modal component (assuming it follows your standard naming convention)

const Circular = () => {
    //  Standardized modal lifecycle state hooks
    const [isCircularMdl, setIsCircularMdl] = useState<boolean>(false);

    const handleToggleCircularMdl = () => {
        setIsCircularMdl(prev => !prev);
    };

    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={ScrollText} // Premium official document/circular icon
                    title="Circular Management"
                    description="Publish, track, and manage official corporate circulars, policy declarations, and regulatory mandates."
                    button={
                        <div className='ms-auto'>
                            <Button size='sm' onClick={handleToggleCircularMdl}>
                                <PlusCircle size={15} className='me-1' />
                                <span>Add Circular</span>
                            </Button>
                        </div>
                    }
                />
            </Suspense>

            {/* Core Datatable Viewport Container */}
            <div className="p-3">
                <Card>
                    <CardBody>
                        <Suspense fallback={<LoaderUI />}>
                            <CircularTbl />
                        </Suspense>
                    </CardBody>
                </Card>
            </div>

            {/* Formik-backed configuration modal structure */}
            <Suspense fallback={<LoaderUI />}>
                <CircularMdl
                    show={isCircularMdl}
                    handleClose={handleToggleCircularMdl}
                />
            </Suspense>
        </>
    )
}

export default Circular