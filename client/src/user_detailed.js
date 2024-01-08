import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useSelector, useDispatch } from 'react-redux';
//импортируем компонент из redux
import creducer from './redux/GHP_UP_Contributions/creducer';
import { setUsername } from './redux/GHP_UP_Contributions/cactions';
import ContributionChart from './redux/GHP_UP_Contributions/cgcomponent';
//стандартные хедеры
import Header from './partials/header';
import Footer from './partials/footer';

const store = createStore(creducer);


function User_Info() {
const { login } = useParams();
const [userData, setUserData] = useState(null);

useEffect(() => {
    axios
      .get(`http://localhost:3001/gitapi/userinfo/${login}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [login]);

  document.title = login + " - пользователь - GitPulseSampler";



return (
<div>
<Header />
<div>
    <div>
    <div className='card_wide'>
      <div className="card-header text-center"> <h1>{userData && userData.login}</h1></div>
      <hr></hr>
      <div className="card-body text-center">
      <img className="img-account-profile rounded-circle mb-2 user_avatar" src={userData && userData.avatarUrl} alt="" />
      <br></br>
      <p>{userData && userData.type}</p>
      {userData && userData.company !== null && (
      <p>{userData && userData.company}</p>
    )}
      <p>{userData && userData.name}</p>
      <p>{userData && userData.location}</p>
      {userData && userData.company !== null && (
      <p>{userData && userData.email}</p>
      )}
      <p>Публичных репозиториев: {userData && userData.public_repos}</p>
    {userData && userData.hireable !== null && (
      <p>Ищет работу</p>
      )}
    
    {userData && userData.following !== 0 && (
      <span>Следует за {userData && userData.following} пользователями, </span>
      )}
    {userData && userData.followers !== 0 && (
      <span>за ним следят {userData && userData.followers} пользователей</span>
      )}
    
    </div>
    </div>

    {userData && userData.bio !== null && (
        <div className="card_wide">
          <div className="card-body text-center">
            <p>{userData && userData.bio}</p>
          </div>
        </div>
    )}

<div className="card_wide button_sec">
          <div className="card-body text-center">
    {userData && userData.html_url !== null && (
      <a href={userData && userData.html_url } class="btn btn-primary">К профилю на гитхаб</a>
      )}
    {userData && userData.blog !== '' && (
      <a href={userData && userData.blog } class="btn btn-primary">К блогу</a>
      )}
      
          </div>
</div>

<Provider store={store}>
<ContributionChart />
</Provider>

    </div>
</div>
<Footer />
</div>
);
}

export default User_Info;
