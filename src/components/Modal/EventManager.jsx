import React, { useState } from 'react';
import AddEventModal from './AddEventModal';
import EditEventModal from './EditEventModal';
import DeleteEventModal from './DeleteEventModal';
import './style.css'; // 추가한 CSS 파일을 import 합니다

function EventManager() {
  const [events, setEvents] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const addEvent = (eventText) => {
    const eventDate = new Date().toISOString();
    setEvents({
      ...events,
      [eventDate]: eventText,
    });
    setIsAddModalOpen(false);
  };

  const editEvent = (date, eventText) => {
    setEvents({
      ...events,
      [date]: eventText,
    });
    setIsEditModalOpen(false);
  };

  const deleteEvent = (date) => {
    const newEvents = { ...events };
    delete newEvents[date];
    setEvents(newEvents);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="event-manager">
      <div className="event-input-container">
        <button onClick={openAddModal}>Add Event</button>
        <button onClick={openEditModal}>Edit Event</button>
        <button onClick={openDeleteModal}>Delete Event</button>
      </div>
      <div className="events-list">
        <h3>Events</h3>
        <ul>
          {Object.keys(events).map((eventDate) => (
            <li key={eventDate}>
              {events[eventDate]}
            </li>
          ))}
        </ul>
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onRequestClose={closeModal}
        onAddEvent={addEvent}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onRequestClose={closeModal}
        onEditEvent={editEvent}
        events={events}
      />

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModal}
        onDeleteEvent={deleteEvent}
        events={events}
      />
    </div>
  );
}

export default EventManager;
