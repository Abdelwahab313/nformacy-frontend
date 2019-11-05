import React from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const GoogleMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}>
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.location.lat, lng: props.location.lng }}
        />
      )}
    </GoogleMap>
  )),
);
export default GoogleMapComponent;
// <MapWithAMarker
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
// />
