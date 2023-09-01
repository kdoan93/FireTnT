import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
          {user ? (
            <NavLink className="createASpot" to='/spots/new'>
              Create a New Spot
            </NavLink>
          ) : (
            <></>
          )}
          <button onClick={openMenu}>
            <div className="menu">
              <div className='one'></div>
              <div className='two'></div>
              <div className='three'></div>
            </div>
            <i className="fa-solid fa-circle-user"></i>
          </button>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <div className='userDropdown'>
                <div className="userMenu">
                  <div className='dt'>Hello,   {user.firstName}</div>
                  <div className='dt'>{user.email}</div>
                </div>
                <NavLink className='dt manageSpots' to='/spots/current'>
                  Manage Spots
                </NavLink>
                <button className='logoutButton' onClick={logout}>Log Out</button>
              </div>
            ) : (
                <div className="loginSignup">

                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />

                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />

                </div>
            )}
          </ul>
        </>
      );
    }

    export default ProfileButton;
