import React from 'react'
import './Loader.css';
import HelpdeskIcon from './HelpdeskIcon';
import logoFav from '../../assets/images/fav.png'

const LoaderUI = () => {
    return (
        <div className="loader2-overlay">
            <div className="loader2-wrapper">
                {/* The Rotating Rings */}
                <div className="loader2-spinner"></div>
                <div className="loader2-spinner-inner"></div>

                {/* The Central Logo */}
                <div className="loader2-logo-container">
                    <img
                        src={logoFav}
                        className='loader2-logo'
                    />

                </div>
            </div>
        </div>
    )
}

export default LoaderUI
