import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  BACKEND_WEB_URL,
} from '../../defualtTestValues';

export const requestAsAdmin = (requestBody) => {
  let token = Cypress.env('adminTokens');

  if (!!token) {
    return cy.request({
      ...requestBody,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return cy
      .request('POST', `${BACKEND_WEB_URL}/auth/login`, {
        email: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      })
      .then((response) => {
        token = response.body.token;
        Cypress.env('adminTokens', response.body.token);
        return cy.request({
          ...requestBody,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });
  }
};
