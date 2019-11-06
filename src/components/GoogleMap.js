import React from 'react';
import mapStyles from '../mapStyles';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

const defaultMapOptions = {
  styles: mapStyles,
};
const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultOptions={defaultMapOptions}
      defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}>
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.location.lat, lng: props.location.lng }}
        />
      )}
    </GoogleMap>
  )),
);

const MapWithMultipleMarkers = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].lng }}
      defaultOptions={defaultMapOptions}>
      {props.markers.map((marker) => {
        return (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.label}
          />
        );
      })}
    </GoogleMap>
  )),
);
export { MapWithAMarker, MapWithMultipleMarkers };
