import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker, PointerEvent, Popup } from "react-map-gl";
import NewMarker from "./NewMarker";
import MapPin from "./MapPin";
import { LogEntry, User } from "../../types";
import EntryCard from "../EntryCard/EntryCard";
import { connect, useDispatch } from "react-redux";
import { addEntry } from "../../redux/actions";

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

interface Props {
  entries: [] | LogEntry[];
  user: null | User;
}

const Map: React.FC<Props> = ({ entries, user }) => {
  const [newMarkerLocation, setNewMarkerLocation] = useState<null | NewEntry>(
    null
  );
  const [showPopup, setShowPopup] = useState<null | string>(null);
  const [viewport, setViewport] = useState<MapViewport>({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const dispatch = useDispatch();

  //Get Logs
  useEffect(() => {
    async function getLogEntries() {
      const ENDPOINT = "http://localhost:5050/api/v1/travel-logs";
      const resp = await fetch(ENDPOINT, { credentials: "include" });
      const { data } = await resp.json();
      if (!data) {
        return console.log("No entries found");
      }
      data.forEach((entry: any) => {
        dispatch(
          addEntry({
            _id: entry._id,
            description: entry.description,
            title: entry.title,
            lat: entry.lat,
            lng: entry.long,
          })
        );
      });
    }
    getLogEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const removeLogEntryForm = () => setNewMarkerLocation(null);
  const removeEntryPopup = () => setShowPopup(null);
  const removeAllMarkers = () => {
    removeLogEntryForm();
    removeEntryPopup();
  };
  return (
    <ReactMapGl
      {...viewport}
      doubleClickZoom={false}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1Ijoid29kbnlhbiIsImEiOiJja2UydWJuZW0wY3NxMzduN2ZwOGIxdm9lIn0.xNPhlTTsb9LY3LDXiAJ9sw"
      onDblClick={handleAddNewMarker}
      onClick={removeAllMarkers}
    >
      {newMarkerLocation && (
        <NewMarker
          isAuth={user === null ? false : true}
          lng={newMarkerLocation.lng}
          lat={newMarkerLocation.lat}
        />
      )}
      {(entries as LogEntry[]).map((entry) => (
        <div key={entry._id} onClick={removeLogEntryForm}>
          <Marker latitude={entry.lat} longitude={entry.lng}>
            <div onClick={() => setShowPopup(entry._id || null)}>
              <MapPin />
            </div>
          </Marker>
          {showPopup === entry._id && newMarkerLocation === null && (
            <Popup
              latitude={entry.lat}
              longitude={entry.lng}
              closeButton={false}
            >
              <EntryCard
                _id={entry._id}
                lng={entry.lng}
                lat={entry.lat}
                title={entry.title}
                description={entry.description}
              />
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGl>
  );
};

const mapStateToProps = (state: any) => {
  const { entries, user } = state;
  return { entries, user };
};

// export default Map;
export default connect(mapStateToProps, {
  addEntry,
})(Map);
