import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

const MapContainer = styled.section`
  height: 100%;
`;

const Map = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoid29kbnlhbiIsImEiOiJja2UydWJuZW0wY3NxMzduN2ZwOGIxdm9lIn0.xNPhlTTsb9LY3LDXiAJ9sw";
  const mapRef = useRef<any>(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [30.5, 50.5],
      zoom: 1,
    });
  }, [mapRef]);
  return (
    <>
      <MapContainer ref={mapRef} />
    </>
  );
};
export default Map;
