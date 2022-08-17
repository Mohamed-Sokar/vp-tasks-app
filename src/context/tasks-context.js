import React, { useState } from "react";

export const TasksContext = React.createContext({
  tasks: [],
  setTasks: (tasks) => {},
  addNewTask: (newTask) => {},
  isLoggedIn: false,
  setLoggedIn: (status) => {},
  token: null,
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
        token: localStorage.getItem("token"),
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
