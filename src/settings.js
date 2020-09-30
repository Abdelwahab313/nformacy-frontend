const DEV_URL = 'http://127.0.0.1:3000';
const E2E_URL = 'http://127.0.0.1:3001';
const STAGING_URL = 'http://medad.devsquads.com:3000';

export const CHANNEL_URL = 'ws://127.0.0.1:3000'

export const API_BASE_URL =
  process.env.REACT_APP_ENV === 'e2e'
    ? E2E_URL
    : process.env.REACT_APP_ENV === 'staging'
    ? STAGING_URL
    : DEV_URL;
