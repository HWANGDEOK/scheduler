import { useState } from "react";

function Manage({ open, handleClose, selectedDate, addTodo, deleteTodo, scheduleMap }){
  const [inputValue, setInputValue] = useState('');
  const dateKey = selectedDate?.toDateString();
  const currentList = scheduleMap[dateKey] || [];


  return (
    open ?
    (<>
    <div 
      style={{
        position:'absolute',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '5%',
        top: '50%',
        left: '50%',
        width: '400px',
        height: '500px',
        transform:'translate(-50%, -50%)'
      }}>
      <div>
        <div style={{marginTop: '8px'}}>
          <span style={{fontSize: '20px'}}>{selectedDate?.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric'})}</span>
        </div>
        
        <br/>
        <div style={{textAlign: 'center', justifyContent: 'center'}}>
          <input style={{left: '10%', width: '200px', height: '30px', borderRadius: '5px'}} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <button style={{marginLeft: '20px', width:'60px',height: '35px', fontSize: '12px',background:'#8ed6ee', color: 'white'}} onClick={() => {
            addTodo(selectedDate, inputValue);
            setInputValue('');
          }}>추가</button>
        </div>
        
        <div>
          <ul>
          {currentList.map((item, i) => (
            <li key={i}>
              {item}
              <button style={{marginLeft: '20px', background:'red', color: 'white'}} onClick={()=>{deleteTodo(selectedDate, i)}}>삭제</button>
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