import React, { useState } from "react";
import EventForm from "./EventForm";
import { Modal, Box } from "@mui/material";
import { to24Hour } from "../service/utils";

export const isSlotWithinEvent = (slot, event) => {
  const [slotStart, slotEnd] = slot.split(' - ').map(s => s.trim());

  // Ensure the event has valid time info
  if (!event.startTime || !event.endTime) return false;

  return (
    slotEnd > event.startTime && slotStart < event.endTime
  );
};

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenModal = (slot) => {
    const event = events.find(e => {
      if (e.day.getTime() !== day.getTime()) return false;

      const [slotStartStr, slotEndStr] = slot.split(' - ').map(s => s.trim());
      const eventStart = e.startTime;
      const eventEnd = e.endTime;

      return (
        slotStartStr >= eventStart && slotStartStr < eventEnd
      );
    });

    setSelectedSlot(slot);
    setSelectedEvent(event || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (event) => {
    const newEvent = { ...event, id: Date.now(), day };
    setEvents([...events, newEvent]);
    handleCloseModal();
  };

  const handleChangeColor = (eventId, color) => {
    setEvents(events.map((event) =>
      event.id === eventId ? { ...event, color } : event
    ));
  };

  return (
    <div className="p-2 bg-white w-full md:w-1/7">
      <h2 className="text-center font-semibold text-sm">
        {day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
      </h2>

      <div className="mt-2">
  {timeSlots.map((slot, index) => {
    // Parse current slot start and end
    const [slotStartStr, slotEndStr] = slot.split(' - ').map(s => to24Hour(s.trim()));

    // Find event starting exactly at this slot
    const event = events.find(e => 
      e.day?.getTime?.() === day.getTime() &&
      e.startTime === slotStartStr
    );

    // If this time slot is already covered by a previous event, skip rendering
    const isCoveredByOther = events.some(e => {
      if (e === event) return false;
      const startsBefore = e.startTime <= slotStartStr;
      const endsAfter = e.endTime > slotStartStr;
      return e.day?.getTime?.() === day.getTime() && startsBefore && endsAfter;
    });
    if (isCoveredByOther) return null;

    if (event) {
      // Calculate how many slots to span visually (30min = 1 slot)
      const start = parseInt(event.startTime.replace(":", ""), 10);
      const end = parseInt(event.endTime.replace(":", ""), 10);
      const durationInMinutes =
        (parseInt(event.endTime.split(":")[0]) * 60 + parseInt(event.endTime.split(":")[1])) -
        (parseInt(event.startTime.split(":")[0]) * 60 + parseInt(event.startTime.split(":")[1]));
      const slotHeight = 40; // Each slot is e.g., 40px tall
      const eventHeight = (durationInMinutes / 30) * slotHeight;

      return (
        <div
          key={index}
          className="p-2 text-center cursor-pointer"
          onClick={() => handleOpenModal(slot)}
          style={{
            backgroundColor: event.color,
            height: `${eventHeight}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2px",
          }}
        >
          <div className="text-xs font-semibold">{event.startTime} - {event.endTime}</div>
          <div className="text-sm text-gray-800">{event.eventInfo}</div>
        </div>
      );
    }

    // Fallback: render empty slot
    return (
      <div
        key={index}
        className="p-2 text-center cursor-pointer"
        onClick={() => handleOpenModal(slot)}
        style={{ backgroundColor: "white", height: "40px", marginBottom: "2px" }}
      >
        {slot}
      </div>
    );
  })}
</div>


      {/* Modal for event form */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedSlot && (
            <EventForm
              selectedDate={day}
              selectedSlot={selectedSlot}
              handleSaveEvent={handleSaveEvent}
              handleChangeColor={handleChangeColor}
              existingEvent={selectedEvent}
              handleClose={handleCloseModal}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ScheduleGrid;

