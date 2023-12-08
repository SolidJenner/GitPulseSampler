import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [randomUsersArray, setRandomUsersArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/gitapi/random-users');
        setRandomUsersArray(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Random GitHub Users</h1>
      <ul>
        {randomUsersArray.map(user => (
          <li key={user.id}>
            <img src={user.avatarUrl} alt={user.login} />
            {user.login} {user.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
