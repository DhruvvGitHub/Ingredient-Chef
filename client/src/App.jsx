import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Fridge from './pages/Fridge';
import RecipeBox from './pages/RecipeBox';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Fridge />} />
          <Route path="/box" element={<RecipeBox />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
