describe('Authentication Tests', function () {
    let emailValues = [];
    let passwordValues = [];
    let currentIndex = 0;

    before(() => {
        cy.fixture('credentials').then((data) => {
            emailValues = data.emails;
            passwordValues = data.passwords;
            currentIndex = Cypress.env('currentIndex') || 0;
        });
    });

    it('Should handle authentication requests sequentially', () => {
        if (currentIndex >= emailValues.length) {
            currentIndex = 0;
        }

        const requests = emailValues.map((email, index) => {
            const password = passwordValues[index % passwordValues.length];
            return {
                email,
                password
            };
        });

        cy.wrap(requests).each(({ email, password }) => {
            cy.log(`Sending request for email: ${email} with password: ${password}`);
            cy.request({
                method: 'POST',
                url: 'users/sign_in',
                body: {
                    email: email,
                    password: password
                },
                headers: {
                    'Content-Type': 'application/json'
                },

            failOnStatusCode: false
            }).then((response) => {
                cy.log(`Response for email: ${email} with status code: ${response.status}`);
                if (response.status === 201) {
                    expect(response.body).to.have.property('auth_token');
                } else if (response.status === 401) {
                    expect(response.body).to.have.property('error_msg');
                    expect(response.body.error_msg).to.equal('Invalid Credentials');
                } else {
                    throw new Error('Unexpected status code: ' + response.status);
                }
            });

        }).then(() => {
            Cypress.env('currentIndex', (currentIndex + emailValues.length) % emailValues.length);
            cy.log('All requests have been handled.');
        });
    });
});
