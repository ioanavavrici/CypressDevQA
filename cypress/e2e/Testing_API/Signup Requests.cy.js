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

function generateBaseScenario() {
    return {
        email: getRandomEmail(),
        first_name: getRandomString(5),
        last_name: getRandomString(5),
        password: getRandomString(10),
    };
}

function generateScenario(overrides = {}) {
    const baseScenario = generateBaseScenario();
    return { ...baseScenario, ...overrides };
}

describe('Authentication API Tests', () => {

    function runScenario(scenario) {
        const requestBody = {
            email: scenario.email,
            first_name: scenario.first_name,
            last_name: scenario.last_name,
            password: scenario.password,
        };

        cy.request({
            method: 'POST',
            url: 'users/sign_up',
            body: requestBody,
            failOnStatusCode: false,
        }).then((response) => {
            const jsonData = response.body;

            switch (true) {
                case !scenario.email && !scenario.password:
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('error');
                    break;
                case !scenario.email:
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('error');
                    break;
                case !scenario.password:
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('error');
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
                case scenario.last_name === '':
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('error');
                    break;
                case scenario.first_name === '':
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('error');
                    break;
                default:
                    expect(response.status).to.eq(201);
                    expect(response.body).to.have.property('auth_token');
            }
        });
    }
    
    it('Scenario 1: Valid credentials', function () {
        const scenario = generateScenario();
        runScenario(scenario);
    });

    it('Scenario 2: Blank first name', function () {
        const scenario = generateScenario({ first_name: '' });
        runScenario(scenario);
    });

    it('Scenario 3: Blank last name', function () {
        const scenario = generateScenario({ last_name: '' });
        runScenario(scenario);
    });

    it('Scenario 4: Blank email', function () {
        const scenario = generateScenario({ email: '' });
        runScenario(scenario);
    });

    it('Scenario 5: Blank password', function () {
        const scenario = generateScenario({ password: '' });
        runScenario(scenario);
    });

    it('Scenario 6: All fields blank', function () {
        const scenario = generateScenario({
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        });
        runScenario(scenario);
    });

    it('Scenario 7: Invalid email', function () {
        const scenario = generateScenario({ email: 'invalid-email' });
        runScenario(scenario);
    });

    it('Scenario 8: Short password', function () {
        const scenario = generateScenario({ password: 'short' });
        runScenario(scenario);
    });
});
