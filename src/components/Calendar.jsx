import { Button, useState, useEffect } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  
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
  
  return (
    <div>
      <div className='calendar' style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-around'}}>
        <button className='pre_month' onClick={() => changeMonth(-1)}><strong>이전 달</strong></button>
        <span style={{fontSize: '40px', color: '#b38e7f'}}>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric'})}</span>
        <button className='next_month' onClick={() => changeMonth(1)}><strong>다음 달</strong></button>
      </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>
          {weeks.map(day => (
            <div key={day} style={{ color: '#b37f8c', padding: '50px', textAlign: 'center', fontSize: '20px', borderBottom: '1px solid #FF7C57'}}>
              <strong>{day}</strong>
            </div>
          ))}
          {daysInMonth.map((day, index) => (
            day ?(
            <div key={index}
            style={{ color: '#FF7C57', width: 'auto', height: '160px', fontSize: '20px',boxSizing: 'border-box', outline: '1px solid'}}>
              {day}
              <button style={{float: 'right', fontSize:'15px', textAlign: 'center', width: '70px', height: '50px', marginRight: '10px'}} >일정</button>
            </div>) : (
              <div key={index}></div>
            )
          ))}
        </div>
      </div>
  );
};


export default Calendar;
