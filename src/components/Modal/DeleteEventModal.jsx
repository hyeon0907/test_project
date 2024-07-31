import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DeleteEventModal({ isOpen, onRequestClose, onDeleteEvent, eventDetails }) {
  const handleDeleteEvent = () => {
    onDeleteEvent(eventDetails.date);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Event"
    >
      <h2>Are you sure you want to delete this event?</h2>
      <p>{eventDetails.event}</p>
      <button onClick={handleDeleteEvent}>Delete</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
}

export default DeleteEventModal;
