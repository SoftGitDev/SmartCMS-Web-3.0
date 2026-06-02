// Purpose: User Profile Components 
// Created by: Harish 
// Created Date: 02-06-2026

import React, { Suspense, useState } from 'react'
import { UserCog } from 'lucide-react'
import { Tabs, Tab } from 'react-bootstrap' // Imported React Bootstrap components
import PageHeaeder from '../../components/common/PageHeaeder'
import LoaderUI from '../../components/loader/Loader'
import ChangePwd from './module/ChangePwd'
import Mfa from './module/Mfa'
import UserDetail from './module/UserDetail'

const UserProfile = () => {
    const [key, setKey] = useState('details')

    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={UserCog}
                    title={'User Profile Management'}
                    description={
                        'Update your personal details, change your account password, and configure two-factor authentication (2FA) for enhanced security.'
                    }
                />
            </Suspense>

            <div>
                <Tabs
                    id="user-profile-tabs"
                    activeKey={key}
                    onSelect={(k: any) => setKey(k)}
                    className="custom-tab-bar w-100 bg-white"
                >
                    <Tab eventKey="details" title="Details">
                        <div className="p-3">
                            <UserDetail />
                        </div>
                    </Tab>

                    <Tab eventKey="2fa" title="Two-Factor Authentication (2FA)">
                        <div className="p-3">
                            <Mfa />
                        </div>
                    </Tab>

                    <Tab eventKey="password" title="Change Password">
                        <div className="p-3">
                            <ChangePwd />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default UserProfile