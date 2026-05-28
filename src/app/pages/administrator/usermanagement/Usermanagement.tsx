// Purpose: User Master mange user and user role
// Created by: Harish 
// Created Date: 25-05-2026


import React, { Suspense, useState } from 'react'
import PageHeaeder from '../../../components/common/PageHeaeder'
import { LucideNotepadTextDashed, PaintRoller, ShieldCogCorner, User2 } from 'lucide-react'
import { Card, CardBody, Tab, Tabs } from 'react-bootstrap'
import User from './module/User'
import UserRole from './module/UserRole'

const Usermanagement = () => {

    const [key, setKey] = useState('user');

    return (
        <>
            {/* Header */}
            <Suspense>
                <PageHeaeder
                    Icon={LucideNotepadTextDashed}
                    title={'User Management'}
                    description={'Manage users, roles, permissions, account status, and access control settings'}
                />
            </Suspense>

            {/* Tbas Boostrap */}
            <Tabs defaultActiveKey="user" onSelect={(k) => setKey(k || 'user')} id="user-master-tabs" className="custom-tab-bar w-100 bg-white">
                <Tab eventKey="user" title={<><User2 size={18} className='me-2' />Users</>} >
                    <div className=" p-3">
                        <Card>
                            <CardBody>
                                <User />
                            </CardBody>
                        </Card>
                    </div>
                </Tab>

                <Tab eventKey="userRole" title={<><ShieldCogCorner size={18} className='me-2' />User Role</>} >
                    <div className=" p-3">
                        <Card>
                            <CardBody>
                                <UserRole />
                            </CardBody>
                        </Card>
                    </div>
                </Tab>
            </Tabs>
        </>
    )
}

export default Usermanagement
