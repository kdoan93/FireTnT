import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown";

  return (
    <>
      <button>
      <i class="fa-solid fa-user"></i>
      </button>
      <ul className="profile-dropdown">
        <li>Username:   {user.username}</li>
        <li>Fullname:   {user.firstName} {user.lastName}</li>
        <li>Email:      {user.email}</li>
        <button onClick={logout}>Log Out</button>
      </ul>
    </>
  );
}

export default ProfileButton;
