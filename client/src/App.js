import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main_users from './main_users';
import User_Info from './user_detailed';


//настраиваем роутинг
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main_users />} />
        <Route path="/users/:login" element={<User_Info />} />
      </Routes>
    </Router>
  );
}

export default App;
