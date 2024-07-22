// test.spec.js
describe('Check the Registration Functionality', () => {

    const first_nameSelector = ':nth-child(1) > .input-wrapper > .input-container > .input-field';
    const last_nameSelector = ':nth-child(2) > .input-wrapper > .input-container > .input-field';
    const emailSelector = ':nth-child(3) > .input-wrapper > .input-container > .input-field';
    const passwordSelector = ':nth-child(4) > .input-wrapper > .input-container > .input-field';

    beforeEach(() => {
        cy.visit('https://amprenta.at.assistcloud.services/inregistrare');
    });

    function RandomName() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Cypress._.random(0, alphabet.length - 1);
            result += alphabet.charAt(randomIndex);
        }
        return result;
    }

    it('Registration with Valid Information', () => {
        cy.get(first_nameSelector).type(RandomName(5));
        cy.get(last_nameSelector).type(RandomName(5));
        cy.get(emailSelector).type('test' + Cypress._.random(1, 1000000) + '@gmail.com')
        cy.get(passwordSelector).type('TestPassword' + Cypress._.random(1, 1000000))
        cy.get('.auth-register-button-try').click();
        cy.url().should('include', '/conectare');
    });

    it('Registration with an existing email', () => {
        cy.get(first_nameSelector).type(RandomName(5));
        cy.get(last_nameSelector).type(RandomName(5));
        cy.fixture('User_data').then((userData) => {
            cy.get(emailSelector).type(userData.email)
            cy.get(passwordSelector).type('TestPassword' + Cypress._.random(1, 1000000))
            cy.get('.auth-register-button-try').click();
            cy.url().should('include', '/inregistrare');
        });
        cy.get('.error-wrapper > span').should('contain.text', 'Adresa de email a fost deja folosita')
    });

    it('Registration with Invalid Email', () => {

        cy.get(first_nameSelector).type(RandomName(5));
        cy.get(last_nameSelector).type(RandomName(5));
        cy.get(emailSelector).type('test' + Cypress._.random(1, 1000000) + 'gmail.com')
        cy.get(passwordSelector).type('TestPassword' + Cypress._.random(1, 1000000))
        cy.get('.auth-register-button-try').click();
        cy.url().should('include', '/inregistrare');
        cy.get('.errorMessage').should('contain.text', 'Introdu o adresa de email corecta. E.g. example@email.com.')
    });

    it('Registration with Empty Fields', () => {
        cy.get(first_nameSelector).clear();
        cy.get(last_nameSelector).clear();
        cy.get(emailSelector).clear();
        cy.get(passwordSelector).clear();
        cy.get('.auth-register-button-try').click();
        cy.url().should('include', '/inregistrare');
    });
});
