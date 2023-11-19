import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FieldDataListing: React.FC = () => {
  const [fields, setFields] = useState([]);

const getField = async () => {
    try { 
        const response = await axios.get("http://localhost:5000/fields"); 
        setFields(response.data);
    } catch (err) {
        console.error(err.message);
    }
};
   



  useEffect(() => {
      getField();
  }, []);

  return (
    <div>
      <h2>Field Data Listing</h2>
      <ul>
        {fields.map((field) => (
          <li key={field.field_id}>{field.field_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FieldDataListing;
