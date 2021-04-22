const DEV_URL = 'http://127.0.0.1:3000';
const DEV_CHANNEL_URL = 'ws://127.0.0.1:3000/cable';
const E2E_URL = 'http://127.0.0.1:3001';
const E2E_CHANNEL_URL = 'ws://127.0.0.1:3001/cable';
const STAGING_DOMAIN = '52.27.19.148';
const STAGING_SERVER_URL = `http://${STAGING_DOMAIN}:3000`;
const STAGING_CHANNEL_URL = `ws://${STAGING_DOMAIN}:3000`;

export const CHANNEL_URL =
  process.env.REACT_APP_ENV === 'e2e'
    ? E2E_CHANNEL_URL
    : process.env.REACT_APP_ENV === 'staging'
    ? STAGING_CHANNEL_URL
    : DEV_CHANNEL_URL;

export const NOTIFICATION_CHANNEL_IDENTIFIER = 'Noticed::NotificationChannel';

export const TINY_MCE_API_KEY =
  '44ua1dtg4p19z2qpc3jwlmueb9oe5bntskfmdgjm0yxfu1ea';
export const GOOGLE_RECAPTCHA_URL = '6LdnpakaAAAAAHk4Z_gg3b2iqpQzimBmnGSy-l__';
export const GOOGLE_ANALYTICS_TRACKING_ID =
  process.env.REACT_APP_ENV === 'staging' ? 'UA-161518620-1' : ''; // YOUR_OWN_TRACKING_ID

export const API_BASE_URL =
  process.env.REACT_APP_ENV === 'e2e'
    ? E2E_URL
    : process.env.REACT_APP_ENV === 'staging'
    ? STAGING_SERVER_URL
    : DEV_URL;

export const immortalQueryConfig = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: true,
};
