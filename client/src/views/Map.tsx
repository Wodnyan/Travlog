import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { addUser, addNotification } from "../redux/actions";
import MapGl from "../components/Map/Map";
import { AbsoluteContainer } from "../styles/Global";
import { User } from "../types";
import Menu from "../components/Menu/Menu";
import styled from "styled-components";

const Container = styled.section`
  position: relative;
  height: 100%;
`;

interface Props {
  user: User | null;
}

const Map: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const ENDPOINT = "http://localhost:5050/auth/login";
      const OPTIONS: RequestInit = {
        method: "GET",
        credentials: "include",
      };
      try {
        const resp = await fetch(ENDPOINT, OPTIONS);
        if (resp.status === 401) {
          return dispatch(
            addNotification(
              "You are browsing as a GUEST, some features might not be available to you",
              "warning"
            )
          );
        } else if (!resp.ok) {
          return dispatch(addNotification("Something went wrong"));
        } else {
          const user = await resp.json();
          return dispatch(addUser(user));
        }
      } catch (error) {
        dispatch(addNotification("Something went wrong"));
      }
    })();
  });

  useEffect(() => {
    if (user !== null) {
      dispatch(addNotification("Double click on the map to add a new entry"));
    }
  }, [dispatch, user]);

  return (
    <Container>
      <MapGl />
      <AbsoluteContainer right={0} top={0}>
        <Menu />
      </AbsoluteContainer>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, {
  addUser,
  addNotification,
})(Map);
