import React, { useState } from 'react';
import './App.css';
import ToggleView from "./components/ToggleView";
import ScheduleGrid from "./components/ScheduleGrid";
import { Paper } from '@mui/material';
import { Grid } from '@mui/system';

function App() {
  const [viewMode, setViewMode] = useState("12H");
  const [weekOffset, setWeekOffset] = useState(0);

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  };
  
  const startOfWeek = getStartOfWeek(new Date(new Date().setDate(new Date().getDate() + weekOffset * 7)));
  
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
  

  return (
    <div className="min-h-screen p-4">
      <ToggleView viewMode={viewMode} setViewMode={setViewMode} />
      <div className="flex justify-center mb-4 gap-2">
  <button onClick={() => setWeekOffset(weekOffset - 1)}>← Prev Week</button>
  <button onClick={() => setWeekOffset(0)}>Today</button>
  <button onClick={() => setWeekOffset(weekOffset + 1)}>Next Week →</button>
</div>


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
