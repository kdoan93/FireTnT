import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import * as spotsActions from './store/spots'
import Navigation from "./components/Navigation";
import SpotsBrowser from './components/SpotsLandingPage'
import SingleSpot from "./components/SingleSpot";
import SpotReviews from "./components/SpotReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // dispatch dispatches thunk action .restoreUser()
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsBrowser />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpot />
            <SpotReviews />
          </Route>
          <Route>
            <h1>404: Page Not Found A-Aron!!!</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
