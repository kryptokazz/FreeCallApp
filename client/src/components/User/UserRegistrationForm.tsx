// UserRegistrationForm.jsx
import React, { useState } from 'react';
import './UserRegistrationForm.css';



const UserRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileName, setProfileName] = useState(''); // Added state for profile name
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || password !== confirmPassword || !profileName || !email) {
      setErrorMessage('Please fill in all fields and ensure passwords match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, profile_name: profileName, email }),
      });

      if (response.ok) {
        // Handle successful registration, e.g., redirect to a new page
        console.log('Registration successful');
      } else {
        // Handle failed registration, display an error message
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>
          Username:
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div className="form-field">
        <label>
          Password:
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="form-field">
        <label>
          Confirm Password:
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="form-field">
        <label>
          Profile Name:
          <input
            className="form-input"
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
        </label>
     </div>
       <div className="form-field">
        <label>
          Email:
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
     </div>
      <button className="form-button" type="submit">Register</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default UserRegistrationForm;

