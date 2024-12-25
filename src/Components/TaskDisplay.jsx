import React, {useState} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import IconCheck from "../assets/images/icon-check.svg";
import IconDelete from "../assets/images/icon-cross.svg"
import TaskLink from "./TaskLink";

const TaskDisplay = ({ newTask, setNewTask, isDarkTheme }) => {
  const [filter, setFilter] = useState("all"); // Declare filter state here

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = newTask.findIndex((task) => task.id === active.id);
      const newIndex = newTask.findIndex((task) => task.id === over.id);

      setNewTask((tasks) => arrayMove(tasks, oldIndex, newIndex));
    }
  };


  const handleTaskComplete = (id) => {
    setNewTask((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

//   const handleTaskComplete = (id) => {
//   setNewTask((tasks) =>
//     tasks.map((task) => {
//       if (task.id === id) {
//         const updatedTask = { ...task, completed: !task.completed };
//         return updatedTask;
//       }
//       return task; // No change
//     })
//   );
// };

const handleTaskDelete = (id) => {
  setNewTask((tasks) => tasks.filter((task) => task.id !== id));
}

const handleFilterTask = () => {
  switch (filter){
    case "active":
      const activeTask = newTask.filter((task) => !task.completed);
      return activeTask;
    case "completed":
      const completedTask = newTask.filter((task) => task.completed);
      return completedTask;
    default:
      return newTask;
  }
}

const filteredTask = handleFilterTask();

const listContainerStyle = {
  backgroundColor: isDarkTheme ? '#10163A' : '#FAFAFA',
}

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
      items={newTask.map((task) => task.id)} 
      strategy={verticalListSortingStrategy}
      >
        <ul className="task-list-container" style={listContainerStyle}>
          {newTask.length === 0 ? (
            <p style={{margin:'10px 0 0 10px'}}>No tasks available. Add some!</p>
          ) : (
            filteredTask.map((task) => (
              <SortableItem
                key={task.id}
                task={task}
                onTaskComplete={handleTaskComplete}
                handleTaskDelete={handleTaskDelete}
              />
            ))
          )}
        </ul>
        <TaskLink newTask={newTask} setFilter={setFilter} setNewTask={setNewTask} isDarkTheme={isDarkTheme}/>
      </SortableContext>
    </DndContext>
  );
};

const SortableItem = ({ task, onTaskComplete, handleTaskDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const listStyle = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    transition,
    padding: "8px",
    margin: "4px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "grab",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };


  return (
    <div>
      <li ref={setNodeRef} style={listStyle} {...attributes} {...listeners} >
        <div>
          <button
            style={{
              width: "30px",
              height: "30px",
              border: "none",
              borderRadius: "100%",
              cursor: "pointer",
              backgroundImage: task.completed ? "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
              : "none",
            }}

            onClick={(e) => {
              e.stopPropagation(); // Prevent the event from propagating and triggering other actions
              onTaskComplete(task.id);
            }}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag initiation
          >
            <img src={IconCheck} alt="Complete" />
          </button>
          <span style={{ marginLeft: "10px",
            textDecoration: task.completed ? "line-through" : "none"
          }}>{task.taskName}</span>
        </div>
        
        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => handleTaskDelete(task.id)}
          style={{
            width: "25px",
            height: "25px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "transparent",
            // padding: "5px",
            // backgroundColor: "red",
          }}
        >
          <img src={IconDelete} alt="" />
        </button>
      </li>

      
    </div>
  );
};

export default TaskDisplay;
