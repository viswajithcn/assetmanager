import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
}

export default App;
