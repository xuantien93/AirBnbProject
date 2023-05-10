import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Spots";
import SpotBySpotId from "./components/SpotBySpotId";
import CreateSpotForm from "./components/CreateSpotForm";
import ManageSpot from "./components/ManageSpot";
import UpdateForm from "./components/UpdateForm";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/" >
            <SpotIndex />
          </Route >
          <Route path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route path="/spots/current">
            <ManageSpot />
          </Route>
          <Route path="/spots/:id/edit">
            <UpdateForm />
          </Route>
          <Route path="/spots/:id">
            <SpotBySpotId />
          </Route>
          <Route>
            <h1>Page not Found</h1>
          </Route>
        </Switch>}
    </>
  );
}

export default App;
