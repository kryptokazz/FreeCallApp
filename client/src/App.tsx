import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserLoginForm from './components/UserLoginForm';
import UserDataListing from './components/UserDataListing';
import TopicCreationForm from './components/TopicCreationForm';
import TopicDataListing from './components/TopicDataListing';
import SetCreationForm from './components/SetCreationForm';
import SetDataListing from './components/SetDataListing';
import FieldCreationForm from './components/FieldCreationForm';
import FieldDataListing from './components/FieldDataListing';
import WordCreationForm from './components/WordCreationForm';
import WordDataListing from './components/WordDataListing';


function App() {
  return (
    <>
      <UserRegistrationForm />
      <UserLoginForm />
      <UserDataListing />
      <TopicCreationForm />
      <TopicDataListing />
      <SetCreationForm />
      <SetDataListing />
      <FieldCreationForm />
      <FieldDataListing />
      <WordCreationForm />
      <WordDataListing />

         </>
  );
}; 

export default App;


