import React, { useState } from 'react'
import './App.css'
import ToggleView from "./components/ToggleView";
import ScheduleGrid from "./components/ScheduleGrid";
import Header from './components/Header';

function App() {
  const [viewMode, setViewMode] = useState("12H");
  
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Schedule App</h1>
        <ToggleView viewMode={viewMode} setViewMode={setViewMode} />
        {/* <Header/> */}
        <ScheduleGrid viewMode={viewMode} />
      </div>
    </>
  )
}

export default App
