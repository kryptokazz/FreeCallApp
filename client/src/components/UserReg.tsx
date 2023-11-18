// UserRegistrationForm.jsx
import React, { useState } from 'react';

const UserRegistrationForm = () => {
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
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, profile_name: 'default' }), // Provide a default value for profile_name
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || password !== confirmPassword) {
      setErrorMessage('Please fill in all fields and ensure passwords match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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

