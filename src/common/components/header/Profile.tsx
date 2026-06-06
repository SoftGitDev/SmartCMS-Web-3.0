import { useNavigate } from "react-router-dom";
import '../../../assets/styles/Header.css'

import { useCallback, useEffect, useState } from "react";
import { LogOut, User, LoaderCircle } from "lucide-react";
import * as urls from "../../../services/axios/url";
import { getUserData, removeLoginSession } from "../../../services/storage/common";
import { apiRequest } from "../../../services/api/apiRequest";

type ProfileProps = {
  isProfile: boolean;
  setIsProfile: React.Dispatch<React.SetStateAction<boolean>>;
  screenWidth?: number;
};

const Profile = ({ isProfile, setIsProfile, screenWidth = 1024 }: ProfileProps) => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const userData = getUserData();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoader(true);
      await apiRequest("POST", urls.logout, {});
      removeLoginSession();
      navigate("/");
    } catch (error) {
      removeLoginSession();
      navigate("/");
    } finally {
      setIsLoader(false);
    }
  }, [navigate]);

  return (
    <div onMouseLeave={() => setIsProfile(false)} className="profile-wrapper">
      {/* Overlay for mobile to darken background */}
      {screenWidth < 875 && <div className="profile-overlay shadow-sm"></div>}

      <div className={`profile-menu-section ${animate ? "dropdown-animate" : ""} ${screenWidth < 450 ? "MobileProfile-section" : ""}`}>

        {/* User Identity Header */}
        <div className="profile-header">
          <div className="avatar-circle">
            {userData?.userId || 'Abhishek'?.slice(0, 1)?.toUpperCase()}
          </div>
          <div className="user-meta">
            <span className="user-name">{userData?.userId || "Guest User"}</span>
            <span className="user-role">
              {userData?.roleName} • {(userData?.parentRole === "S" ? "Super Admin" : userData?.parentRole === "A" ? "Admin" : "User")}
            </span>
          </div>
        </div>

        <div className="menu-divider"></div>

        {/* Navigation Links */}
        <nav className="menu-list">
          <button className="menu-item" onClick={() => navigate("/profile")}>
            <div className="menu-item-left">
              <User size={18} className="list-icon" />
              <span>My Profile</span>
            </div>
          </button>

          {/* <button className="menu-item" onClick={() => { }}>
            <div className="menu-item-left">
              <Settings size={18} className="list-icon" />
              <span>Account Settings</span>
            </div>
            <ChevronRight size={14} className="chevron" />
          </button> */}
        </nav>

        <div className="menu-divider"></div>

        {/* Logout Action */}
        <div className="menu-footer">
          <button
            className={`logout-button ${isLoader ? 'loading' : ''}`}
            onClick={!isLoader ? logout : undefined}
          >
            {isLoader ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <LogOut size={18} />
            )}
            <span>{isLoader ? 'Signing out...' : 'Log Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;