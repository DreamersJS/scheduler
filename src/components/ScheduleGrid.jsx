import React, { useState } from "react";
import EventForm from "./EventForm";
import Header from './Header';

const generateTimeSlots = (viewMode) => {
  const slots = [];
  const start = viewMode === "12H" ? 7 : 0;
  const end = viewMode === "12H" ? 19 : 24;

  for (let hour = start; hour < end; hour++) {
    slots.push(`${hour}:00 - ${hour}:30`);
    slots.push(`${hour}:30 - ${hour + 1}:00`);
  }
  return slots;
};

const ScheduleGrid = ({ viewMode }) => {
  const timeSlots = generateTimeSlots(viewMode);
  const [events, setEvents] = useState([]);  // Store events with unique ID
  const [edit, setEdit] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay();
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today.setDate(startOfWeek + i));
    return date;
  });

  const handleEdit = (day, slot) => {
    setSelectedSlot({ day, slot });
    setEdit(!edit);
  };

  const handleSaveEvent = (event) => {
    const newEvent = { ...event, id: Date.now() };  // Create a unique event ID
    setEvents([...events, newEvent]); // Add event to the list
  };

  const handleChangeColor = (eventId, color) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, color } : event
    ));
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 p-4">
        {daysOfWeek.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col">
            <div className="text-center font-semibold">{day.toLocaleDateString()}</div>
            {timeSlots.map((slot, index) => {
              const event = events.find(e => e.day === day && e.slot === slot);
              return (
                <div
                  key={index}
                  className="p-2 border rounded bg-white text-center"
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent event bubbling
                    handleEdit(day, slot);
                  }}
                  style={{ backgroundColor: event ? event.color : 'white' }}  // Background color
                >
                  {edit && selectedSlot?.day === day && selectedSlot?.slot === slot && (
                    <EventForm 
                      selectedDate={day}
                      selectedSlot={slot}
                      handleSaveEvent={handleSaveEvent}
                      handleChangeColor={handleChangeColor}
                      existingEvent={event}
                    />
                  )}
                  <div>{slot}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGrid;
