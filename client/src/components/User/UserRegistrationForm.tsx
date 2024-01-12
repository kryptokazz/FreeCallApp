<<<<<<< HEAD
import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import './UserRegistrationForm.css';  // Assuming this is your styling file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


=======
import React from 'react';
import './UserRegistrationForm.css';
>>>>>>> parent of c8e070f2 (	modified:   UserRegistrationForm.css)

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
<<<<<<< HEAD
            <button type="submit" className="submit-btn" disabled={!validName || !validPwd || !validMatch}>
              Create Account
            </button>
            {errMsg && <div className="error-msg">{errMsg}</div>}
            {success && (
              <div className="success-msg">
                Account created successfully! <a href="#">Sign In</a>
              </div>
            )}
=======
            <button type="submit" className="submit-btn">Create Account</button>
>>>>>>> parent of c8e070f2 (	modified:   UserRegistrationForm.css)
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;

