describe('Fetch Counties API', () => {
    it('should fetch the list of counties, validate the response, and save it to a file', () => {
      cy.request('GET', 'locations/counties')
        .then((response) => {

          expect(response.status).to.eq(200);
          expect(response.headers['content-type']).to.include('application/json');
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.length(43);

          if (response.body.length > 0) {

            const firstRow = response.body[0];
            expect(firstRow).to.be.an('object');
            expect(firstRow).to.have.property('id').that.is.a('number');
            expect(firstRow).to.have.property('name').that.is.a('string');
          }

          cy.writeFile('cypress/fixtures/counties.json', response.body);
       
        });
    });
  });
  