import React, { useState } from 'react'

const Header = () => {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay(); // Get the start date of the current week (Sunday)
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today.setDate(startOfWeek + i));
      return {
        date: date.toLocaleDateString(), // e.g. "1/31/2025"
        day: date.toLocaleString('en-US', { weekday: 'long' }), // e.g. "Friday"
      };
    });
  
    return (
      <header>
        <div className="flex justify-between mb-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center">
              <div>{day.day}</div>
              <div>{day.date}</div>
            </div>
          ))}
        </div>
      </header>
    );
  };
  
  export default Header;
  