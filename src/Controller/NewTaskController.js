import axios from "axios";
import { useContext, useRef } from "react";
import Swal from "sweetalert2";
import { TasksContext } from "../context/tasks-context";
import { Task } from "../Models/Task";

// (S)OLID => Single responsibility

export class NewTaskController {
  titleRef = useRef();
  categoryRef = useRef();
  detailsRef = useRef();
  startDateRef = useRef();
  endDateRef = useRef();

  tasksContext = useContext(TasksContext);

  onFormSubmitHandler = (e) => {
    e.preventDefault();
    this.addNewTask();
  };
  checkForm = () => {
    if (
      this.titleRef.current.value !== "" &&
      this.categoryRef.current.value !== "" &&
      this.detailsRef.current.value !== "" &&
      this.startDateRef.current.value !== "" &&
      this.endDateRef.current.value !== ""
    ) {
      return true;
    }
    this.showAlert("Error Data", "Enter task info", "error");
    return false;
  };
  addNewTask = () => {
    if (this.checkForm()) {
      const newTaskObject = this.newTask;
      const token = this.tasksContext.token;
      axios
        .post(
          `https://react-tasks-af7a0-default-rtdb.firebaseio.com/tasks.json?auth=${token}`,
          newTaskObject
        )
        .then((Response) => {
          this.tasksContext.addNewTask(newTaskObject);
          this.clearInputs();
          this.showAlert("Success", "Task added successfully", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  get newTask() {
    return new Task(
      Math.random(),
      this.titleRef.current.value,
      this.categoryRef.current.value,
      this.detailsRef.current.value,
      this.startDateRef.current.value,
      this.endDateRef.current.value,
      "Waiting"
    );
  }

  clearInputs = () => {
    this.titleRef.current.value = "";
    this.categoryRef.current.value = "";
    this.detailsRef.current.value = "";
    this.startDateRef.current.value = "";
    this.endDateRef.current.value = "";
  };
}
