import React, { useState } from "react";

export const TasksContext = React.createContext({
  tasks: [],
  setTasks: null,
  addNewTask: (newTask) => {},
  isLoggedIn: false,
  setLoggedIn: (status) => {},
});

export const TasksContextProvider = (props) => {
  let [tasks, setTasks] = useState([]);
  const addNewTaskHandler = (newTask) => {
    setTasks((prevTasks) => {
      return [newTask, ...prevTasks];
    });
  };
  let [isLoggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("logged_in"))
  );

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks,
        setTasks: setTasks,
        addNewTask: addNewTaskHandler,
        isLoggedIn: isLoggedIn,
        setLoggedIn: setLoggedIn,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
