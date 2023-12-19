import React, { useState } from 'react';
import './UserLoginForm.css'; // Adjust the path if necessary


const UserLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || password !== confirmPassword) {
      setErrorMessage('Please fill in all fields and ensure passwords match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, profile_name: 'default' }),
      });

      if (response.ok) {
        // Handle successful registration, e.g., redirect to a new page
        console.log('Registration successful');
      } else {
        // Handle failed registration, display an error message
        const errorData = await response.json().catch(() => null); // Handle non-JSON response
        setErrorMessage(errorData?.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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
      <button type="submit">Register</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default UserLoginForm;

