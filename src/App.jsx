import React, { useState } from 'react';
import './App.css';
import ToggleView from "./components/ToggleView";
import ScheduleGrid from "./components/ScheduleGrid";
import { Paper } from '@mui/material';
import { Grid } from '@mui/system';

function App() {
  const [viewMode, setViewMode] = useState("12H");

  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysOfWeek = (date) => {
    const startOfWeek = date.getDate() - date.getDay();
    return Array.from({ length: 7 }, (_, i) =>
      new Date(date.getFullYear(), date.getMonth(), startOfWeek + i)
    );
  };

  const daysOfWeek = getDaysOfWeek(currentDate);

  const nextWeek = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  const prevWeek = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));


  return (
    <div className="min-h-screen p-4">
      <ToggleView viewMode={viewMode} setViewMode={setViewMode} />
      <button onClick={prevWeek}>Previous Week</button>
      <button onClick={nextWeek}>Next Week</button>

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
