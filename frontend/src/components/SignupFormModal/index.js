import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }

      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="signupContainer">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className="errorsDiv">
        {errors.username && <p>Username must be unique</p>}
        {errors.email && <p>{errors.email}</p>}
        {errors.firstName && <p>{errors.firstName}</p>}
        {errors.lastName && <p>{errors.lastName}</p>}
        {errors.password && <p>{errors.password}</p>}
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <ul>
            <label>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    // required
                />
            </label>
        </ul>
        <ul>
            <label>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    // required
                />
            </label>
        </ul>
        <ul>
            <label>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // required
                />
            </label>
        </ul>
        <ul>
            <label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    // required
                />
            </label>
        </ul>
        <ul>
            <label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                />
            </label>
        </ul>
        <ul>
            <label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    // required
                />
            </label>
        </ul>
        {/* <ul> */}
            <button
              className="signupButton"
              type="submit"
              disabled={!email || username.length < 4 || !firstName || !lastName || password.length < 6 || confirmPassword.length < 6}
            >
              Sign Up
            </button>
        {/* </ul> */}
      </form>
    </div>
  );
}

export default SignupFormModal;
