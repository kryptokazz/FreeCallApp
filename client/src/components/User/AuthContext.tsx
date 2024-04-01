
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface UserData {
  username: string;
  password: string;
  // Add more properties as needed
}

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = async (userData: UserData) => {
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
      console.error('Error during login:', (error as Error).message);
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

