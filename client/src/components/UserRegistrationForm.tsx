import React, { useState } from 'react';

const UserRegistrationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profileName, setProfileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform logic to submit the form data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Profile Name:
        <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegistrationForm;
