// Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Ensure this path is correct

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here (clear tokens, reset state, etc.)
    // For simplicity, let's just navigate to the home page for demonstration purposes.
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-content">
        <div className="widget">
          <h2>Recent Activity</h2>
          {/* Add your recent activity content or components here */}
        </div>
        <div className="widget">
          <h2>Statistics</h2>
          {/* Add your statistics content or components here */}
        </div>
        <div className="widget">
          <h2>Notifications</h2>
          {/* Add your notifications content or components here */}
        </div>
      </div>
      {/* Logout button */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

