import { useEffect, useState } from 'react';
import './App.css'
import Calendar from './components/Calendar';
import Manage from './components/manage';

function App(){
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false); 
  
  // 월에 맞는 날짜 계산
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 해당 월의 첫 번째 날
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 요일 (0=일요일, 1=월요일 등)
    
    // 해당 월의 마지막 날
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
  
  // 달 변경
  const changeMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return(
    <>
    <Calendar
      prevMonth={() => changeMonth(-1)}
      nextMonth={() => changeMonth(1)}
      weeks={weeks}
      daysInMonth={daysInMonth}
      currentDate={currentDate}
      onModalOpen={() => setModalOpen(true)}
      />
    {/* <Manage open={modalOpen} handleClose={() => setModalOpen(false)} /> */}
    </>
  )
}

export default App;