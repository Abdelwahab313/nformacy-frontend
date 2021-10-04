import { makeStyles } from '@material-ui/core';
import LoadingCircle from 'components/progress/LoadingCircle';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

const defaultRoomName =
  'vpaas-magic-cookie-1ceb5fdff3384c0aa208b55a99ae2c74/DefaultNformacyCall';

export const importJitsiApi = () =>
  new Promise(async (resolve) => {
    if (window.JitsiMeetExternalAPI) {
      resolve(window.JitsiMeetExternalAPI);
    } else {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');

      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://8x8.vc/external_api.js');

      head.addEventListener(
        'load',
        function(event) {
          if (event.target.nodeName === 'SCRIPT') {
            resolve(window.JitsiMeetExternalAPI);
          }
        },
        true,
      );

      head.appendChild(script);
    }
  });

const JitsiCall = () => {
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const classes = useStyles();
  const location = useLocation();
  const jwt = location?.state?.jwt;
  let roomId = location?.state?.roomId;
  roomId = roomId ?? defaultRoomName;

  // @TODO needs to handle if any of roomId or jwt is empty

  const startConference = (JitsiMeetExternalAPI) => {
    try {
      const options = {
        roomName: roomId,
        parentNode: ref.current,
        interfaceConfigOverwrite: {
          HIDE_INVITE_MORE_HEADER: true,
        },
        jwt,
      };
      const domain = '8x8.vc';
      const api = new JitsiMeetExternalAPI(domain, options);
      if (!api)
        throw new Error('Failed to create JitsiMeetExternalAPI istance');

      api.addEventListener('videoConferenceJoined', () => {
        setLoading(false);
        // api.executeCommand('displayName', "Test user")
      });
    } catch (error) {
      // console.error('Failed to start the conference', error);
    }
  };

  useEffect(() => {
    return importJitsiApi()
      .then((jitsiApi) => {
        setLoading(false);
        startConference(jitsiApi);
      })
      .catch(() => {
        // console.error('Jitsi Meet API library not loaded.', err);
      });
  }, []);

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <div id='jaas-container' className={classes.root}>
      <div id='react-jitsi-container' className={classes.callContainer}>
        <div id='react-jitsi-frame' className={classes.callFrame} ref={ref} />
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
  callContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  callFrame: { flex: 1 },
}));

export default JitsiCall;
