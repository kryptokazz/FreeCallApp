// UserLoginForm.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserLoginForm.css';

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful login, e.g., redirect or store authentication token
        console.log('Login successful');

        // Redirect to a different page after successful login
        navigate('/dashboard');
      } else {
        // Handle failed login, display an error message
        const errorData = await response.json().catch(() => null); // Handle non-JSON response
        setErrorMessage(errorData?.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Internal server error');
    }
  };

  const handleLogout = () => {
    // Implement logout logic here (clear tokens, reset state, etc.)
    // For simplicity, let's just navigate to the home page for demonstration purposes.
    navigate('/');
  };

  return (
    <div className="container">
      <div className="info-section">
        {/* You can add branding content here, similar to the signup form */}
        <h1>Welcome Back!</h1>
      </div>
      <div className="form-section">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
        {/* Logout button */}
        <div className="logout-section">
          <Link to="/" onClick={handleLogout}>
            <button className="logout-btn">Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;

