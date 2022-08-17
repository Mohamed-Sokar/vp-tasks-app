import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Resources/css/custom.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { TasksContextProvider } from "./context/tasks-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TasksContextProvider>
      <AppRoutes />
    </TasksContextProvider>
  </BrowserRouter>
);
