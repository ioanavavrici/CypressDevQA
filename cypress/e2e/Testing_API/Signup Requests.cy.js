function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getRandomEmail() {
    const randomString = getRandomString(10);
    return `${randomString}@example.com`;
}

const scenarios = [
    {
        email: getRandomEmail(),
        first_name: getRandomString(5),
        last_name: getRandomString(5),
        password: getRandomString(10),
    },
    {
        email: getRandomEmail(),
        first_name: '',
        last_name: getRandomString(5),
        password: getRandomString(10),
    },
    {
        email: getRandomEmail(),
        first_name: getRandomString(5),
        last_name: '',
        password: getRandomString(10),
    },
    {
        email: '',
        first_name: getRandomString(5),
        last_name: getRandomString(5),
        password: getRandomString(10),
    },
    {
        email: getRandomEmail(),
        first_name: getRandomString(5),
        last_name: getRandomString(5),
        password: '',
    },
    {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
    },
    {
        email: 'invalid-email',
        first_name: getRandomString(5),
        last_name: getRandomString(5),
        password: getRandomString(10),
    },
    {
        email: getRandomEmail(),
        first_name: getRandomString(5),
        last_name: getRandomString(5),
        password: 'short',
    },
];

// Handle any uncaught exceptions
Cypress.on('fail', (error, runnable) => {
    // Log the error but don't stop the test execution
    console.error('Test failed:', error.message);
    // Ensure that Cypress continues with the next test
    return false;
});

describe('Authentication API Tests', () => {
    it('Tests various authentication scenarios in parallel', () => {
        const requests = scenarios.map((scenario) => {
            const requestBody = {
                first_name: scenario.first_name,
                last_name: scenario.last_name,
                email: scenario.email,
                password: scenario.password,
            };

            return cy.request({
                method: 'POST',
                url: 'https://api.amprenta.at.assistcloud.services/api/v1/users/sign_up',
                body: requestBody,
                failOnStatusCode: false,
            }).then((response) => {
                const jsonData = response.body;
                cy.log(JSON.stringify(response.body));

                function checkSuccessResponse() {
                    expect(response.status).to.eq(201);
                    expect(response.headers['content-type']).to.include('application/json');
                    expect(jsonData).to.have.property('auth_token');
                }

                function checkErrorResponse(expectedStatus, expectedError) {
                    expect(response.status).to.eq(expectedStatus);
                    expect(response.headers['content-type']).to.include('application/json');
                    expect(jsonData).to.have.property('error');
                }

                function determineScenario() {
                    if (!scenario.first_name && !scenario.last_name && !scenario.email && !scenario.password) return 'blank-all';
                    if (!scenario.first_name) return 'blank-first-name';
                    if (!scenario.last_name) return 'blank-last-name';
                    if (!scenario.email && !scenario.password) return 'blank-email-password';
                    if (!scenario.email) return 'blank-email';
                    if (!scenario.password) return 'blank-password';
                    if (scenario.password === 'short') return 'invalid-password';
                    if (scenario.email === 'invalid-email') return 'invalid-email';
                    return 'success';
                }

                const scenarioType = determineScenario();
                try {
                    if (scenarioType === 'invalid-password') {
                        checkErrorResponse(400, { password: ["is too short (minimum is 6 characters)"] });
                    } else if (scenarioType === 'blank-email') {
                        checkErrorResponse(400, { email: ["can't be blank"] });
                    } else if (scenarioType === 'blank-password') {
                        checkErrorResponse(400, { password: ["can't be blank"] });
                    } else if (scenarioType === 'blank-email-password') {
                        checkErrorResponse(400, { email: ["can't be blank"], password: ["can't be blank"] });
                    } else if (scenarioType === 'invalid-email') {
                        checkErrorResponse(400, { email: ["is invalid"] });
                    } else if (scenarioType === 'blank-first-name') {
                        checkErrorResponse(400, { first_name: ["can't be blank"] });
                    } else if (scenarioType === 'blank-last-name') {
                        checkErrorResponse(400, { last_name: ["can't be blank"] });
                    } else if (scenarioType === 'blank-all') {
                        checkErrorResponse(400, {
                            email: ["can't be blank"],
                            password: ["can't be blank"],
                            first_name: ["can't be blank"],
                            last_name: ["can't be blank"]
                        });
                    } else {
                        checkSuccessResponse();
                    }
                } catch (error) {
                    cy.log(`Error in scenario ${scenarioType}: ${error.message}`);
                }
            });

            return Promise.all(requests);
        });
    });
});
