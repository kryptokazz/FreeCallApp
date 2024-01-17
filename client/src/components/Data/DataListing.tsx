// File: /src/components/DataListing/DataListing.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ListingProps {
  endpoint: string;
  keyField: string;
  displayField: string;
  title?: string; 
}

const DataListing: React.FC<ListingProps> = ({ endpoint, keyField, displayField, title = 'All Data Listing' }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${endpoint}`);
      setData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {data.map((item) => (
          <li key={item[keyField]}>{item[displayField]}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataListing;

