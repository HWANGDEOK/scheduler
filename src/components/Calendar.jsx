const Calendar = ({prevMonth, nextMonth, weeks, daysInMonth, currentDate, onModalOpen}) => {

  return (
    <div>
      <div className='calendar' style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-around'}}>
        <button className='pre_month' onClick={prevMonth}><strong>이전 달</strong></button>
        <span style={{fontSize: '40px', color: '#b38e7f'}}>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric'})}</span>
        <button className='next_month' onClick={nextMonth}><strong>다음 달</strong></button>
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
              <span style={{marginLeft: '10px'}}>{day}</span>
              <button onClick={onModalOpen} style={{float: 'right', fontSize:'15px', textAlign: 'center', width: '70px', height: '50px', marginRight: '10px', marginTop: '10px'}} >일정</button>
            </div>
            
          ) : (<div key={index}></div>)
          ))}
        </div>
      </div>
  );
};


export default Calendar;
