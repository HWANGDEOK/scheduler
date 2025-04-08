import { useState, useEffect } from 'react';

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
      <div className='calendar' style={{ textAlign: 'center'}}>
        <button className='pre_month' onClick={() => changeMonth(-1)}>이전 달</button>
        <span style={{fontSize: '30px'}}>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button className='next_month' onClick={() => changeMonth(1)}>다음 달</button>
      </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {weeks.map(day => (
            <div key={day} style={{ color: '#FFB1BC', padding: '50px', textAlign: 'center' }}>
              {day}
            </div>
          ))}
          {daysInMonth.map((day, index) => (
            <div key={index} style={{ color: '#FF7C57', padding: '60px', textAlign: 'center' }}>
              {day}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Calendar;