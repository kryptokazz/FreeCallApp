// UserRegistrationForm.jsx
import React, { useState } from 'react';

const UserRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileName, setProfileName] = useState(''); // Added state for profile name
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || password !== confirmPassword || !profileName) {
      setErrorMessage('Please fill in all fields and ensure passwords match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, profile_name: profileName }),
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <label>
        Profile Name:
        <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
      </label>
      <button type="submit">Register</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default UserRegistrationForm;

