import React from "react";
import styled from "styled-components";

const StyledMapPin = styled.svg`
  transform: translate(-50%, -100%);
`;

const MapPin = () => {
  return (
    <StyledMapPin
      viewBox="0 0 24 24"
      width="30"
      height="30"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </StyledMapPin>
  );
};
export default MapPin;
