import {
  createRequestWithToke,
  generateRandomString,
  login,
  logout,
  searchForItemInTable,
} from '../helperFunctions';
import { BACKEND_WEB_URL } from '../defualtTestValues';

let uuidList = [];

function createClientFromAPI(testClient) {
  createRequestWithToke((token) => {
    cy.request({
      method: 'POST',
      url: `${BACKEND_WEB_URL}/clients/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        name: testClient.name,
        ownerName: testClient.ownerName,
        address: testClient.address,
        image_link: testClient.image_link,
        verified: testClient.verified,
        location: testClient.location,
        contacts: [
          {
            phone_number: testClient.phoneNumber,
          },
        ],
      },
    }).then((response) => {
      uuidList.push(response.body.uuid);
    });
  });
}

function assertClientInDataTableWithRow(testClient) {
  cy.get('td[data-testid="MuiDataTableBodyCell-1-0"]').should(
    'have.text',
    testClient.name,
  );
  cy.get('td[data-testid="MuiDataTableBodyCell-2-0"]').should(
    'have.text',
    testClient.ownerName,
  );
  cy.get('td[data-testid="MuiDataTableBodyCell-3-0"]').should(
    'have.text',
    testClient.address,
  );
  cy.get('td[data-testid="MuiDataTableBodyCell-5-0"]').should(
    'have.text',
    testClient.phoneNumber,
  );
  if (testClient.verified) {
    cy.get('td[data-testid="MuiDataTableBodyCell-6-0"]').should(
      'have.descendants',
      'p:contains("مُوثق")',
    );
  } else {
    cy.get('td[data-testid="MuiDataTableBodyCell-6-0"]').should(
      'have.descendants',
      'div:contains("غير مُوثق")',
    );
  }
  cy.get('td[data-testid="MuiDataTableBodyCell-7-0"]').should('exist');
}

describe('Client', () => {
  let testClient;
  beforeEach(() => {
    testClient = {
      name: generateRandomString(),
      ownerName: generateRandomString(),
      address: 'test address',
      image_link: 'https://via.placeholder.com/150',
      verified: false,
      location: 'POINT(30 30.5)',
      phoneNumber: `01${generateRandomString(9, true)}`,
    };

    createClientFromAPI(testClient);
    login();
    cy.get('#clients').click();
  });
  afterEach(() => {
    logout();
    createRequestWithToke((token) => {
      while (uuidList.length > 0) {
        cy.request({
          method: 'DELETE',
          url: `${BACKEND_WEB_URL}/clients/${uuidList.pop()}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    });
  });
  describe('List Clients', () => {
    it('should be able to view the clients table', () => {
      searchForItemInTable(testClient.phoneNumber);

      assertClientInDataTableWithRow(testClient);
    });
    it('should filter clients based on verified or not', () => {
      const verifiedTestClient = {
        name: generateRandomString(),
        ownerName: generateRandomString(),
        address: 'test address',
        image_link: 'https://via.placeholder.com/150',
        verified: true,
        location: 'POINT(30 30.5)',
        phoneNumber: `01${generateRandomString(9, true)}`,
      };
      createClientFromAPI(verifiedTestClient);
      cy.wait(500);
      cy.reload();
      cy.get('button[data-testid="تصنيف-iconButton"]').click();
      cy.get('.MuiPaper-root ul .MuiInput-formControl').click();
      cy.get('*[data-value="مُوثق"]').click();
      cy.get('span.MuiChip-label').should('have.text', 'مُوثق');

      cy.get('body').type('{esc}');
      searchForItemInTable(verifiedTestClient.phoneNumber);
      assertClientInDataTableWithRow(verifiedTestClient);
    });
    it('should be able to verify client', () => {
      searchForItemInTable(testClient.phoneNumber);
      cy.get('td[data-testid="MuiDataTableBodyCell-6-0"] button').click();

      cy.get('#customized-dialog-title h2').should(
        'have.text',
        `سيتم توثيق العميل: ${testClient.name}`,
      );
      cy.get('.MuiDialogActions-root button span.MuiButton-label').should(
        'have.text',
        'هل انت متأكد من ثوثيق هـذا العميل',
      );
      cy.get('.MuiDialogActions-root button').click();
      cy.wait(500);

      const searchInputCss =
        'div.MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters>div> div > div > div > input';
      cy.get(searchInputCss).type(testClient.phoneNumber);
      assertClientInDataTableWithRow({ ...testClient, verified: true });
    });
    xit('should display the location of all clients in the map', () => {});
  });

  describe('Show Client details', () => {
    it('should show client details', () => {
      searchForItemInTable(testClient.phoneNumber);
      cy.get('.MuiIconButton-label input[type="checkbox"]').click();
      cy.get('#show_details_client_btn').click();

      cy.get('#clientName td:nth-child(2)').should(
        'have.text',
        testClient.name,
      );
      cy.get('#ownerName td:nth-child(2)').should(
        'have.text',
        testClient.ownerName,
      );
      cy.get('#address td:nth-child(2)').should(
        'have.text',
        testClient.address,
      );
      cy.get('#phones td:nth-child(2)').should(
        'have.text',
        ` ${testClient.phoneNumber} `,
      );
      cy.get('#status td:nth-child(2) div').should('contain.text', 'غير مُوثق');
      cy.get('#client-image').should('exist');
    });
  });
});
