import React, { useState, useRef, useEffect } from "react";
import { UserLocationInfo } from "../../interfaces"
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import Burger from "../Burger/Burger"

const MapContainer = styled.section`
  height: 100%;
`;

const Map = () => {
  const [location, setLocation] = useState<UserLocationInfo>({ long: 0, lat: 0 });
  const mapRef = useRef<any>(null);
  mapboxgl.accessToken = "pk.eyJ1Ijoid29kbnlhbiIsImEiOiJja2UydWJuZW0wY3NxMzduN2ZwOGIxdm9lIn0.xNPhlTTsb9LY3LDXiAJ9sw";
  //Draw map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [location.long, location.lat],
      zoom: location.long !== 0 ? 15 : 0,
    });
  }, [mapRef, location]);

  //Get user location
  useEffect(() => {
    fetch("http://ip-api.com/json/")
      .then((resp: any) => resp.json())
      .then((resp: any) => setLocation({lat: resp.lat, long: resp.lon}))
  }, []);
  return (
    <>
      <MapContainer ref={mapRef} />
      <Burger />
    </>
  );
};
export default Map;
