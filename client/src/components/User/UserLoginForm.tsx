import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import './UserLoginForm.css';

const loginUser = async ({ username, password }) => {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials in the request
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Login failed');
  }

  return response.json();
};

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const mutation = useMutation(loginUser, {
    onSuccess: () => {
      console.log('Login successful');
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Error during login:', error);
      setErrorMessage(error.message || 'Internal server error');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    mutation.mutate({ username, password });
  };  return (

    <section className="container">
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
	</div>
    </section>
  );
};

export default UserLoginForm;

