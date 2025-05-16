import React, { useState, useEffect } from 'react';

const EventForm = ({ selectedDate, selectedSlot, handleSaveEvent, handleChangeColor, existingEvent }) => {
  const [event, setEvent] = useState({
    date: selectedDate.toLocaleDateString(),
    slot: selectedSlot,
    startTime: '',
    endTime: '',
    eventType: 'event',
    customType: '',
    eventInfo: '',
    color: existingEvent ? existingEvent.color : '#ffffff',  // Set color for existing event
  });

  useEffect(() => {
    if (existingEvent) {
      setEvent(existingEvent);
    }
  }, [existingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleColorChange = (e) => {
    setEvent({ ...event, color: e.target.value });
    handleChangeColor(event.id, e.target.value); // Update color in parent state
  };

  const handleEventTypeChange = (e) => {
    const { value } = e.target;
    if (value !== 'custom') {
      setEvent({ ...event, eventType: value, customType: '' });
    } else {
      setEvent({ ...event, eventType: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveEvent(event);
  };

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <div>
        <label htmlFor="date">Event Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* starting hour */}
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={event.startTime}
          onChange={handleChange}
          required
        />
      </div>

      {/* ending hour */}
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={event.endTime}
          onChange={handleChange}
          required
        />
      </div>
{/* Event Type - may even delete it later */}
      <div>
        <label htmlFor="eventType">Event Type:</label>
        <select
          id="eventType"
          name="eventType"
          value={event.eventType}
          onChange={handleEventTypeChange}
          required
        >
          <option value="event">Event</option>
          <option value="meeting">Meeting</option>
          <option value="lecture">Lecture</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {event.eventType === 'custom' && (
        <div>
          <label htmlFor="customType">Custom Event Type:</label>
          <input
            type="text"
            id="customType"
            name="customType"
            value={event.customType || ''}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="eventInfo">Event Info:</label>
        <textarea
          id="eventInfo"
          name="eventInfo"
          value={event.eventInfo}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>

      <div>
        <label htmlFor="color">Event Background Color:</label>
        <input
          type="color"
          id="color"
          name="color"
          value={event.color}
          onChange={handleColorChange}
        />
      </div>

      <div>
        <button type="submit">Save Event</button>
      </div>
    </form>
  );
};

export default EventForm;
