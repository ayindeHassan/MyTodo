import React from 'react'
import IconMoon from '../assets/images/icon-moon.svg'
import IconSun from '../assets/images/icon-sun.svg'

const TodoHeader = ({handleThemeChange, isDarkTheme}) => {

    const todoHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 0',
    };

    
  return (
    <div>
        <div className='todo_header' style={todoHeaderStyle}>
            <h1>TODO</h1>
            <div>
                <img src={isDarkTheme ? IconSun : IconMoon} 
                alt="" onClick={handleThemeChange} style={{cursor:'pointer'}}/>
            </div>
        </div>
    </div>
  )
}

export default TodoHeader