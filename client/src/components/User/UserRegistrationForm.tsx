import React from 'react';
import './UserRegistrationForm.css';

const UserRegistrationForm = () => {
  return (
    <div className="container">
      <div className="branding-section">
        {/* Branding content */}
        <h1>Welcome to Our Service</h1>
      </div>
      <div className="form-section">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" required />
            </div>
            <button type="submit" className="submit-btn">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;

