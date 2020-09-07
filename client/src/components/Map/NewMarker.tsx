import React from "react";
import { Popup } from "react-map-gl";
import Form from "../EntryForm/EntryForm";

interface NewMarker {
  lng: number;
  lat: number;
}

const NewMarker: React.FC<NewMarker> = ({ lng, lat }) => {
  return (
    <>
      <Popup latitude={lat} longitude={lng} anchor="bottom" closeButton={false}>
        <Form lng={lng} lat={lat} />
      </Popup>
    </>
  );
};
export default NewMarker;
