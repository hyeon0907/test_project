import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import './style.css'; // 추가한 CSS 파일을 import 합니다
import axios from 'axios';

Modal.setAppElement('#root');

const CalendarModal = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registertodo, setRegistertodo] = useState({
    date: "",
    todoTxt: ""
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const [params, setParams] = useState({
    date: "",
    todoTxt: ""
  });
  const [todolist, setTodolist] = useState([]);

  // useEffect(() => {
  //   requestTodoList(date);
  // }, [date]);
  // const requestTodoList = async (selectedDate) => {
  //   // 실제 API 호출 로직을 추가합니다.
  //   try {
  //     // 예를 들어, API 호출을 통해 해당 월의 투두 리스트를 가져옵니다.
  //     const formattedDate = format(selectedDate, 'yyyy-MM', { locale: ko }); // "yyyy-MM" 포맷을 사용할 수 있습니다.
  //     const response = await axios.get(`http://localhost:8080/api/v1/todolist`, {
  //       params: { month: formattedDate }
  //     });
  //     setTodolist(response.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  const requestTodoList = async () => {
    const response =  registertodo;
    console.log(response);
    console.log(response.data);
    //setTodolist(response);
    setTodolist([...todolist, { date: response.date, todoTxt: response.todoTxt }]);
    // try {
    //     const response = await axios.get(`http://localhost:8080/api/v1/computers`, {params});
    //     setTodolist(response.data);
    // } catch(e) {
    //     console.error(e);
    // }
  };

  useEffect(()=> {
    requestTodoList();
  },[])

  const handleInputChange = (e) => { // 해당 날짜에 투두 내용 입력
    console.log(date);
    setRegistertodo(todo => {
      return {
        ...todo,
        todoTxt: e.target.value,
        date: format(date, 'yyyy년 M월 d일', { locale: ko }),
      };
    });
  };

  const handleAddTodoClick =  async () => { // 추가 버튼 누르면 todolist 등록 후 list 불러오기
    await handleRegisterSubmitClick();
    requestTodoList();
    console.log(todolist);
    setRegistertodo({
      todoTxt: ""
    });
  };

  const handleRegisterSubmitClick = async () => { // 입력한 date, 내용 백으로 요청
    // try {
    //   const response = await axios.post("http://localhost:8080/api/v1/todolist", registertodo);
    //   if(response.status === 200) {
    //       alert("등록성공!");
    //   }
    //   } catch(e) {
    //       console.error(e);
    //       alert("등록실패!");
    //   }
  };

   const filteredItems2 = todolist.filter(todo => todo.date === format(date, 'yyyy년 M월 d일', { locale: ko }));
  
  
  const filteredItems = todolist.filter(todo => {
    const todoDate = new Date(todo.date.replace(/년|월|일/g, '').trim());
    return (
      todoDate.getFullYear() === date.getFullYear() &&
      todoDate.getMonth() === date.getMonth()
    );
  });

  return (
    <div className="App">
      <div className="calendar-container">
        <Calendar
          locale='ko'
          onChange={handleDateChange}
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
          onClickDay={() => setIsModalOpen(true)}
          value={date}
        />
      </div>
      <div className='todo-list'>
        <div className="todo-list-container">
          <h2>{format(date, 'yyyy년 M월', { locale: ko })}의 투두 리스트</h2>
        </div>
        <div className='todo-list-content'>
          <ul>
            {filteredItems.map((item, index) => (
              <li key={index}>
                  <p>{item.date}</p>
                  <p>{item.todoTxt}</p> 
                  <button>✔</button>
                  <button>🖍</button>
                  <button>✂</button>
              </li>
            ))}
          </ul>
        </div>
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
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Event Modal"
      >
        <h2>
          {format(date, 'yyyy년 M월 d일', { locale: ko })}
        </h2>
        <input
          type="text"
          value={registertodo.todoTxt}
          onChange={handleInputChange}
          placeholder="Enter something"
        />
        <button onClick={handleAddTodoClick}>추가</button>
        <div className="list-container">
          <ul>
            {filteredItems2.map((item, index) => (
              <li key={index}>{item.todoTxt}</li>
            ))}
          </ul>
        </div>
     
      </Modal>
    </div>
  );
};

export default CalendarModal;
