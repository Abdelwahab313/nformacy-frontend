import React from 'react';
import mapStyles from '../mapStyles';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { default_location } from '../settings';

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
  withGoogleMap(({ markers }) => {
    if (markers.length > 0) {
      return (
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{ lat: markers[0].lat, lng: markers[0].lng }}
          defaultOptions={defaultMapOptions}>
          {markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                label={marker.label}
              />
            );
          })}
        </GoogleMap>
      );
    } else {
      return (
        <GoogleMap
          defaultZoom={13}
          defaultCenter={default_location}
          defaultOptions={defaultMapOptions}
        />
      );
    }
  }),
);
export { MapWithAMarker, MapWithMultipleMarkers };
