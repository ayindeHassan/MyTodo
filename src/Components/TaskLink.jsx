import React from 'react'

const TaskLink = ({newTask,setFilter,setNewTask,isDarkTheme}) => {

  const clearCompleted = () => {
    setNewTask((tasks) => {
      const updatedTasks = tasks.filter((task) => !task.completed);
      console.log("Tasks after clearing completed:", updatedTasks);
      return updatedTasks;
    });
  };

  const todoLinkStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: isDarkTheme ? '#10163A' : '#FAFAFA',
    padding: '10px',
    borderRadius: '5px',

  }

  
  return (
    <div className='todo_link_container' style={todoLinkStyle}>
      <div>
        {
          newTask.length > 0 ? (
            <p>{`${newTask.length} items left`}</p>
          ): (<p>0 items left</p>)
        }
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', gap: '15px'}} className='task_link'>
        <button onClick={() => setFilter("all")} className='link_btn'> All </button>
        <button onClick={() => setFilter("active")} className='link_btn'> Active </button>
        <button onClick={() => setFilter("completed")} className='link_btn'> Completed </button>
      </div>
      <div>
        <button onClick={clearCompleted} className='link_btn'
        style={{float:'right'}}>Clear Completed</button>
      </div>
    </div>
  )
}

export default TaskLink