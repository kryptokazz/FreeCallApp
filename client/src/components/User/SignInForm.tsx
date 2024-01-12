import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

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

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('Login successful', data);
      // Invalidate and refetch relevant queries after successful login
      queryClient.invalidateQueries('user'); // Replace 'user' with your user data query key
    },
    onError: (error) => {
      console.error('Error during login:', error);
      // Handle error as needed
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      // Handle validation error
      return;
    }

    // Initiate the mutation
    mutation.mutate({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
    </form>
  );
};

export default SignInForm;

