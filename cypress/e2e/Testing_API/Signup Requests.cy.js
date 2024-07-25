describe('Authentication API Tests', () => {
    let scenarios = [];

    before(() => {
        // Load scenarios from the fixture file
        cy.fixture('authentication_scenarios').then((data) => {
            scenarios = data;
            cy.log('Loaded scenarios:', scenarios); // Verify data
        });
    });

    scenarios.forEach((scenario, index) => {
        it(`Scenario ${index + 1}: ${scenario.description || 'No description'}`, function() {
            const requestBody = {
                email: scenario.email,
                first_name: scenario.first_name,
                last_name: scenario.last_name,
                password: scenario.password,
            };

            cy.request({
                method: 'POST',
                url: 'https://api.amprenta.at.assistcloud.services/api/v1/users/sign_up',
                body: requestBody,
                failOnStatusCode: false,
            }).then((response) => {
                cy.log(`Response for scenario ${index + 1}:`, response.body);

                // Define your response assertions here
                switch (true) {
                    case scenario.email === '' && scenario.password === '':
                        expect(response.status).to.eq(400);
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.deep.equal({
                            email: ["can't be blank"],
                            password: ["can't be blank"]
                        });
                        break;
                    case scenario.email === '':
                        expect(response.status).to.eq(400);
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.deep.equal({
                            email: ["can't be blank"]
                        });
                        break;
                    case scenario.password === '':
                        expect(response.status).to.eq(400);
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.deep.equal({
                            password: ["can't be blank"]
                        });
                        break;
                    case scenario.email === 'invalid-email':
                        expect(response.status).to.eq(400);
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.deep.equal({
                            email: ["is invalid"]
                        });
                        break;
                    case scenario.password === 'short':
                        expect(response.status).to.eq(400);
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.deep.equal({
                            password: ["is too short (minimum is 6 characters)"]
                        });
                        break;
                    default:
                        expect(response.status).to.eq(201);
                        expect(response.body).to.have.property('auth_token');
                }
            });
        });
    });
});
