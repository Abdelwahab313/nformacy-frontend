import {
  generateRandomNumber,
  generateRandomString,
  login,
  logout,
  searchForItemInTable,
} from '../../helperFunctions';

const assertProductDataInTableFirstRow = (
  ProductName,
  ProductSku,
  ProductPrice,
) => {
  const productNameCssSelector = 'table >  tbody > tr > td:nth-child(3)';
  const productSkuCssSelector = 'table >  tbody > tr > td:nth-child(5)';
  const productPriceCssSelector = 'table >  tbody > tr > td:nth-child(7)';
  cy.get(productNameCssSelector).should('have.text', ProductName);
  cy.get(productSkuCssSelector).should('have.text', ProductSku);
  cy.get(productPriceCssSelector).should(
    'have.text',
    parseFloat(ProductPrice).toFixed(2),
  );
};

const enterProductData = (ProductName, ProductSku, ProductPrice) => {
  cy.get('#productName')
    .clear()
    .type(ProductName);
  cy.get('#sku')
    .clear()
    .type(ProductSku);
  cy.get('#price')
    .clear()
    .type(ProductPrice);
};

describe('Product', () => {
  let productName;
  let productSku;
  let productPrice;

  before(() => {
    productName = generateRandomString();
    productSku = generateRandomString();
    productPrice = generateRandomNumber();
  });
  beforeEach(() => {
    login();
    cy.get('#products').click();
  });
  it('should be able to add product', () => {
    cy.get('#add-product-button').click();
    enterProductData(productName, productSku, productPrice);
    cy.get('#add_product_submit_btn').click();
    searchForItemInTable(productName);
    cy.get('table >  tbody > tr ').should('have.length', 1);
    assertProductDataInTableFirstRow(productName, productSku, productPrice);
  });
  it('should not be able to add the product if sku already exist', () => {
    cy.get('#add-product-button').click();
    enterProductData(productName, productSku, productPrice);
    cy.get('#add_product_submit_btn').click();
    cy.get('#customized-dialog-title > h2').should('have.length', 1);
  });
  it('should be able to close dialog', () => {
    cy.get('#add-product-button').click();
    cy.get('#close_insert_product_btn').click();
    cy.get('div > div > h6').should('have.length', 1);
  });
  it('should display error fields are required', () => {
    cy.get('#add-product-button').click();
    cy.get('#add_product_submit_btn').click();
    cy.get('#productName-helper-text').should('have.length', 1);
    cy.get('#productName-helper-text').should(
      'have.html',
      'برجاء ادخال اسم المنتج',
    );
    cy.get('#sku-helper-text').should('have.length', 1);
    cy.get('#sku-helper-text').should(
      'have.html',
      'برجاء ادخال الرقم التسلسلى',
    );
    cy.get('#price-helper-text').should('have.length', 1);
    cy.get('#price-helper-text').should('have.html', 'برجاء ادخال سعر المنتج');
  });
  it('should display error if price is not number', () => {
    cy.get('#add-product-button').click();
    enterProductData(productName, productSku, 'wrong_price');
    cy.get('#add_product_submit_btn').click();
    cy.get('#price-helper-text').should('have.html', 'السعر يجب ان يكون رقم');
  });
  it('should be able to edit product', () => {
    searchForItemInTable(productName);
    cy.get('table >  tbody > tr ').click();
    cy.get('#edit_product_btn').click();
    const newProductName = generateRandomString();
    const newProductSku = generateRandomString();
    const newProductPrice = generateRandomNumber();
    enterProductData(newProductName, newProductSku, newProductPrice);
    cy.get('#add_product_submit_btn').click();
    searchForItemInTable(newProductName);
    cy.get('table >  tbody > tr ').should('have.length', 1);
    assertProductDataInTableFirstRow(
      newProductName,
      newProductSku,
      newProductPrice,
    );
  });
  afterEach(() => {
    logout();
  });
});