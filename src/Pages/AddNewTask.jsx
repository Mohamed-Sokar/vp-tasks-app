import React from "react";
import { NewTaskController } from "../Controller/NewTaskController";

export const AddNewTask = () => {
  let taskController = new NewTaskController();

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 mt-3">Add New Task </h1>
        </div>

        <form
          className="row mt-5"
          onSubmit={taskController.onFormSubmitHandler}
        >
          <div className="col-md-12">
            <div className="form-outline mb-4">
              <label className="form-label">Task name</label>
              <input
                ref={taskController.titleRef}
                type="texy"
                id="loginName"
                className="form-control"
                placeholder="Task name"
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-outline mb-4">
              <label className="form-label">Task Category</label>
              <select ref={taskController.categoryRef} className="form-control">
                <option value="Work">Work</option>
                <option value="Home">Home</option>
                <option value="Family">Family</option>
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-outline mb-4">
              <label className="form-label">Image For Task</label>
              <input className="form-control" type="file" id="formFile" />
            </div>
          </div>

          <div className="col-md-12">
            <label className="form-label">Task Details</label>
            <div className="form-outline mb-4">
              <textarea
                ref={taskController.detailsRef}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-outline mb-4">
              <label className="form-label">Start date</label>
              <input
                ref={taskController.startDateRef}
                type="datetime-local"
                className="form-control"
                placeholder="Task name"
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">End date</label>
            <div className="form-outline mb-4">
              <input
                ref={taskController.endDateRef}
                type="datetime-local"
                className="form-control"
                placeholder="Task name"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="pull-right btn btn-main mb-4">
              Add New Task
            </button>
          </div>
        </form>
      </main>
    </>
  );
};
