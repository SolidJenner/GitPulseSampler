import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useSelector, useDispatch } from 'react-redux';
//импортируем компонент из redux
import infoReducer from './redux/GHPUserPage/infoReducers';
import UserInfoLayout from './redux/GHPUserPage/UserInfoLayout';
//стандартные хедеры
import Header from './partials/header';
import Footer from './partials/footer';

const store = createStore(infoReducer);


function User_Info() {
const { login } = useParams();
const [userData, setUserData] = useState(null);

useEffect(() => {
    console.log("react debug:" + login);
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
      <p>{userData && userData.name}</p>
      <p>{userData && userData.email}</p>
    </div>
    </div>

    {userData && userData.bio !== null && (
        <div className="card_wide">
          <div className="card-body text-center">
            <p>{userData && userData.bio}</p>
          </div>
        </div>
    )}

    </div>
</div>
<Footer />
</div>
);
}

export default User_Info;
