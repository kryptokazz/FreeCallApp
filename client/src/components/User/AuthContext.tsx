import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: userData.username,
        password: userData.password,
      });

      if (response.status === 200) {
        // Update the user state with the user data received from the server
        setUser(response.data);

        // Store the authentication token in localStorage or cookies if applicable
        // Example assuming the server returns a token in the response
        const token = response.data.token;
        localStorage.setItem('authToken', token);
      } else {
        // Handle other response statuses or errors
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error during login:', error.message);
    }
  };

  const logout = () => {
    // Clear the user state
    setUser(null);

    // Remove the authentication token from localStorage or cookies if applicable
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

