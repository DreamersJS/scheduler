import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import ScheduleView from './components/ScheduleView';

function App() {

  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/schedule" />} />
        <Route path="/schedule" element={<ScheduleView />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
