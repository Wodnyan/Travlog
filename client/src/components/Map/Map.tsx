import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMapGl, { Marker } from "react-map-gl";

interface MapViewport {
  width: string | number;
  height: string | number;
  latitude: number;
  longitude: number;
  zoom: number;
}

interface LogEntry {
  _id: string;
  title: string;
  description: string;
}

interface MarkerType {
  lng: number;
  lat: number;
}

const MapPin = styled.svg`
  transform: translate(-50%, -100%);
`;

const Map = () => {
  const [logEntries, setLogEntries] = useState<[] | [LogEntry]>([]);
  const [newEntry, setNewEntry] = useState<null | MarkerType>({
    lng: 22,
    lat: 22,
  });
  const [viewport, setViewport] = useState<MapViewport>({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3,
  });
  //Resize map on browser resize.
  useEffect(() => {
    const resizeMapDimensions = (e: UIEvent) => {
      setViewport((prev) => {
        return {
          ...prev,
          height: "100%",
          width: "100%",
        };
      });
    };
    window.addEventListener("resize", resizeMapDimensions);
    return () => {
      window.removeEventListener("resize", resizeMapDimensions);
    };
  });
  const handleAddNewMarker = (e: any) => {
    setNewEntry({
      lng: e.lngLat[0],
      lat: e.lngLat[1],
    });
  };
  return (
    <ReactMapGl
      {...viewport}
      doubleClickZoom={false}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1Ijoid29kbnlhbiIsImEiOiJja2UydWJuZW0wY3NxMzduN2ZwOGIxdm9lIn0.xNPhlTTsb9LY3LDXiAJ9sw"
      onDblClick={(e) => handleAddNewMarker(e)}
    >
      {newEntry && (
        <Marker longitude={newEntry.lng} latitude={newEntry.lat}>
          <MapPin
            viewBox="0 0 24 24"
            width="30"
            height="30"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            onClick={() => console.log("hello")}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </MapPin>
        </Marker>
      )}
    </ReactMapGl>
  );
};
export default Map;
