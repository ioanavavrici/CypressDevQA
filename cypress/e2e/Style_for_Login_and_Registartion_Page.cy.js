describe('Form Style Tests', () => {

    context('Login Form Style Tests', () => {
        
        beforeEach(() => {
            cy.visit('https://amprenta.at.assistcloud.services/conectare');
        });

        it('checks the color of the submit button', () => {
            cy.get('.auth-register-button-try')
                .should('have.css', 'background-color')
                .should('eq', 'rgb(252, 211, 81)');
        });

        it('checks the border radius of the submit button', () => {
            cy.get('.auth-register-button-try')
                .should('have.css', 'border-radius')
                .should('eq', '8px');
        });

        it('checks the font size of the submit button', () => {
            cy.get('.auth-register-button-try')
                .should('have.css', 'font-size')
                .should('eq', '16px');
        });
    });

    context('Register Form Style Tests', () => {
        beforeEach(() => {
            cy.visit('https://amprenta.at.assistcloud.services/inregistrare');
        });

        it('checks the color of the register button', () => {
            cy.get('.auth-register-button-try')
                .should('have.css', 'background-color')
                .should('eq', 'rgb(252, 211, 81)');
        });

        it('checks the padding of the register button', () => {
            cy.get('.auth-register-button-try')
                .should('have.css', 'padding')
                .should('eq', '10px');
        });

        it('checks the font size of the register button', () => {
            cy.get('.auth-register-button-try')
                .should('have.css', 'font-size')
                .should('eq', '16px');
        });
    });
});
