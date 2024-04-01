
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@user/AuthContext';
import Home from '@home';
import Endpoint from '@endpoint';
import FlashCardComponent from '@logic/FlashCardComponent';
import UserRegistrationForm from '@user/UserRegistrationForm';
import UserLoginForm from '@user/UserLoginForm';
import SetCreationForm from '@set/SetCreationForm';
import FieldCreationForm from '@field/FieldCreationForm';
import WordCreationForm from '@word/WordCreationForm';
import Dashboard from '@user/Dashboard';

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/endpoint" element={<Endpoint />} />
          <Route path="/user-registration" element={<UserRegistrationForm />} />
          <Route path="/logic" element={<FlashCardComponent />} />
          <Route path="/user-login" element={<UserLoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/set-creation"
            element={<SetCreationForm topicId="123" />} // Assuming topicId is passed correctly
          />
          <Route path="/field-creation" element={<FieldCreationForm />} />
          <Route path="/word-creation" element={<WordCreationForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;

