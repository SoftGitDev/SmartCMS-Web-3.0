// Purpose:  Set UP Layout Compoenets 
// Created by: Harish
// Created Date: 21-05-2026

// Change History:
// 21-05-2026 | Harish | Create a  Set up Layout compoenent 
// --------------------------------------------------------------

import { Shield } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const SetupLayout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  const state = useLocation().state;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!state) {
  //     navigate("/")
  //   }
  // }, [])

  

  return (
    <div className="setup-body">
      <div className="container" style={{ maxWidth: '1000px' }}>

        {/* Dynamic Header */}
        <div className="d-flex align-items-center mb-4">
          <div className="bg-primary text-white rounded-3 p-2 me-3 shadow-sm">
            <Shield />
          </div>
          <div>
            <h4 className="mb-0 fw-bold">{title}</h4>
            <p className="text-muted mb-0 small">{subtitle}</p>
          </div>
        </div>

        {/* Page Content (The specific setup screens) */}
        {children}
      </div>
    </div>
  );
};

export default SetupLayout;