
import React from 'react';
import { Link } from 'react-router-dom';
import './Endpoint.css'; // Make sure this path is correct

const Endpoint: React.FC = () => {
  return (
    <div className="endpoint-container">
      <h1>Welcome to FreeCallApp</h1>
      <nav className="navigation-menu">
        <ul>
          <li><Link to="/user-registration">User Registration</Link></li>
          <li><Link to="/user-login">User Login</Link></li>
          <li><Link to="/set-creation">Set Creation</Link></li>
          <li><Link to="/field-creation">Field Creation</Link></li>
          <li><Link to="/word-creation">Word Creation</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Endpoint;

