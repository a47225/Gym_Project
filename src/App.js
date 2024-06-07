import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import ExercisesDetail from './pages/ExercisesDetail';
import Home from './pages/Home';
import Navbar from './Components/Navbar.js';
import Food from './pages/foods.js';
import './App.css';


function App() {
  return (
  <Box width="100vw" m="auto" className="wrapper">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise/:id" element={<ExercisesDetail />} />
      <Route path="/food" element={<Food />} />
    </Routes>
  </Box>
  );
}




export default App;
