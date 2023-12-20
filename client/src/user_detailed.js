import React from 'react';
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
return (
<div>
<Header />
<Provider store={store} user_login={login}>
<UserInfoLayout />
</Provider>
<Footer />
</div>
);
}

export default User_Info;
