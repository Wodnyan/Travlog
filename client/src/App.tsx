import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { removeError as removeErrorAction } from "./redux/actions";
import { GlobalStyles } from "./styles/Global";
import { ErrorMessage } from "./types";
import { Notification } from "./styles/Notification";
import { AbsoluteContainer } from "./styles/Global";
import Map from "./views/Map";
import LoginPage from "./views/Login";
import SignUpPage from "./views/SignUp";

interface Props {
  error?: [] | ErrorMessage[];
}

const App: React.FC<Props> = ({ error }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let removeError: number;
    if (error && error.length > 0) {
      removeError = window.setInterval(() => {
        dispatch(removeErrorAction(error[0].id));
      }, 3000);
    }
    return () => {
      window.clearInterval(removeError);
    };
  });

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
        <AbsoluteContainer top={0} left={0}>
          {error &&
            (error as ErrorMessage[]).map((error) => (
              <Notification type="warning">{error.message}</Notification>
            ))}
        </AbsoluteContainer>
      </Router>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { error } = state;
  return { error };
};

export default connect(mapStateToProps, {
  removeErrorAction,
})(App);
