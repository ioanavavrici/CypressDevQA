
describe('Check the Login Functionality', () => {

  const emailSelector = ":nth-child(1) > .input-wrapper > .input-container > .input-field";
  const passwordSelector = ":nth-child(2) > .input-wrapper > .input-container > .input-field";

  beforeEach(() => {
    cy.visit('https://amprenta.at.assistcloud.services/conectare');
  });

  it('Login with Valid Information', () => {
    cy.fixture('User_data').then((userData) => {
      cy.get(emailSelector).type(userData.email);
      cy.get(passwordSelector).type(userData.password);
      cy.get('.auth-register-button-try').click();
      cy.url().should('include', 'https://amprenta.at.assistcloud.services/*');
    });
  });

  it('Login with Invalid Credentials', () => {
    cy.fixture('User_data').then((userData) => {
      cy.get(emailSelector).type(userData.invalid_email);
      cy.get(passwordSelector).type(userData.invalid_password);
      cy.get('.auth-register-button-try').click();
      cy.url().should('include', '/conectare');
      cy.get('.error-wrapper > span').should('contain.text', 'Adresa de email sau parola nu este corecta');
    });
  });

  it('Login with Empty Fields', () => {
    cy.get(emailSelector).clear();
    cy.get(passwordSelector).clear();
    cy.get('.auth-register-button-try').click();
    cy.url().should('include', '/conectare');
    cy.get('.error-wrapper > span').should('contain.text', 'Adresa de email sau parola nu este corecta');
  });

  it('Login with Empty Password', () => {
    cy.fixture('User_data').then((userData) => {
      cy.get(emailSelector).type(userData.email);
      cy.get(passwordSelector).clear();
      cy.get('.auth-register-button-try').click();
      cy.url().should('include', '/conectare');
      cy.get('.error-wrapper > span').should('contain.text', 'Adresa de email sau parola nu este corecta');
    });
  });
});
