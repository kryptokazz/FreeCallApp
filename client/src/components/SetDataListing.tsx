import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SetDataListing  = () => {
  const [sets, setSets] = useState([]);

const getSet = async () => {
    try {
        const response = await axios.get("http://localhost:5000/sets"); 
        setSets(response.data);
    } catch (err) {
        console.error(err.message);
    }
};


  useEffect(() => {
      getSet();
  }, []);

  return (
    <div>
      <h2>Set Data Listing</h2>
      <ul>
        {sets.map((set) => (
          <li key={set.set_id}>{set.set_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SetDataListing;

