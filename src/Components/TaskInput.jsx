import React, {useState} from 'react'
import TaskDisplay from './TaskDisplay'

const TaskInput = ({isDarkTheme}) => {
    const [taskInput, setTaskInput] = useState('');
    const [newTask, setNewTask] = useState([]);
  
    const handleTaskInput = (e) => {
      if (e.key === 'Enter'&& taskInput.trim()) {
        // const TaskArr = [...newTask, search];
        // setNewTask(TaskArr);

        // setNewTask([...newTask, taskInput]);
        setNewTask([...newTask, {id:Date.now(), taskName:taskInput.trim(), completed:false}]);
        // console.log(TaskArr);
        setTaskInput('');
      }
    };

    const inputStyle = {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      outline: 'none',
      backgroundColor: 'transparent',
      color: '#000',
      borderRadius: '7px',
    };
  
    return (
      <div>
        <div className='search_container'>
          <input type="text"
            className='search_bar'
            value={taskInput}
            placeholder='Create a new Todo...'
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleTaskInput} 
            style={inputStyle} />
  
          <TaskDisplay newTask={newTask} setNewTask={setNewTask} isDarkTheme={isDarkTheme}/>
        </div>
      </div>
    );
}

export default TaskInput