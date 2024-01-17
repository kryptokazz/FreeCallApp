import React from 'react';
import AppRouter from './routes';
import DataListing from '@data/DataListing'; 
import { AuthProvider } from '@user/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from '@user/UserRegistrationForm';
import Dashboard from '@user/Dashboard';
import UserLoginForm from '@user/UserLoginForm';
import UserDataListing from '@user/UserDataListing';
import TopicCreationForm from '@topic/TopicCreationForm';
import TopicDataListing from '@topic/TopicDataListing';
import SetCreationForm from '@set/SetCreationForm';
import SetDataListing from '@set/SetDataListing';
import FieldCreationForm from '@field/FieldCreationForm';
import FieldDataListing from '@field/FieldDataListing';
import WordCreationForm from '@word/WordCreationForm';
import WordDataListing from '@word/WordDataListing';
import Home from './Home';
import Endpoint from './Endpoint';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
	<Route path="/endpoint" element={<Endpoint/>} />
	<Route path="datalisting" element={<DataListing/>} /> 
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
    </Router>
    </AuthProvider>
  );
};

export default App;


