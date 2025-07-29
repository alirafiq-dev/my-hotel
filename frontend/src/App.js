import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiamondAliPortfolio from './components/DiamondAliPortfolio';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DiamondAliPortfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;