import React, { useState } from 'react';
import './App.css';
import ToggleView from "./components/ToggleView";
import ScheduleGrid from "./components/ScheduleGrid";
import { Paper } from '@mui/material';
import { Grid } from '@mui/system';

function App() {
  const [viewMode, setViewMode] = useState("12H");

  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay();
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    return new Date(today.getFullYear(), today.getMonth(), startOfWeek + i);
  });

  return (
    <div className="min-h-screen p-4">
      <ToggleView viewMode={viewMode} setViewMode={setViewMode} />

      <div className="w-full" >
      <Grid container columns={7} spacing={2}>
        {daysOfWeek.map((day, index) => (
          <Grid key={index} columnSpan={{ xs: 7, sm: 1 }}>
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
