import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyles } from "./styles/Global";
import Map from "./components/Map/Map";
import LoginPage from "./views/Login";
import SignUpPage from "./views/SignUp";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/map">
            <Map />
          </Route>
          <Route exact path="/auth/login">
            <LoginPage />
          </Route>
          <Route exact path="/auth/sign-up">
            <SignUpPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
