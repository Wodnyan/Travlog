import React from "react";
import styled from "styled-components";
import { Popup } from "react-map-gl";
import Form from "../EntryForm/EntryForm";

interface NewMarker {
  lng: number;
  lat: number;
}

const Container = styled.div`
  .popup {
    z-index: 100000000;
  }
`;

const NewMarker: React.FC<NewMarker> = ({ lng, lat }) => {
  return (
    <Container>
      <Popup
        latitude={lat}
        longitude={lng}
        anchor="bottom"
        closeButton={false}
        className="popup"
      >
        <Form lng={lng} lat={lat} />
      </Popup>
    </Container>
  );
};
export default NewMarker;
