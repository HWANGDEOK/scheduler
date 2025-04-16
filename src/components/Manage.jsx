import { useState } from "react";

function Manage({ open, handleClose, selectedDate}){
  const [inputValue, setInputValue] = useState('');
  const [scheduleMap, setScheduleMap] = useState({});
  const currentList = scheduleMap[selectedDate] || [];


  const addTodo = () => {
    if (!inputValue.trim()) return;
    const updated = { ...scheduleMap };
    updated[selectedDate] = [...currentList, inputValue];
    setScheduleMap(updated);
    setInputValue('');
  }

  const deleteTodo = (index) => {
    const updated = { ...scheduleMap };
    updated[selectedDate] = currentList.filter((val, i) => i !== index);
    setScheduleMap(updated);
  }
  

  return (
    open ?
    (<>
    <div 
      style={{
      position: 'absolute',
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '5%',
      top: '50%',
      left: '50%',
      width: '400px',
      height: '500px',
      transform: 'translate(-50%, -50%)'
      }}>
      <div>
        <span style={{fontSize: '20px'}}>{selectedDate?.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric'})}</span>
        <br/>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button style={{background:'blue', color: 'white'}} onClick={addTodo}>추가</button>
        <div>
          <ul>
          {currentList.map((item, i) => (
            <li key={i}>
              {item}
              <button style={{background:'red', color: 'white'}} onClick={()=>{deleteTodo(i)}}>삭제</button>
            </li>
            ))}
          </ul>
        </div>
      </div>
        <button style={{
        position: 'absolute',
        top: '84%',
        right: '38%',
        background:'black',
        color: 'white'
        }}
        onClick={handleClose}>닫기</button>
    </div>
    </>
    ) : null
  );
}


export default Manage;