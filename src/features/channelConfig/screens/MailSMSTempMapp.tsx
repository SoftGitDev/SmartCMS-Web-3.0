// Purpose: Mail & SMS  Template Mapping Config 
// Created by: Harish 
// Created Date: 04-06-2026


import React, { lazy } from 'react'
import { Card, CardBody } from 'react-bootstrap'

const MailSMSTemplateMappingTbl = lazy(() => import("../components/MailSMSTemplateMappingTbl").then(({ default: MailSMSTemplateMappingTbl }) => ({ default: MailSMSTemplateMappingTbl })));

const MailSMSTempMapp = () => {
    return (
        <>
            <div className='pt-3'>
                <Card>
                    <CardBody>
                        <MailSMSTemplateMappingTbl />
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default MailSMSTempMapp