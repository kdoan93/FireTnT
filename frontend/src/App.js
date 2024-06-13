import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
// import * as spotsActions from './store/spots'
import Navigation from "./components/Navigation";
import SpotsBrowser from './components/SpotsLandingPage'
import SingleSpot from "./components/SingleSpot";
import SpotReviews from "./components/SpotReviews";
import UserSpots from "./components/ManageSpots";
import Bookings from "./components/Bookings";
import Trips from './components/Bookings/Trips';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  // dispatch dispatches thunk action .restoreUser()
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const onClick = (e) => {
    history.push('/')
  }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsBrowser />
          </Route>
          <Route path='/trips'>
            <Trips />
          </Route>
          <Route path='/spots/current'>
            <UserSpots />
          </Route>
          <Route path='/spots/:spotId/booking'>
            <Bookings />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpot isLoaded={isLoaded} />
            <SpotReviews />
          </Route>
          <Route>
            <img style={{ width: '100%', height: '100%', marginTop: 1 }}
              src="https://cdn.mos.cms.futurecdn.net/PuXipAW3AXUzUJ4uYyxPKC-1200-80.jpg" alt="404"
              onClick={onClick}
            />
          </Route>
        </Switch>
      )}
      <div className='about-links-container'>
        <div>
            <a href="https://www.linkedin.com/in/kdoan93/">
              <i class="fa-brands fa-linkedin fa-2xl gap"/>
              LinkedIn
            </a>
        </div>
        <div>
            <a href='https://github.com/kdoan93/FireTnT'>
              <i class="fa-brands fa-square-github fa-2xl gap"/>
              GitHub
            </a>
        </div>
        <div>
          <a href="https://kdoan93.github.io/">
            <i class="fa-regular fa-folder-open fa-2xl gap"></i>
            Portfolio
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
