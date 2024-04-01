import React, { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';


interface User {
        user_id: number;
        username: string;
}





const UserDataListing: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);


   const getUser = async () => {
       try {
           const response: AxiosResponse<User[]> = await axios.get("http://localhost:5000/users");
           setUsers(response.data);
       } catch (err: any) {
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
