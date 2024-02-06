import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { NavLink } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // consuming ModalContext's closeModal function
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
            setErrors(data);
        }
      });
  };

  const demoLogin = (e) => {
    // e.preventDefault();
    return dispatch(sessionActions.login({ credential: "john.smith", password: "secret password" }))
    .then(closeModal)
  }

  return (
    <div className="loginFormModal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="loginModalInputsButton">
          {errors.message && <p>{errors.message}</p>}
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="logInButton"
            type="submit"
            disabled={credential.length < 4 || password.length < 6}
          >
            Log In
          </button>
        </div>
      <button className='demoUser' onClick={(e) => demoLogin()}>
        Demo User
      </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
