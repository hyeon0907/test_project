import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EditEventModal({ isOpen, onRequestClose, onEditEvent, events }) {
  const [selectedEventDate, setSelectedEventDate] = useState('');
  const [eventText, setEventText] = useState('');

  useEffect(() => {
    if (selectedEventDate) {
      setEventText(events[selectedEventDate]);
    }
  }, [selectedEventDate, events]);

  const handleEditEvent = () => {
    if (eventText) {
      onEditEvent(selectedEventDate, eventText);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Event"
    >
      <h2>Edit Event</h2>
      <select
        value={selectedEventDate}
        onChange={(e) => setSelectedEventDate(e.target.value)}
      >
        <option value="">Select an event</option>
        {Object.keys(events).map((eventDate) => (
          <option key={eventDate} value={eventDate}>
            {events[eventDate]}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={eventText}
        onChange={(e) => setEventText(e.target.value)}
        placeholder="Edit event details"
      />
      <button onClick={handleEditEvent}>Save</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default EditEventModal;
