describe('Airports API Tests', () => {
  it('Fetches and verifies airports data', () => {
    
    const requestUrl = `${Cypress.config('baseUrl')}/flights/airports`;
    cy.request(requestUrl).then((response) => {

      const jsonData = response.body;
      cy.wrap(jsonData).as('airports');
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(jsonData).to.be.an('array');
      expect(jsonData.length).to.be.above(0);
      if (jsonData.length > 0) {
        expect(jsonData[0]).to.have.property('id');
        expect(jsonData[0]).to.have.property('name');
      }
      cy.readFile('cypress/fixtures/credentials.json').then((data) => {
      const expectedLength = parseInt(data.nav_length);
      expect(jsonData.length).to.eq(expectedLength);
      cy.writeFile('cypress/fixtures/airports.json', response.body);
    });
    });
  });
});
