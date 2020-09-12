import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { addUser, addError } from "../redux/actions";
import MapGl from "../components/Map/Map";
import styled from "styled-components";

const Container = styled.section`
  position: relative;
  height: 100%;
`;

const Map = () => {
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
          dispatch(
            addError(
              "You are browsing as a GUEST, some features might not be available to you"
            )
          );
          return console.log("Unathorized");
        }
        const user = await resp.json();
        dispatch(addUser(user));
      } catch (error) {
        console.error(error);
      }
    })();
  });

  return (
    <Container>
      <MapGl />
    </Container>
  );
};

export default connect(null, {
  addUser,
  addError,
})(Map);
