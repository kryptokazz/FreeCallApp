// src/routes/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserRegistrationForm from '@user/UserRegistrationForm';
import UserLoginForm from '@user/UserLoginForm';
import Dashboard from '@user/Dashboard';
import UserDataListing from '@user/UserDataListing';
import TopicCreationForm from '@topic/TopicCreationForm';
import TopicDataListing from '@topic/TopicDataListing';
import SetCreationForm from '@set/SetCreationForm';
import SetDataListing from '@set/SetDataListing';
import FieldCreationForm from '@field/FieldCreationForm';
import FieldDataListing from '@field/FieldDataListing';
import WordCreationForm from '@word/WordCreationForm';
import WordDataListing from '@word/WordDataListing';


const queryClient = new QueryClient();


const AppRouter = () => {
  return (
   <QueryClientProvider client={queryClient}> 
    <Router>
      <Routes>
        <Route path="/user-registration" element={<UserRegistrationForm />} />
        <Route path="/user-login" element={<UserLoginForm />} />
        <Route path="/user-data" element={<UserDataListing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topic-creation" element={<TopicCreationForm />} />
	<Route path="/topic-creation:topicId" element={<TopicCreationForm />} />
        <Route path="/topic-data" element={<TopicDataListing />} />
        <Route path="/set-creation" element={<SetCreationForm />} />
        <Route path="/set-data" element={<SetDataListing />} />
        <Route path="/field-creation" element={<FieldCreationForm />} />
        <Route path="/field-data" element={<FieldDataListing />} />
        <Route path="/word-creation" element={<WordCreationForm />} />
        <Route path="/word-data" element={<WordDataListing />} />
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={true} /> 
    </QueryClientProvider>
  );
};

export default AppRouter;

