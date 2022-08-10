import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/tasks-context";
import FirstImage from "../Resources/img/1.png";

export const TaskDetailsPage = () => {
  let params = useParams();
  let taskContext = useContext(TasksContext);

  // let taskDetails = {}
  let [taskDetails, setTaskDetails] = useState({});

  const fetchTaskDetails = () => {
    let filteredTasks = taskContext.tasks.find(
      (element) => element.id == params.id
    );
    setTaskDetails(filteredTasks);
    console.log(taskDetails);
  };

  useEffect(fetchTaskDetails, []);

  const statusChangeHandler = (status) => {
    setTaskDetails((prevTask) => {
      prevTask.status = status;
      return { ...prevTask };
    });
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Title: ({taskDetails.title})</h1>

          <div className=" mb-2 mb-md-0">
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
          </div>

          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                onClick={() => {
                  statusChangeHandler("In Progress");
                }}
                // onClick={() => {
                //   taskDetails.status = "In Progress";
                //   setTaskDetails({ ...taskDetails });
                // }}
                type="button"
                className={`btn btn-sm btn-outline-secondary ${
                  taskDetails.status === "In Progress" ? "active" : ""
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => {
                  statusChangeHandler("Complete");
                }}
                // onClick={() => {
                //   taskDetails.status = "Complete";
                //   setTaskDetails({ ...taskDetails });
                // }}
                type="button"
                className={`btn btn-sm btn-outline-secondary ${
                  taskDetails.status === "Complete" ? "active" : ""
                }`}
              >
                Complete
              </button>
              <button
                onClick={() => {
                  statusChangeHandler("Waiting");
                }}
                // onClick={() => {
                //   taskDetails.status = "Waiting";
                //   setTaskDetails({ ...taskDetails });
                // }}
                type="button"
                className={`btn btn-sm btn-outline-secondary ${
                  taskDetails.status === "Waiting" ? "active" : ""
                }`}
              >
                Waiting
              </button>
              <button
                onClick={() => {
                  statusChangeHandler("Canceled");
                }}
                // onClick={() => {
                //   taskDetails.status = "Canceled";
                //   setTaskDetails({ ...taskDetails });
                // }}
                type="button"
                className={`btn btn-sm btn-outline-secondary ${
                  taskDetails.status === "Canceled" ? "active" : ""
                }`}
              >
                Canceled
              </button>
            </div>
            <button type="button" className="btn btn-light-main btn">
              <span data-feather="edit-3"></span> Edit
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <img
              src={FirstImage}
              className="img-fluid rounded de-img"
              alt="img1"
            />
          </div>
          <div className="col-md-6  mt-5">
            <div className=" mb-3">
              <span data-feather="bookmark" className="main-color"></span>{" "}
              <strong>Title:</strong> {taskDetails.title}
            </div>
            <div className="mb-3">
              <span data-feather="layers" className="main-color"></span>{" "}
              <strong>Category:</strong> {taskDetails.category}
            </div>
            <div className="">
              <span data-feather="calendar" className="main-color"></span>{" "}
              <strong>Date: </strong>
              {taskDetails.startDate} to {taskDetails.endDate}
            </div>
          </div>

          <div className="row mt-5">
            <div className="task-info">
              <p>{taskDetails.details}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
