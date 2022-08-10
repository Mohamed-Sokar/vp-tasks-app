import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard";
import { LoginPage } from "../Pages/LoginPage";
import { AddNewTask } from "../Pages/AddNewTask";
import { TasksPage } from "../Pages/TasksPage";
import { TaskDetailsPage } from "../Pages/TaskDetailsPage";
import { TasksContext, TasksContextProvider } from "../context/tasks-context";

export const AppRoutes = () => {
  let tasksContext = useContext(TasksContext);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={tasksContext.isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
      >
        <Route path="/dashboard/tasks" element={<TasksPage />} />
        <Route path="/dashboard/tasks/new-task" element={<AddNewTask />} />
        <Route
          path="/dashboard/tasks/:id/details"
          element={<TaskDetailsPage />}
        />
      </Route>
      <Route
        path="/login"
        element={
          tasksContext.isLoggedIn !== true ? (
            <LoginPage />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/*"
        element={
          tasksContext.isLoggedIn !== true ? (
            <Navigate to="/login" />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
    </Routes>
  );
};
