import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
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
          <button onClick={openMenu}>
            <div className="menu">
              <div class='one'></div>
              <div class='two'></div>
              <div class='three'></div>
            </div>
            <i class="fa-solid fa-circle-user"></i>
          </button>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div>
                  <div>Hello,   {user.firstName}</div>
                  {/* <div>{user.username}</div> */}
                  <div>{user.email}</div>
                </div>
                <button onClick={logout}>Log Out</button>
              </>
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
