// src/routes/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from '../components/UserRegistrationForm';
import UserLoginForm from '../components/UserLoginForm';
import Dashboard from '../components/Dashboard';
import UserDataListing from '../components/UserDataListing';
import TopicCreationForm from '../components/TopicCreationForm';
import TopicDataListing from '../components/TopicDataListing';
import SetCreationForm from '../components/SetCreationForm';
import SetDataListing from '../components/SetDataListing';
import FieldCreationForm from '../components/FieldCreationForm';
import FieldDataListing from '../components/FieldDataListing';
import WordCreationForm from '../components/WordCreationForm';
import WordDataListing from '../components/WordDataListing';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user-registration" element={<UserRegistrationForm />} />
        <Route path="/user-login" element={<UserLoginForm />} />
        <Route path="/user-data" element={<UserDataListing />} />
	<Router path="/dashboard" element={<Dashboard /> } /> 
        <Route path="/topic-creation" element={<TopicCreationForm />} />
        <Route path="/topic-data" element={<TopicDataListing />} />
        <Route path="/set-creation" element={<SetCreationForm />} />
        <Route path="/set-data" element={<SetDataListing />} />
        <Route path="/field-creation" element={<FieldCreationForm />} />
        <Route path="/field-data" element={<FieldDataListing />} />
        <Route path="/word-creation" element={<WordCreationForm />} />
        <Route path="/word-data" element={<WordDataListing />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

