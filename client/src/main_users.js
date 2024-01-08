import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useSelector, useDispatch } from 'react-redux';
//импортируем компонент из redux
import userReducer from './redux/GHPMainPage/userReducers';
import UserCardComponent from './redux/GHPMainPage/UserCardComponent';
//стандартные хедеры
import Header from './partials/header';
import Footer from './partials/footer';


//создаём reduxstore на 10 разных карточек
const UserCardStores = Array.from({ length: 10 }, () => createStore(userReducer));

function Main_users() {
    document.title = "Главная страница - GitPulseSampler";

return (
<div>
<Header />
<div class="MPContainer">
<div class="row justify-content-center">
        {UserCardStores.map((store) => (
        <Provider store={store}>
          <UserCardComponent />
        </Provider>
    ))}
    </div>
  </div>
  <Footer />
</div>

);
}

export default Main_users;
