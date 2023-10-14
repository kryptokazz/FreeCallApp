import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserDataListing: React.FC = () => {
  const [users, setUsers] = useState([]);


   const getUser = async () => {
       try {
           const response = await axios.get("http://localhost:5000/users");
           setUsers(response.data);
       } catch (err) {
           console.error(err.message);
       }
   };






  useEffect(() => {
   getUser();   
  }, []);

  return (
    <div>
      <h2>User Data Listing</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDataListing;
