import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TaskDetails } from "../Components/Tasks/TaskDetails";
import { TasksContext } from "../context/tasks-context";
import FirstImage from "../Resources/img/1.png";

export const TasksPage = () => {
  let tasksContext = useContext(TasksContext);
  let [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTasks = () => {
    if (tasksContext.tasks.length == 0) {
      // alert("Fetch");
      const token = tasksContext.token;
      axios
        .get(
          `https://react-tasks-af7a0-default-rtdb.firebaseio.com/tasks.json?auth=${token}`
        )
        .then((response) => {
          let tasks = [];
          for (let key in response.data) {
            let task = response.data[key];
            task.id = key;
            tasks.push(task);
          }
          tasksContext.setTasks(tasks);
          // setFilteredTasks(tasksContext.tasks);
          setFilteredTasks(tasks);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // alert("Read from Context");
      setFilteredTasks(tasksContext.tasks);
    }
  };

  useEffect(fetchTasks, []);

  let filterTasks = (event) => {
    if (event.target.value == -1) {
      setFilteredTasks(tasksContext.tasks);
    } else {
      let newFilteredTasks = tasksContext.tasks.filter(
        (element) => element.status == event.target.value
      );
      setFilteredTasks(newFilteredTasks);
    }
  };
  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className=" mb-2 mb-md-0">
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item">
              {tasksContext.tasks.length > 0 && (
                <select
                  className=" dropdown form-control pull-right"
                  placeholder="Filter By status"
                  autoComplete="off"
                  onChange={filterTasks}
                >
                  <option value="-1">All</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Waiting">Waiting</option>
                </select>
              )}
            </li>
            <li className="list-inline-item mt-3">
              {/* <select
                className=" dropdown form-control pull-right"
                placeholder="Filter By status"
                autoComplete="off"
              >
                <option value="">Filter By category</option>
                <option value="4">Category 1</option>
                <option value="1"> Category 2</option>
                <option value="3">Category 3</option>
                <option value="5">Category 4</option>
              </select> */}
            </li>
          </ul>
        </div>
        <div className="row mt-5">
          {filteredTasks.map((element) => (
            <TaskDetails
              key={element.id}
              id={element.id}
              title={element.title}
              startDate={element.startDate}
              endDate={element.endDate}
              description={element.details}
              status={element.status}
              image={FirstImage}
            />
          ))}
        </div>
      </main>
    </>
  );
};
