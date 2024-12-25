import React,{useState, useEffect} from 'react'
import TaskInput from './Components/TaskInput'
import TodoHeader from './Components/TodoHeader'
import './App.css'
import ImgDark from './assets/images/bg-desktop-dark.jpg'
import ImgLight from './assets/images/bg-desktop-light.jpg'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const todolistContainerStyle = {
    backgroundImage: `url(${isDarkTheme ? ImgDark : ImgLight})`,
    transition: 'background-image 0.3s ease-in'
  };

   // Apply theme dynamically to the body
   useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme
      ? 'hsl(235, 21%, 11%)'
      : 'hsl(0, 0%, 98%)';
    document.body.style.color = isDarkTheme ? 'white' : 'black';


    // Target all buttons and apply styles
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
      // Apply theme-specific colors
      button.style.color = isDarkTheme ? 'white' : 'black';
  
      // Add hover effect dynamically
      button.addEventListener('mouseover', () => {
        // button.style.backgroundColor = isDarkTheme ? 'darkblue' : 'lightblue';
        button.style.color = 'hsl(220, 98%, 61%)';
      });
  
      button.addEventListener('mouseout', () => {
        // button.style.backgroundColor = '';
        button.style.color = isDarkTheme ? 'white' : 'black';
      });

      const taskLinks = document.querySelectorAll('.task_link');

      taskLinks.forEach((taskLink) => {
        taskLink.style.backgroundColor = isDarkTheme
          ? 'hsl(235, 24%, 19%)'
          : 'hsl(236, 33%, 92%)';
      });
    });
  
    // Cleanup event listeners
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('mouseover', () => {});
        button.removeEventListener('mouseout', () => {});
      });
    };

    
  


  }, [isDarkTheme]);


  return (
    <div className={`todolist_container ${isDarkTheme ? 'light-theme' : 'dark-theme'}`} style={todolistContainerStyle}> 
      <div>
        <TodoHeader handleThemeChange={handleThemeChange} isDarkTheme={isDarkTheme}/>
        <TaskInput isDarkTheme={isDarkTheme}/>
        <p style={{textAlign: 'center',margin: '20px 0'}}>Drag and Drop to reorder the list</p>
      </div> 
    </div>
  )
}

export default App
