import React, { useState } from "react";
import "./App.css";

const SettingsPage = () => {
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

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <span className="nav-icon">🏠</span>
        <span className="nav-icon">🏋️</span>
        <span className="nav-icon active">⚙️</span>
      </div>
    </div>
  );
};

export default SettingsPage;
