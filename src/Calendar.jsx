// src/Calendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 드래그 앤 드롭 등 상호작용 기능
import timeGridPlugin from '@fullcalendar/timegrid';
import "../src/calendar.css"


const Calendar = () => {
    const [events, setEvents] = useState([
        { id: '1', title: 'Event 1', start: '2024-06-01', end: '2024-06-03' },
        { id: '2', title: 'Event 2', start: '2024-06-01', end: '2024-06-03' },
        { id: '3', title: 'Event 3', start: '2024-06-01', end: '2024-06-01' },
        { id: '4', title: 'Event 4', start: '2024-06-01', end: '2024-06-01' },
        { id: '5', title: 'Event 5', start: '2024-06-07', end: '2024-06-11' }
      ]);
     
      const handleEventClick = (info) => {
        alert(`이벤트 제목: ${info.event.title}`);
      };
  
    return (
        <div id="calendar-container">
              <FullCalendar
          initialView="dayGridMonth" //초기 viewtype을 Month로 설정
          plugins={[dayGridPlugin, timeGridPlugin]} //플러그인 설정
          events={events} //events배열을 event로 사용
          locale={'ko'} // 날짜를 한글로 표기

          initialDate="2024-06-01" // 캘린더가 처음 렌더링될 때 표시할 날짜 설정
          timeZone="Asia/Seoul" // 캘린더의 시간대를 아시아/서울로 설정
          firstDay={1} // 주의 첫 번째 날을 월요일로 설정
          weekends={true} // 주말을 표시하도록 설정
          
          headerToolbar={{
            start: "prev,next today", //상단툴바의 시작부분, 이동버튼, 오늘날짜버튼 배치
            center: "title", //상단툴바의 제목 배치
            end: "" //view변경 버튼 배치
          }}
          views={{ // 특정 뷰에 대한 설정을 세부적으로 조정
            dayGridMonth: { 
              dayMaxEventRows: 4, // 하루에 최대 3개의 이벤트 행 표시 (초과되는 건 +more 로 표시됨)
              buttonText: '월간' // 월간 뷰 버튼 텍스트 설정
            },
            dayGridWeek: { 
              buttonText: '주간' // 주간 뷰 버튼 텍스트 설정
            },
            dayGridDay: { 
              buttonText: '일간' // 일간 뷰 버튼 텍스트 설정
            }
          }}
          
          eventColor="#76c3c5" // 이벤트 기본 색상 설정
          eventTextColor="#089196" // 이벤트 텍스트 색상 설정
          eventBackgroundColor="#76c3c577" // 이벤트 배경 색상 설정
          eventBorderColor="#76c3c5" // 이벤트 테두리 색상 설정
          eventClick={handleEventClick} // 이벤트 클릭 시 콜백 함수 설정
        />
        </div>
      );
    }

export default Calendar;
