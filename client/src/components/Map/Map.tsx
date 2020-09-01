import React, { useState, useEffect } from "react";
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

const Map = () => {
  const [logEntries, setLogEntries] = useState<[] | [LogEntry]>([]);
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

  return (
    <ReactMapGl
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1Ijoid29kbnlhbiIsImEiOiJja2UydWJuZW0wY3NxMzduN2ZwOGIxdm9lIn0.xNPhlTTsb9LY3LDXiAJ9sw"
    ></ReactMapGl>
  );
};
export default Map;
