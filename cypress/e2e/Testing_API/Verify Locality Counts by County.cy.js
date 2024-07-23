describe('Validate County Data API', () => {
    it('should validate data for each county', () => {
        cy.readFile('cypress/fixtures/counties.json').then((counties) => {
            expect(counties).to.be.an('array').that.is.not.empty;
            counties.forEach((county) => {
                cy.request(`GET`, `locations?county=${county.name}`)
                    .then((response) => {
                        var length = response.body.length;
                        cy.log(response.body);
                        expect(length).to.be.eq(response.body.length);
                        expect(response.headers['content-type']).to.include('application/json');
                        expect(response.body).to.be.an('array');
                        if (response.body.length > 0) {
                            expect(response.status).to.eq(200);
                            expect(response.body).to.have.length.greaterThan(0);
                            const firstRow = response.body[0];
                            expect(firstRow).to.be.an('object');
                            expect(firstRow).to.have.property('id').that.is.a('number');
                            expect(firstRow).to.have.property('name').that.is.a('string');
                        }
                    });
            });
        });

    });
});
