// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { BACKEND_PORT } from '../defualtTestValues';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// before(() => {
//   cy.log('reseeding database!!!!!!');
//   const CURRENT_WORKING = '/Users/devsquads/projects/medad/medad_frontend';
//   const SERVER_PATH = '/Users/devsquads/projects/medad/medad-server';
//   cy.exec(
//     `cd ${SERVER_PATH} && make sandbox-drop && make sandbox-setup && cd ${CURRENT_WORKING}`,
//   )
//     .its('code')
//     .should('eq', 0);

// });
const waitForLocalhost = require('wait-for-localhost');

before(() => waitForLocalhost({ port: BACKEND_PORT }));
