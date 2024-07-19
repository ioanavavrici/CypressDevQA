var passwordBox=':nth-child(4) > .input-wrapper > .input-container > .input-field'

describe('Password', () => {
  it('Show and Hide Password', function() {

    cy.visit('https://amprenta.at.assistcloud.services/inregistrare');
    cy.get(passwordBox).as('passwordField').type('parola123');
    cy.get('.left-icon > svg').click();
    cy.get('@passwordField').should('have.attr', 'type', 'text');
    cy.wait(2000);
    cy.get('@passwordField').should('have.attr', 'type', 'password');
  });
});
