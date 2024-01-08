import React from 'react';
import { AuthProvider } from '@user/AuthContext'; // Updated import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from '@user/UserRegistrationForm'; // Updated import
import Dashboard from '@user/Dashboard'; // Updated import
import UserLoginForm from '@user/UserLoginForm'; // Updated import
import UserDataListing from '@user/UserDataListing'; // Updated import
import TopicCreationForm from '@topic/TopicCreationForm'; // Updated import
import TopicDataListing from '@topic/TopicDataListing'; // Updated import
import SetCreationForm from '@set/SetCreationForm'; // Updated import
import SetDataListing from '@set/SetDataListing'; // Updated import
import FieldCreationForm from '@field/FieldCreationForm'; // Updated import
import FieldDataListing from '@field/FieldDataListing'; // Updated import
import WordCreationForm from '@word/WordCreationForm'; // Updated import
import WordDataListing from '@word/WordDataListing'; // Updated import
import Home from './Home';



const App = () => {
  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistrationForm />} />
        <Route path="/user-login" element={<UserLoginForm />} />
        <Route path="/user-data" element={<UserDataListing />} />
        <Route path="/topic-creation" element={<TopicCreationForm />} />
	<Route path="/dashboard" element={<Dashboard />}/> 
        <Route path="/topic-data" element={<TopicDataListing />} />
        <Route path="/set-creation" element={<SetCreationForm />} />
        <Route path="/set-data" element={<SetDataListing />} />
        <Route path="/field-creation" element={<FieldCreationForm />} />
        <Route path="/field-data" element={<FieldDataListing />} />
        <Route path="/word-creation" element={<WordCreationForm />} />
        <Route path="/word-data" element={<WordDataListing />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;


