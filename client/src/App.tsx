import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  removeNotification as removeNotificationAction,
  addNotification,
} from "./redux/actions";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { GlobalStyles } from "./styles/Global";
import { Notification as NotificationTypes } from "./types";
import { Notification } from "./styles/Notification";
import { AbsoluteContainer } from "./styles/Global";
import Map from "./views/Map";
import LoginPage from "./views/Login";
import SignUpPage from "./views/SignUp";

interface Props {
  notifications?: [] | NotificationTypes[];
}

const App: React.FC<Props> = ({ notifications }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let removeNotification: number;
    if (notifications && notifications.length > 0) {
      removeNotification = window.setInterval(() => {
        dispatch(removeNotificationAction(notifications[0].id));
      }, 5000);
    }
    return () => {
      window.clearInterval(removeNotification);
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
        <AbsoluteContainer top={10} left={10}>
          <TransitionGroup>
            {notifications &&
              (notifications as NotificationTypes[]).map((notification) => (
                <CSSTransition
                  key={notification.id}
                  classNames="notification"
                  timeout={200}
                  unmountOnExit
                >
                  <Notification type={notification.type}>
                    {notification.message}
                  </Notification>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </AbsoluteContainer>
      </Router>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { notifications } = state;
  return { notifications };
};

export default connect(mapStateToProps, {
  removeNotificationAction,
  addNotification,
})(App);
