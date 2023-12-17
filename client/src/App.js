import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main_users from './main_users';


//настраиваем роутинг
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main_users />} />
      </Routes>
    </Router>
  );
}

export default App;
