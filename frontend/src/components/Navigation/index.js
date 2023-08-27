import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const airbnbLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
      <div className='navigationBar'>
        <NavLink exact to="/" className='home-button' >
            <img className='logo' src={airbnbLogo} />
        </NavLink>
        {isLoaded && (<ProfileButton className='profileButton' user={sessionUser} />)}
      </div>
  );
}

export default Navigation;
