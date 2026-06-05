// Purpose: Announcement module screen
// Created by: Harish 
// Created Date: 03-06-2026


import React, { lazy, Suspense, useState } from 'react'
import { Button, Card, CardBody } from 'react-bootstrap'
import LoaderUI from '../../components/loader/Loader'
import PageHeaeder from '../../components/common/PageHeaeder'
import { Megaphone, PlusCircle } from 'lucide-react'

// Lazy loading the Table and Modal components
const Announcementbl = lazy(() => import('../../content/table/knowledgeBase/Announcementbl'));
const AnnouncementMdl = lazy(() => import('../../content/modal/knowledgeBase/AnnouncementMdl'));

const Announcement = () => {
    const [isAnnouncement, setIsAnnouncement] = useState<boolean>(false)

    // handle Toggle Announcement modal
    const handleToggleAnnouncementMdl = () => {
        setIsAnnouncement(!isAnnouncement)
    }
    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={Megaphone}
                    title="Announcement Management"
                    description="Broadcast platform updates, maintenance windows, or system notices to targeted users."
                    button={
                        <div className='ms-auto'>
                            <Button size='sm' onClick={handleToggleAnnouncementMdl}>
                                <PlusCircle size={15} className='me-1' />
                                <span>Add Announcement</span>
                            </Button>
                        </div>
                    }
                />
            </Suspense>

            {/* Table UI */}
            <div className='p-3'>
                <Card>
                    <CardBody>
                        <Suspense fallback={<LoaderUI />}>
                            <Announcementbl />
                        </Suspense>
                    </CardBody>
                </Card>
            </div>

            {/* Modal */}
            <Suspense fallback={<LoaderUI />}>
                <AnnouncementMdl
                    show={isAnnouncement}
                    handleClose={handleToggleAnnouncementMdl}
                />
            </Suspense>

        </>
    )
}

export default Announcement