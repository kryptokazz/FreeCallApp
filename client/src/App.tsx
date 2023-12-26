// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from './components/User/UserRegistrationForm';
import UserLoginForm from './components/User/UserLoginForm';
import UserDataListing from './components/User/UserDataListing';
import TopicCreationForm from './components/Topic/TopicCreationForm';
import TopicDataListing from './components/Topic/TopicDataListing';
import SetCreationForm from './components/Set/SetCreationForm';
import SetDataListing from './components/Set/SetDataListing';
import FieldCreationForm from './components/Field/FieldCreationForm';
import FieldDataListing from './components/Field/FieldDataListing';
import WordCreationForm from './components/Word/WordCreationForm';
import WordDataListing from './components/Word/WordDataListing';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistrationForm />} />
        <Route path="/user-login" element={<UserLoginForm />} />
        <Route path="/user-data" element={<UserDataListing />} />
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

export default App;


