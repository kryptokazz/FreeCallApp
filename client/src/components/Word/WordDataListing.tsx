import React, { useEffect, useState } from 'react';
import './WordDataListing.css';
import DataListing from '@data/DataListing';



const WordDataListing: React.FC = () => {
  return (
	  <DataListing 
	  endpoint="words"
	  keyField="word_id"
	  displayField="word_name"
	  title="Words Data Listing"
	  />
  );
};

export default WordDataListing;

