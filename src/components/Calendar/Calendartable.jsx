import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../Calendar/style.css';


function Calendartable(props) {
    const [value, setValue] = useState(new Date());

    return (
      <div className="App">
        <div className="calendar-container">
          <Calendar 
            locale="kr"
            onChange={setValue} 
            value={value}
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
            />
        </div>
      </div>
    );
  }

export default Calendartable;