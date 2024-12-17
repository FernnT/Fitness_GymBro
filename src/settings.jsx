// REACT STUFF
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// PAGE SPECIFIC
import './App.css'

//COMPONENTS
import Main_nav_bar from './main-nav-bar.jsx'



const SettingsTab = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    username: "",
    password: "",
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeleteAccount = () => {
    if (!deleteConfirmation) {
      alert("Click delete again to confirm.");
      setDeleteConfirmation(true);
      return;
    }
    console.log("Account deleted.");
    alert("Account deleted.");
  };

  const saveSettings = () => {
    console.log("Saved settings:", settings);
    alert("Settings saved!");
  };

  
  const navigate = useNavigate()
  const handleLogOut = () => {
    Cookies.remove('token');
    console.log("COOKIES IN PLAIN TEXT: ", document.cookie)
  
    navigate("/log-in")
  };
  


  return (
    <div className="page-container">
      {/* Page Title */}
      <h1 className="page-header">Settings</h1>

      {/* About Section */}
      <div className="section">
        <h2 className="section-title">About</h2>
        <div className="section-item">
          <span>License</span>
          <span className="arrow">›</span>
        </div>
        <div className="section-item">
          <span>Privacy Policy</span>
          <span className="arrow">›</span>
        </div>
        <div className="section-item">
          <span>Terms of Service</span>
          <span className="arrow">›</span>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="section">
        <h2 className="section-title">Contact Us</h2>
        <div className="section-item">
          <span>Report an Issue</span>
          <span className="arrow">›</span>
        </div>
        <div className="section-item">
          <span>Rate on App Store</span>
          <span className="arrow">›</span>
        </div>
      </div>

      {/* Account Section */}
      <div className="section">
        <h2 className="section-title">Account</h2>
        <div className="section-item">
          <span>Change Password</span>
          <span className="arrow">›</span>
        </div>
        <div className="section-item">
          <span>Change Username</span>
          <span className="arrow">›</span>
        </div>
        <div className="section-item">
          <span>Delete Account</span>
          <span className="arrow">›</span>
        </div>
      </div>

        {/* Delete Account */}
        <button
          type="button"
          onClick={handleDeleteAccount}
          className={`settings-button ${
            deleteConfirmation ? "confirm-delete" : "delete-button"
          }`}
        >
          {deleteConfirmation ? "Confirm Delete" : "Delete Account"}
        </button>
      </form>
      {/* LOG OUT */}
      <button
        type="button"
        onClick={() => handleLogOut()}
      >
        LOG OUT
      </button>


      <Main_nav_bar/>
    </div>
  );
};

export default SettingsTab;
