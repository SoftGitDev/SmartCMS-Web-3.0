import React from 'react'
import HelpdeskIcon from './HelpdeskIcon'
import './FullScreenLoader.css';


function FullScreenLoader() {
    return (
        <div style={{ height: "100vh" }} className='d-flex justify-content-center align-items-center'>
            <div style={{ width: 150, height: 150, position: "relative" }} className='d-flex justify-content-center align-items-center'>
                <span className="loader2"></span>
                <HelpdeskIcon style={{ width: 100, position: "absolute" }} />
            </div>
        </div>
    )
}

export default FullScreenLoader