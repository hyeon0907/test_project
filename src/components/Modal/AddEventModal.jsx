import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AddEventModal({ isOpen, onRequestClose, onAddEvent }) {
  const [eventText, setEventText] = useState('');

  const handleAddEvent = () => {
    if (eventText) {
      onAddEvent(eventText);
      setEventText('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Event"
    >
      <h2>Add Event</h2>
      <input
        type="text"
        value={eventText}
        onChange={(e) => setEventText(e.target.value)}
        placeholder="Enter event details"
      />
      <button onClick={handleAddEvent}>Add</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default AddEventModal;
