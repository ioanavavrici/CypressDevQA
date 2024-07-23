describe('Airports API Tests', () => {
  it('Fetches and verifies airports data', () => {
    
    const requestUrl = `${Cypress.config('baseUrl')}/flights/airports`;
    cy.request(requestUrl).then((response) => {

      const jsonData = response.body;
      cy.wrap(jsonData).as('airports');
      cy.log('Airports data saved to environment:', jsonData);
      cy.log('Status code is 200');
      expect(response.status).to.eq(200);
      cy.log('Response is in JSON format');
      expect(response.headers['content-type']).to.include('application/json');
      cy.log('Response contains an array of airports');
      expect(jsonData).to.be.an('array');
      cy.log('Airports array is not empty');
      expect(jsonData.length).to.be.above(0);

      if (jsonData.length > 0) {
        expect(jsonData[0]).to.have.property('id');
        expect(jsonData[0]).to.have.property('name');
      }

      cy.log('Check number of airports');
      cy.readFile('cypress/fixtures/credentials.json').then((data) => {
      const expectedLength = parseInt(data.nav_length);
      expect(jsonData.length).to.eq(expectedLength);
      cy.writeFile('cypress/fixtures/airports.json', response.body);
    });
    });
  });
});
