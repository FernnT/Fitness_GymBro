import React, { useState } from "react";
import "./App.css";

const WorkoutInputPage = () => {
  const [formData, setFormData] = useState({
    exerciseName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    distance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Workout Data:", formData);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <h1 className="page-header">Add Workout</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="form-container">
        {/* Exercise Name */}
        <div className="form-group">
          <label>Exercise Name</label>
          <input
            type="text"
            name="exerciseName"
            value={formData.exerciseName}
            onChange={handleChange}
            placeholder="E.g., Bench Press"
          />
        </div>

        {/* Sets */}
        <div className="form-group">
          <label>Sets</label>
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            placeholder="E.g., 3"
          />
        </div>

        {/* Reps */}
        <div className="form-group">
          <label>Reps</label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            placeholder="E.g., 12"
          />
        </div>

        {/* Weight */}
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="E.g., 50"
          />
        </div>

        {/* Duration */}
        <div className="form-group">
          <label>Duration (min)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="E.g., 30"
          />
        </div>

        {/* Distance */}
        <div className="form-group">
          <label>Distance (km)</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="E.g., 5"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Save Workout
        </button>
      </form>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <span className="nav-icon">🏠</span>
        <span className="nav-icon active">🏋️</span>
        <span className="nav-icon">⚙️</span>
      </div>
    </div>
  );
};

export default WorkoutInputPage;
