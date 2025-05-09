describe('Authentication Tests', function () {
    let emailValues = [];
    let passwordValues = [];
    let currentIndex = -1;

    before(() => { 
        cy.fixture('credentials').then((data) => {
            emailValues = data.emails;
            passwordValues = data.passwords;
        }); 
    });

    context('Valid Credentials', () => {

        it('Should authenticate with valid email and password', function() {
            currentIndex ++;
            const email = emailValues[currentIndex];
            const password = passwordValues[currentIndex % passwordValues.length];
            cy.log(email)
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
               
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('auth_token'); 
               
            });
        });
    });

    context('Invalid Credentials', () => {
        
        it('Should return an error with invalid credentials', function() {
            currentIndex ++;
            const email = emailValues[currentIndex];
            const password = passwordValues[currentIndex % passwordValues.length];
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
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('error_msg');
                expect(response.body.error_msg).to.equal('Invalid Credentials');
            });
        });
    });

    context('No Credentials', () => {
        it('Should return an error when no credentials are provided', function() {
            cy.request({
                method: 'POST',
                url: 'users/sign_in',
                body: {},
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400); 
                expect(response.body).to.have.property('error_msg');
                expect(response.body.error_msg).to.equal('email is missing, password is missing');
            });
        });
    });
});
