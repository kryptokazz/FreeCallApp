import React from 'react';
import { AuthProvider } from '@components/User/AuthContext'; // Updated import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from '@components/User/UserRegistrationForm'; // Updated import
import Dashboard from '@components/User/Dashboard'; // Updated import
import UserLoginForm from '@components/User/UserLoginForm'; // Updated import
import UserDataListing from '@components/User/UserDataListing'; // Updated import
import TopicCreationForm from '@components/Topic/TopicCreationForm'; // Updated import
import TopicDataListing from '@components/Topic/TopicDataListing'; // Updated import
import SetCreationForm from '@components/Set/SetCreationForm'; // Updated import
import SetDataListing from '@components/Set/SetDataListing'; // Updated import
import FieldCreationForm from '@components/Field/FieldCreationForm'; // Updated import
import FieldDataListing from '@components/Field/FieldDataListing'; // Updated import
import WordCreationForm from '@components/Word/WordCreationForm'; // Updated import
import WordDataListing from '@components/Word/WordDataListing'; // Updated import
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


