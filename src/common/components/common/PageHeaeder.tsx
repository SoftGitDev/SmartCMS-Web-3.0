import React, { JSX } from 'react'
import { ArrowLeft, type LucideIcon } from 'lucide-react';

interface pageHeaderProps {
    Icon: any,
    title: string,
    description: any,
    button?: JSX.Element,
    handleBack?: () => void,
    isBack?: boolean
}

const PageHeaeder: React.FC<pageHeaderProps> = ({ Icon, title, description, button, handleBack, isBack }) => {

    return (
        <div className="px-4 py-3 my-0 d-flex align-items-center gap-3 bg-white border-bottom sticky-top ">
            {!isBack ?
                <div className='icon-wrapper '>
                    <Icon className='text-primary' />
                </div>
                :
                <div className='icon-wrapper line cursor-pointer' onClick={() => handleBack && handleBack()}>
                    <ArrowLeft />
                </div>
            }
            <div>
                <h5 className="m-0 fw-semibold mb-0">{title}</h5>
                <p className="text-md text-muted mb-0">{description}</p>
            </div>

            {button}
        </div>
    )
}

export default PageHeaeder