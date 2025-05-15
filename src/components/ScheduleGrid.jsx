import React, { useState } from "react";
import EventForm from "./EventForm";

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

const ScheduleGrid = ({ viewMode, day }) => {
  const timeSlots = generateTimeSlots(viewMode);
  const [events, setEvents] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleEdit = (slot) => {
    setSelectedSlot({ day, slot });
    setEdit(!edit);
  };

  const handleSaveEvent = (event) => {
    const newEvent = {  ...event, id: Date.now(), day };
    setEvents([...events, newEvent]);
  };

  const handleChangeColor = (eventId, color) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, color } : event
    ));
  };

  return (
    <div className="p-2 bg-white w-full md:w-1/7">
      <h2 className="text-center">
        {day.toLocaleDateString()} ({day.toLocaleString('en-US', { weekday: 'long' })})
      </h2>
      <div className="mt-2">
        {timeSlots.map((slot, index) => {
          const event = events.find(e => e.day.getTime() === day.getTime() && e.slot === slot);
          return (
            <div
              key={index}
              className="p-2 text-center cursor-pointer"
              onClick={() => handleEdit(slot)}
              style={{ backgroundColor: event ? event.color : 'white' }}
            >
              {edit && selectedSlot?.slot === slot && (
                <EventForm 
                  selectedDate={day}
                  selectedSlot={slot}
                  handleSaveEvent={handleSaveEvent}
                  handleChangeColor={handleChangeColor}
                  existingEvent={event}
                />
              )}
              {slot}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleGrid;
