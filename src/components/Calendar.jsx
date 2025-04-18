

const Calendar = ({prevMonth, nextMonth, weeks, daysInMonth, currentDate, onModalOpen, scheduleMap}) => {

  return (
    <div>
      <div style={{textAlign: 'center', display: 'flex', justifyContent: 'space-around'}}>
          <button style={{marginTop: '10px', height: '40px', backgroundColor: 'orange', color: 'white'}} onClick={prevMonth}><strong>이전 달</strong></button>
          <span style={{marginTop: '10px', fontSize: '40px', color: '#b38e7f'}}>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric'})}</span>
          <button style={{marginTop: '10px', height: '40px', backgroundColor: 'lightblue', color: 'white'}} onClick={nextMonth}><strong>다음 달</strong></button>
        
      </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>
          {weeks.map(day => (
            <div key={day} style={{height: '20px', color: '#b37f8c', padding: '50px', textAlign: 'center', fontSize: '20px', borderBottom: '1px solid #FF7C57'}}>
              <strong>{day}</strong>
            </div>
          ))}


          {daysInMonth.map((day, index) => {
            if (!day) return <div key={index}></div>;

            const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateKey = dateObj.toDateString();
            const scheduleList = scheduleMap[dateKey] || [];

            return(

              <div key={index}
              style={{
                width: 'auto',
                height: '160px',
                fontSize: '20px',
                boxSizing: 'border-box',
                outline: '1px solid #FF7C57',
                overflow: 'hidden',
                }}>
                
              <div style={{marginTop: '10px', marginBottom: '13px'}}>
                <span style={{color: '#b37f8c', marginLeft: '10px', marginTop: '1px'}}><strong>{day}</strong></span>

                <button
                  onClick={() => onModalOpen(day)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#ffb1ba',
                    color: 'white',
                    float: 'right',
                    fontSize:'13px',
                    width: '60px',
                    height: '30px',
                    padding: '0px',
                    lineHeight: '30px',
                    marginRight: '10px',   
                    }} >일정</button>
              </div>

                {scheduleList.map((item, idx) => (
                <p key={idx}
                  style={{
                    height: '25px',
                    width: '97%',
                    lineHeight: '25px',
                    marginTop: '2px',
                    marginBottom: '2px',
                    fontSize:'15px',
                    backgroundColor: '#C1FCF5',
                    borderRadius: '5px',
                    marginLeft: '3px',
                    color: '#333333',
                  }}>{item}</p>
                ))}
            </div>
            );
          })}
        </div>
      </div>
  );
};


export default Calendar;
