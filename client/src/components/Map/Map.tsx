import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker, PointerEvent, Popup } from "react-map-gl";
import NewMarker from "./NewMarker";
import { LogEntry } from "../../types";

interface MapViewport {
  width: string | number;
  height: string | number;
  latitude: number;
  longitude: number;
  zoom: number;
}

interface NewEntry {
  lng: number;
  lat: number;
}

const Map = () => {
  const [logEntries, setLogEntries] = useState<[] | LogEntry[]>([]);
  const [newMarkerLocation, setNewMarkerLocation] = useState<null | NewEntry>(
    null
  );
  const [viewport, setViewport] = useState<MapViewport>({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 1,
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
  const handleAddNewMarker = (e: PointerEvent) => {
    setNewMarkerLocation((prev) => {
      return {
        lng: e.lngLat[0],
        lat: e.lngLat[1],
      };
    });
  };
  return (
    <ReactMapGl
      {...viewport}
      doubleClickZoom={false}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1Ijoid29kbnlhbiIsImEiOiJja2UydWJuZW0wY3NxMzduN2ZwOGIxdm9lIn0.xNPhlTTsb9LY3LDXiAJ9sw"
      onDblClick={handleAddNewMarker}
    >
      {newMarkerLocation && (
        <NewMarker lng={newMarkerLocation.lng} lat={newMarkerLocation.lat} />
      )}
    </ReactMapGl>
  );
};
export default Map;
