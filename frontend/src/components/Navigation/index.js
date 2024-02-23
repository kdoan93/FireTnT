import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import './Navigation.css';
import { getSpots } from '../../store/spots';

const airbnbLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'

function Navigation({ isLoaded }){

  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user);

  const spots = useSelector(state => state.spot.allSpots)

  const allSpots = Object.values(spots)

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  if(!allSpots.length) return null

  return (
      <div className='navigationBar'>
        <NavLink exact to="/" className='home-button' >
            <img className='logo' src={airbnbLogo} alt='logo' />
        </NavLink>

        <SearchBar
          placeholder={'Search destinations'}
          data={allSpots}
        />

        {isLoaded && (
          <ProfileButton className='profileButton' user={sessionUser} />
        )}
      </div>
  );
}

export default Navigation;
