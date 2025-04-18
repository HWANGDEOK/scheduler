import { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import Manage from './components/manage';

function App(){
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [scheduleMap, setScheduleMap] = useState({});


  useEffect(() => {
    const storedData = localStorage.getItem("scheduleData");
    if (storedData) {
      setScheduleMap(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 요일 (0=일요일, 1=월요일 등)
    
    const lastDate = new Date(year, month + 1, 0);
    const daysInMonth = lastDate.getDate();
    
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    // 첫 번째 주의 빈 날짜를 추가 (해당 월의 첫 번째 날 전까지의 빈 날짜)
    const paddingDays = Array(firstDayOfWeek).fill(null);
    setDaysInMonth([...paddingDays, ...days]);
  }, [currentDate]);
  
  const changeMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };


  const addTodo = (date, todo) => {
    if (!todo.trim()) return;
    const updated = { ...scheduleMap };
    const dateKey = date.toDateString();
    const currentList = updated[dateKey] || [];
    updated[dateKey] = [...currentList, todo];
    setScheduleMap(updated);
    localStorage.setItem("scheduleData", JSON.stringify(updated));
  };

  const deleteTodo = (date, index) => {
    const updated = { ...scheduleMap };
    const dateKey = date.toDateString();
    const currentList = updated[dateKey] || [];
    updated[dateKey] = currentList.filter((_, i) => i !== index);
    setScheduleMap(updated);
    localStorage.setItem("scheduleData", JSON.stringify(updated));
  };

  return(
    <>
    <Calendar
      prevMonth={() => changeMonth(-1)}
      nextMonth={() => changeMonth(1)}
      weeks={weeks}
      daysInMonth={daysInMonth}
      currentDate={currentDate}
      onModalOpen={(day) => {
        if (day !== null) {
          const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          setSelectedDate(clickedDate);
          setModalOpen(true);
        }
      }}
      scheduleMap={scheduleMap}
      />
    <Manage
      open={modalOpen}
      handleClose={() => setModalOpen(false)}
      selectedDate={selectedDate}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      scheduleMap={scheduleMap}
      />
    </>
  );
}

export default App;