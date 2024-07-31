import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import './style.css'; // 추가한 CSS 파일을 import 합니다

Modal.setAppElement('#root');

const CalendarModal = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventText, setEventText] = useState('');

  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);
    setEventText(events[selectedDate.toISOString().split('T')[0]] || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventText('');
  };

  const saveEvent = () => {
    const eventDate = date.toISOString().split('T')[0];
    setEvents({
      ...events,
      [eventDate]: eventText,
    });
    setIsModalOpen(false);
  };

  // 일정 삭제
  const deleteEvent = () => {
    const eventDate = date.toISOString().split('T')[0];
    const updatedEvents = { ...events };
    delete updatedEvents[eventDate];
    setEvents(updatedEvents);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
        <div className="calendar-container">
            <Calendar
                locale="kr"
                onChange={setDate}
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false}
                onClickDay={handleDateClick}
                value={date}
            />
        </div>
      <Modal
        style={{
            content: {
                boxSizing: 'border-box',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                padding: '20px',
                width: '400px',
                height: '400px',
                backgroundColor: '#fafafa',
            }
        }}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
      >
        <h2>
          {format(date, 'yyyy년 M월 d일', { locale: ko })}
        </h2>
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Enter event details"
        />
        <button onClick={saveEvent}>Save</button>
        <button onClick={closeModal}>Close</button>

        <textarea
          rows="4"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Enter event details"
        />
        <div className="modal-buttons">
          <button onClick={saveEvent}>Save</button>
          <button onClick={deleteEvent} className="delete-button">Delete</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarModal;
