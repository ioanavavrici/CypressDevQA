const firstNameSelector = ':nth-child(1) > .input-wrapper > .input-container > .input-field';
const lastNameSelector = ':nth-child(2) > .input-wrapper > .input-container > .input-field';
const emailSelector = ':nth-child(3) > .input-wrapper > .input-container > .input-field';
const passwordSelector = ':nth-child(4) > .input-wrapper > .input-container > .input-field';

class Registration {

    navigate() {
        cy.visit('https://amprenta.at.assistcloud.services/inregistrare');
    }

    generateRandomName() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Cypress._.random(0, alphabet.length - 1);
            result += alphabet.charAt(randomIndex);
        }
        return result;
    }

    enterFirstName() {
        cy.get(firstNameSelector).type(this.generateRandomName());
    }

    enterLastName() {
        cy.get(lastNameSelector).type(this.generateRandomName());
    }

    enterEmail(email = '') {
        if (email == '') {
            cy.get(emailSelector).clear();
        } else if (email == 1) {
            cy.get(emailSelector).type('test' + Cypress._.random(1, 1000000) + '@gmail.com');
        } else if (email == 2) {
            cy.get(emailSelector).type('ion.ilie@gmail.com');
        } else {
            cy.get(emailSelector).type('test' + Cypress._.random(1, 1000000) + 'gmail.com');
        }
    }

    enterPassword(password = '') {
        if (password == '') {
            cy.get(passwordSelector).clear();
        } else {
            cy.get(passwordSelector).type('TestPassword' + Cypress._.random(1, 1000000));
        }
    }

    submitRegistration() {
        cy.get('.auth-register-button-try').click();
    }

    verifyRegistrationUrl() {
        cy.url().should('include', '/inregistrare');
    }

    verifyLoginUrl() {
        cy.url().should('include', '/conectare');
    }

    checkEmailAlreadyUsedError() {
        cy.get('.error-wrapper > span').should('contain.text', 'Adresa de email a fost deja folosita');
    }

    checkInvalidEmailError() {
        cy.get('.errorMessage').should('contain.text', 'Introdu o adresa de email corecta. E.g. example@email.com.');
    }

    registerUser(email = '', password = '') {
        this.navigate();
        this.enterFirstName();
        this.enterLastName();
        this.enterEmail(email);
        this.enterPassword(password);
        this.submitRegistration();
    }
}

export default Registration;
