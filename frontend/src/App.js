import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";

function App() {

  const dispatch = useDispatch();
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // dispatch dispatches thunk action .restoreUser()
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <Route exact path='/'>
          <h1>🔥 Welcome to FireTnT! 🙌🐱‍👤</h1>
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    )
  );
}

export default App;
