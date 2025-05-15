import React, { useState } from 'react';
import './App.css';
import ToggleView from "./components/ToggleView";
import ScheduleGrid from "./components/ScheduleGrid";
import { Grid, Paper } from '@mui/material';

function App() {
  const [viewMode, setViewMode] = useState("12H");

  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay();
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    return new Date(today.getFullYear(), today.getMonth(), startOfWeek + i);
  });

  return (
    <div className="min-h-screen p-4">
      {/* <h1 className="text-2xl font-bold text-center mb-4">Schedule App</h1> */}
      <ToggleView viewMode={viewMode} setViewMode={setViewMode} />

      <div className="grid grid-cols-1 md:grid-rows-7 gap-4 p-4 m-2">
      <Grid container columns={7} spacing={2}>
        {daysOfWeek.map((day, index) => (

          <Grid 
          day={day} 
          key={index} 
          xs={1}
        >
          <Paper elevation={2} style={{ padding: 16, textAlign: 'center' }}>
          <ScheduleGrid key={index} viewMode={viewMode} day={day} />
          </Paper>
        </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
}

export default App;
