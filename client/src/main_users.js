import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './partials/header';
import Footer from './partials/footer';

function Main_users() {
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
<Header />
<div class="MPContainer">
<div class="row justify-content-center">

{randomUsersArray.map(user => (
<div class="card">
                <div class="card-header">User ID {user.id}</div>
                <div class="card-body text-center">
                <img class="img-account-profile rounded-circle mb-2 user_avatar" src={user.avatarUrl} alt=""></img>
<div class="card-body">
    <h5 class="card-title">{user.login}</h5>
    <p class="card-text">{user.id}</p>
    <p class="card-text">Email: johndoe@example.com</p>
</div>
</div>
</div>
))}
</div>
</div>
<Footer />
</div>
  );
}

export default Main_users;
