import {
  createRequestWithToke,
  generateRandomString,
  login,
  logout,
  searchForItemInTable,
} from '../helperFunctions';
import { BACKEND_WEB_URL, PASSWORD, USER_NAME } from '../defualtTestValues';

const fillOutSalesRepForm = (formData) => {
  cy.get('#firstName')
    .clear()
    .type(formData.firstName);
  cy.get('#lastName')
    .clear()
    .type(formData.lastName);
  if (formData.password) {
    cy.get('#password')
      .clear()
      .type(formData.password);
    cy.get('#confirm-password')
      .clear()
      .type(formData.password);
  }
  cy.get('#nationalId')
    .clear()
    .type(formData.nationalId);
  cy.get('#userName')
    .clear()
    .type(formData.userName);
  cy.get('#phone_number')
    .clear()
    .type(formData.phoneNumber);
};
const assertSalesRepDataInTableFirstRow = (
  firstName,
  lastName,
  phoneNumber,
  nationalId,
  userName,
) => {
  const salesRepFullNameCssSelector = 'table >  tbody > tr > td:nth-child(3)';
  const salesRepPhoneNumberCssSelector =
    'table >  tbody > tr > td:nth-child(5)';
  const salesRepNationalIdCssSelector = 'table >  tbody > tr > td:nth-child(7)';
  const salesRepUserNameCssSelector = 'table >  tbody > tr > td:nth-child(9)';
  cy.get(salesRepFullNameCssSelector).should(
    'have.text',
    `${firstName} ${lastName}`,
  );
  cy.get(salesRepPhoneNumberCssSelector).should('have.text', phoneNumber);
  cy.get(salesRepNationalIdCssSelector).should('have.text', nationalId);
  cy.get(salesRepUserNameCssSelector).should('have.text', userName);
};

describe('Sales Representative', () => {
  let firstName;
  let lastName;
  let password;
  let nationalId;
  let userName;
  let phoneNumber = '01';

  before(() => {
    firstName = generateRandomString();
    lastName = generateRandomString();
    password = generateRandomString();
    nationalId = generateRandomString(14, true);
    userName = generateRandomString();
    phoneNumber += generateRandomString(9, true);
  });
  beforeEach(() => {
    login();
    cy.get('#reps').click();
  });
  afterEach(() => {
    logout();
  });

  describe('Add Sales Rep', () => {
    it('should be able to add new sales representative', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId,
        userName,
        phoneNumber,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      searchForItemInTable(nationalId);
      assertSalesRepDataInTableFirstRow(
        firstName,
        lastName,
        phoneNumber,
        nationalId,
        userName,
      );
      cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
        username: userName,
        password: password,
      }).then((response) => {
        expect(response).to.have.property('status', 200);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('user');
      });
    });
    it('should display error all fields are required', () => {
      cy.get('#add-sales-rep-button').click();
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#firstName-helper-text').should(
        'have.html',
        'برجاء ادخال اسم الموظف الأول',
      );
      cy.get('#lastName-helper-text').should(
        'have.html',
        'برجاء ادخال اسم الموظف الاخير',
      );
      cy.get('#password-helper-text').should(
        'have.html',
        'برجاء ادخال كلمه السر',
      );
      cy.get('#confirm-password-helper-text').should(
        'have.html',
        'برجاء تاكيد ادخال كلمة المرور',
      );
      cy.get('#nationalId-helper-text').should(
        'have.html',
        'برجاء ادخال الرقم القومى',
      );
      cy.get('#userName-helper-text').should(
        'have.html',
        'برجاء ادخال اسم تسجيل الدخول',
      );
      cy.get('#phone_number-helper-text').should(
        'have.html',
        'برجاء ادخال رقم الهاتف',
      );
    });
    it('should display error if  invalid national id used', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId: generateRandomString(),
        userName,
        phoneNumber,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#nationalId-helper-text').should(
        'have.html',
        'الرقم يجب ان يكون ١٤ رقم',
      );
    });
    it('should display error if invalid userName  used', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId,
        userName: generateRandomString(10, true),
        phoneNumber,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#userName-helper-text').should(
        'have.html',
        'اسم تسجيل الدخول غير صالح',
      );
    });
    it('should display error if invalid phoneNumber used', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId,
        userName,
        phoneNumber: generateRandomString(),
      });
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#phone_number-helper-text').should(
        'have.html',
        'رقم الهاتف غير صحيح',
      );
    });
    it('should be able to close dialog', () => {
      cy.get('#add-sales-rep-button').click();
      cy.get('#close-sales-rep-form-btn').click();
      const tableTitleCssSelector = 'div > div > h6';
      cy.get(tableTitleCssSelector).should('have.length', 1);
    });
    it('should not be able to add user if national id already exist', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId,
        userName: generateRandomString(),
        phoneNumber: `01${generateRandomString(9, true)}`,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#customized-dialog-title > h2').should('have.length', 1);
      cy.get('#customized-dialog-title > h2').should(
        'have.html',
        'A user with that national id already exists.',
      );
    });
    it('should not be able to add user if userName already exist', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId: generateRandomString(14, true),
        userName,
        phoneNumber: `01${generateRandomString(9, true)}`,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#customized-dialog-title > h2').should('have.length', 1);
      cy.get('#customized-dialog-title > h2').should(
        'have.html',
        'A user with that username already exists.',
      );
    });
    it('should not be able to add user if phone number already exist', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId: generateRandomString(14, true),
        userName: generateRandomString(),
        phoneNumber,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#customized-dialog-title > h2').should('have.length', 1);
      cy.get('#customized-dialog-title > h2').should(
        'have.html',
        'A user with that phone number already exists.',
      );
    });
    it('should not be able to add user if phone number & userName & nationalId already exist', () => {
      cy.get('#add-sales-rep-button').click();
      fillOutSalesRepForm({
        firstName,
        lastName,
        password,
        nationalId,
        userName,
        phoneNumber,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      cy.get('#customized-dialog-title > h2').should('have.length', 1);
      cy.get('#customized-dialog-title > h2').should(
        'have.html',
        'A user with that username already exists., A user with that phone number already exists., A user with that national id already exists.',
      );
    });
  });
  describe('Edit scenario', () => {
    it('should be able to edit sales rep', () => {
      const salesRep = {
        userName: generateRandomString(),
        phoneNumber: `01${generateRandomString(9, true)}`,
        password: generateRandomString(),
        firstName: 'test',
        lastName: 'edit',
        nationalId: generateRandomString(14, true),
      };
      createRequestWithToke((token) => {
        cy.request({
          method: 'POST',
          url: `${BACKEND_WEB_URL}/users/`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            username: salesRep.userName,
            phone_number: salesRep.phoneNumber,
            password: salesRep.password,
            first_name: salesRep.firstName,
            last_name: salesRep.lastName,
            national_id: salesRep.nationalId,
          },
        });
      });
      cy.reload();
      searchForItemInTable(salesRep.nationalId);
      cy.get('table >  tbody > tr ').click();
      cy.get('#edit_salesRep_btn').click();
      const newNationalId = generateRandomString(14, true);
      const newPhoneNumber = `01${generateRandomString(9, true)}`;
      fillOutSalesRepForm({
        firstName: `new${salesRep.firstName}`,
        lastName: `new${salesRep.lastName}`,
        nationalId: newNationalId,
        userName: `new${salesRep.userName}`,
        phoneNumber: newPhoneNumber,
      });
      cy.get('#save_sales_rep_submit_btn').click();
      searchForItemInTable(newNationalId);
      assertSalesRepDataInTableFirstRow(
        `new${salesRep.firstName}`,
        `new${salesRep.lastName}`,
        newPhoneNumber,
        newNationalId,
        `new${salesRep.userName}`,
      );
    });
  });
  describe('Reset Password', () => {
    let salesRep;
    beforeEach(() => {
      salesRep = {
        userName: generateRandomString(),
        phoneNumber: `01${generateRandomString(9, true)}`,
        password: generateRandomString(),
        firstName: 'test',
        lastName: 'edit',
        nationalId: generateRandomString(14, true),
      };
      createRequestWithToke((token) => {
        cy.request({
          method: 'POST',
          url: `${BACKEND_WEB_URL}/users/`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            username: salesRep.userName,
            phone_number: salesRep.phoneNumber,
            password: salesRep.password,
            first_name: salesRep.firstName,
            last_name: salesRep.lastName,
            national_id: salesRep.nationalId,
          },
        });
      });
      cy.reload();
    });
    it('should be able to reset password', () => {
      searchForItemInTable(salesRep.nationalId);
      cy.get('table >  tbody > tr ').click();
      cy.get('#reset_password_salesRep_btn').click();

      // act
      cy.get('#resetPasswordForm').should('have.length', 1);
      let newPassword = '123456';
      cy.get('#password')
        .clear()
        .type(newPassword);
      cy.get('#confirm-password')
        .clear()
        .type(newPassword);
      cy.get('#reset_password_submit_btn').click();

      // assert
      cy.get('#resetPasswordForm').should('have.length', 0);
      cy.request('POST', `${BACKEND_WEB_URL}/auth/login`, {
        username: salesRep.userName,
        password: newPassword,
      }).then((response) => {
        expect(response).to.have.property('status', 200);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('user');
      });
    });
    it('should display error message when fields are empty', () => {
      searchForItemInTable(salesRep.nationalId);
      cy.get('table >  tbody > tr ').click();
      cy.get('#reset_password_salesRep_btn').click();
      cy.get('#reset_password_submit_btn').click();

      // act
      cy.get('#password-helper-text').should(
        'have.text',
        'برجاء ادخال كلمة المرور',
      );
      cy.get('#confirm-password-helper-text').should(
        'have.text',
        'برجاء تاكيد ادخال كلمة المرور',
      );
    });
    it('should display error confirm password must match', () => {
      searchForItemInTable(salesRep.nationalId);
      cy.get('table >  tbody > tr ').click();
      cy.get('#reset_password_salesRep_btn').click();
      cy.get('#reset_password_submit_btn').click();

      // act
      cy.get('#password')
        .clear()
        .type('newPassword');

      cy.get('#confirm-password')
        .clear()
        .type('newPassword 1');

      cy.get('#confirm-password-helper-text').should(
        'have.text',
        'برجاء تاكد من تطابق كلمه المرور',
      );
    });
  });
});
