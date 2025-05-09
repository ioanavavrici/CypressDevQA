describe('POST Transportations API', () => {
    let counties = [];
    let airports = [];

    before(() => {
        cy.readFile('cypress/fixtures/airports.json').then((data) => {
            airports = data;
        });
        cy.readFile('cypress/fixtures/counties.json').then((data) => {
            counties = data;
        });
    });

    it('should send a POST request and validate the request body is received', function () {
        expect(airports).to.be.an('array').that.is.not.empty;
        expect(counties).to.be.an('array').that.is.not.empty;
        const randomCounty = counties[Math.floor(Math.random() * counties.length)].name;

        cy.request(`locations?county=${randomCounty}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array').that.is.not.empty;
                const randomLocation = response.body[Math.floor(Math.random() * response.body.length)].name;
                cy.log(randomLocation)
                const randomFuelType = Math.floor(Math.random() * 7);
                const randomFloat = () => (Math.random() * 100).toFixed(2);
                const randomTransportType = Math.floor(Math.random() * 2);
                const randomFromAirport = airports[Math.floor(Math.random() * airports.length)].name;
                const randomToAirport = airports[Math.floor(Math.random() * airports.length)].name;
                const requestBody = {
                    location: randomLocation,
                    cars: [
                        {
                            fuel_type: randomFuelType,
                            fuel_consumption: parseFloat(randomFloat()),
                            total_km: parseInt(randomFloat()),
                            location: randomLocation
                        }
                    ],
                    flights: [
                        //   {
                        //     from: randomFromAirport,
                        //     to: randomToAirport
                        //   }
                    ],
                    public_transports: [
                        {
                            transport_type: randomTransportType,
                            total_km: parseInt(randomFloat())
                        }
                    ]
                };

                cy.log(JSON.stringify(requestBody))
                cy.request({
                    method: 'POST',
                    url: 'transportations',
                    body: requestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false
                }).then((response) => {

                    expect(response.status).to.eq(201);
                    cy.log(JSON.stringify(response.body))
                });
            });
    });
});
