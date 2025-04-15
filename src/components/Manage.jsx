import { useState } from "react";

function Manage({ open, handleClose, selectedDate}){
  const [inputValue, setInputValue] = useState('');
  const [scheduleMap, setScheduleMap] = useState({}); // 날짜별로 저장할 객체

  const dateKey = selectedDate?.toDateString(); // key 예: "Mon Apr 15 2025"
  const currentList = scheduleMap[dateKey] || [];



  const changeTodoInput = (e) => {
    setInputValue (e.target.value);
  }

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const updated = { ...scheduleMap };
    updated[dateKey] = [...currentList, inputValue];
    setScheduleMap(updated);
    setInputValue('');
  }

  const deleteTodo = (index) => {
    const updated = { ...scheduleMap };
    updated[dateKey] = currentList.filter((_, i) => i !== index);
    setScheduleMap(updated);
  }
  

  return (
    open ?
    (<div 
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
        <span>{selectedDate?.toLocaleString('default', { month: 'long', year: 'numeric'})}</span>
        <input value={inputValue} onChange={changeTodoInput}/>
        <button onClick={addTodo}>추가</button>
        <ul>
        {currentList.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={()=>{deleteTodo(i)}}>삭제</button>
          </li>
          ))}
        </ul> 
      </div>

      <button style={{
        position: 'absolute',
        top: '84%',
        right: '38%'
        }}
        onClick={handleClose}>CLose</button>
    </div>) : null
  );
}


export default Manage;