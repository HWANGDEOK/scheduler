import { useState } from "react";

function Manage({ open, handleClose, currentDate, daysInMonth }){
  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);

  const changeTodoInput = (e) => {
    setInputValue (e.target.value);
  }

  const addTodo = () => {
    setInputList([...inputList, inputValue]);
    setInputValue('');
  }

  const deleteTodo = (index) => {
      setInputList(inputList.filter((item, i) => {
        return index !== i
      }))
    }
  const onClickDelete = (i) => {
    deleteTodo(i)
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

      <br/>

      <div>
        <input type="input" value={inputValue} onChange={changeTodoInput}/>
        <button type="button" onClick={addTodo}>추가</button>
        <ul>
        {inputList.map((item, i) => (
          <li key={i}>
            <span>{item}</span>
            <button onClick={()=>{onClickDelete(i)}}>삭제</button>
          </li>)
        )}
        </ul> 
      </div>

      <button style={{
        position: 'absolute',
        top: '84%',
        right: '38%'
        }}
        onClick={handleClose}
      >CLose</button>
    </div>) : ('')
  );
}


export default Manage;