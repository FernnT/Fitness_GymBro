import React, { useState } from "react";

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

  return (
    <div className="settings-container">
      <h1 className="settings-header">Settings</h1>
      <form className="settings-form">
        {/* Theme Selector */}
        <div className="settings-field">
          <label>
            Theme:
            <select
              name="theme"
              value={settings.theme}
              onChange={handleInputChange}
              className="settings-input"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        {/* Notifications Toggle */}
        <div className="settings-field">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleInputChange}
              className="settings-checkbox"
            />
            Enable Notifications
          </label>
        </div>

        {/* Change Username */}
        <div className="settings-field">
          <label>
            Change Username:
            <input
              type="text"
              name="username"
              value={settings.username}
              placeholder="Enter new username"
              onChange={handleInputChange}
              className="settings-input"
            />
          </label>
        </div>

        {/* Change Password */}
        <div className="settings-field">
          <label>
            Change Password:
            <input
              type="password"
              name="password"
              value={settings.password}
              placeholder="Enter new password"
              onChange={handleInputChange}
              className="settings-input"
            />
          </label>
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={saveSettings}
          className="settings-button"
        >
          Save Settings
        </button>

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
    </div>
  );
};

export default SettingsTab;
