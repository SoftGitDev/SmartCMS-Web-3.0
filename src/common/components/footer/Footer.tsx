import React from 'react'
import '../../../assets/styles/Footer.css'

function Footer() {
  return (
    <div className='footer fixed-bottom bg-white text-center d-none d-sm-block z-3 ' >
      <div className='d-flex justify-content-between h-15'>
        <div className='ms-4 text-xs'>
          {/* <p > Version 0.4.2 </p> */}
        </div>

        <div className='text-xs me-3'>
          <p>
            All rights reserved | T&C | Privacy Policy |
            <span style={{ color: '#59b039' }}> DEVELOPED BY SOFT-TECH SOLUTION © 2014 - {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
