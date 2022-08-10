import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TasksContext } from "../../context/tasks-context";
import { Helpers } from "../../Utils/Helpers";

export const RegisterForm = () => {
  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let passwordConfirmationRef = useRef();
  let termsRef = useRef();
  let navigate = useNavigate();
  let tasksContext = useContext(TasksContext);

  let [isTermsConfirmed, setTermsConfirmed] = useState(false);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (checkData()) {
      register();
    }
  };

  const checkData = () => {
    if (
      nameRef.current.value !== "" &&
      emailRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      passwordConfirmationRef.current.value !== "" &&
      termsRef.current.checked
    ) {
      if (passwordRef.current.value === passwordConfirmationRef.current.value) {
        return true;
      }
      Helpers.showMessage("Error", "password confirmation wrong!", "error");
      return false;
    }
    Helpers.showMessage("Error", "Enter new account info!", "error");
    return false;
  };
  const register = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArwqTcj6sc2BzC98NQIPDC5ucibRwti5A",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("logged_in", true);
        tasksContext.setLoggedIn(true);
        Helpers.showMessage("Success", "Registration successfully", "success");
        navigate("/dashboard", { replace: true });

        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="tab-pane fade"
      id="pills-register"
      role="tabpanel"
      aria-labelledby="tab-register"
    >
      <form onSubmit={onSubmitHandler}>
        <div className="text-center mb-3">
          <h4 className="mb-4 mt-5">Register in Mohamed Task System with</h4>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
        <h4 className="mb-4 mt-5 text-center">or:</h4>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="registerName"
            className="form-control"
            placeholder="Name"
            ref={nameRef}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            placeholder="Email"
            ref={emailRef}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerPassword"
            className="form-control"
            placeholder="password"
            ref={passwordRef}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerRepeatPassword"
            className="form-control"
            placeholder="repeat password"
            ref={passwordConfirmationRef}
          />
        </div>
        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="registerCheck"
            defaultChecked
            aria-describedby="registerCheckHelpText"
            ref={termsRef}
            onChange={(event) => setTermsConfirmed(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <button
          type="submit"
          disabled={!isTermsConfirmed}
          className="btn btn-main btn-block mb-3"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
