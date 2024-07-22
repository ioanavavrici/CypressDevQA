const emailSelector = ":nth-child(1) > .input-wrapper > .input-container > .input-field";
const passwordSelector = ":nth-child(2) > .input-wrapper > .input-container > .input-field";

class Login {

    navigare() {
        cy.visit('https://amprenta.at.assistcloud.services/conectare');
    }

    email(Email) {
        if (Email == '')
            cy.get(emailSelector).clear();
        else
            cy.get(emailSelector).type(Email);

        return this;
    }

    validateError() {
        cy.get('.error-wrapper > span').should('contain.text', 'Adresa de email sau parola nu este corecta');
    }

    password(Password) {
        if (Password == '')
            cy.get(passwordSelector).clear();
        else
            cy.get(passwordSelector).type(Password);

        return this;
    }

    submit() {
        cy.get('.auth-register-button-try').click();
    }

    validation() {
        cy.url().should('include', 'https://amprenta.at.assistcloud.services/*');
    }
    
    validate_url() {
        cy.url().should('include', '/conectare');
    }

    Log_In(email_value = '', password_value = '') {
        this.navigare();
        this.email(email_value);
        this.password(password_value);
        this.submit()
    }
}

export default Login