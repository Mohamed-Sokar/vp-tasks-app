import axios from "axios";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../Components/Auth/RegisterForm";
import { TasksContext } from "../context/tasks-context";
import { Helpers } from "../Utils/Helpers";

export const LoginPage = () => {
  let tasksContext = useContext(TasksContext);
  let emailLoginRef = useRef();
  let passwordLoginRef = useRef();
  let navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (checkData()) {
      login();
    }
  };

  const checkData = () => {
    if (
      emailLoginRef.current.value != "" &&
      passwordLoginRef.current.value != ""
    ) {
      return true;
    }
    Helpers.showMessage("Error", "Enter login credentails", "error");
    return false;
  };

  const login = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArwqTcj6sc2BzC98NQIPDC5ucibRwti5A",
        {
          email: emailLoginRef.current.value,
          password: passwordLoginRef.current.value,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        //2xx (200 , 202 , ... )
        localStorage.setItem("logged_in", true);
        tasksContext.setLoggedIn(true);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
          Helpers.showMessage("Error", "Email not found", "error");
        }
      });
  };

  // const showMessage = (title, text, icon) => {
  //   Swal.fire({
  //     title: title,
  //     text: text,
  //     icon: icon,
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // };

  return (
    <>
      <div className="container-fluid p-5 bg-primary text-white text-center login-cover"></div>

      <div className="container ">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="shadow-5-strong form-box">
              <ul
                className="nav nav-pills nav-justified mb-3"
                id="ex1"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    id="tab-login"
                    data-bs-toggle="pill"
                    href="#pills-login"
                    role="tab"
                    aria-controls="pills-login"
                    aria-selected="true"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    id="tab-register"
                    data-bs-toggle="pill"
                    href="#pills-register"
                    role="tab"
                    aria-controls="pills-register"
                    aria-selected="false"
                  >
                    Register
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane  fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="tab-login"
                >
                  <form onSubmit={formSubmitHandler}>
                    <div className="text-center mb-3">
                      <h4 className="mb-4 mt-5">
                        Login To Momen Task System With
                      </h4>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-google"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-github"></i>
                      </button>
                    </div>

                    <h4 className="mb-5 mt-2 text-center">or</h4>

                    <div className="form-outline mb-4">
                      <input
                        ref={emailLoginRef}
                        type="email"
                        id="loginName"
                        className="form-control"
                        placeholder="Email or username"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        ref={passwordLoginRef}
                        type="password"
                        id="loginPassword"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-6 d-flex justify-content-center">
                        <div className="form-check mb-3 mb-md-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="loginCheck"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="loginCheck"
                          >
                            {" "}
                            Remember me{" "}
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex justify-content-center">
                        <a href="#!">Forgot password?</a>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-main btn-block mb-4"
                    >
                      Sign in
                    </button>

                    <div className="text-center">
                      <p>
                        Not a member? <a href="#!">Register</a>
                      </p>
                    </div>
                  </form>
                </div>
                <RegisterForm />
              </div>
            </div>
          </div>

          <div className="col-sm-1"></div>
        </div>
      </div>
    </>
  );
};
