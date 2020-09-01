import React from "react";
import MapGl from "../components/Map/Map";
import styled from "styled-components";

const Container = styled.section`
  position: relative;
  height: 100%;
`;

const Map = () => {
  return (
    <Container>
      <MapGl />
    </Container>
  );
};

export default Map;
