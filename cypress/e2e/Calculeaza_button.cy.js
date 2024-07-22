describe('Calculeaza button flow', () => {


  it('Transport Questions Flow with All No Responses', () => {
    cy.visit('https://amprenta.at.assistcloud.services')
    cy.get(':nth-child(1) > .button-try').should('be.visible');
    cy.get(':nth-child(1) > .button-try').click();
    cy.get('.Modal_modalOverlay_Modal__JbBmx').should('be.visible');
    cy.get('[style="display: flex; flex-direction: column;"] > :nth-child(2) > .button-try').click();
    cy.get('.modal-section_modalSection_Modal__RIZtO').should('be.visible');
    cy.get('.button-try').click();
    var index = Cypress._.random(1, 42);
    cy.get('select').select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    index = Cypress._.random(1, 42);
    cy.get('select').select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    cy.get(':nth-child(2) > .checkbox > input').check();
    cy.get(':nth-child(2) > .checkbox > input').check();
    cy.get(':nth-child(2) > .checkbox > input').check();

  });
it('Add a fixed number of cars and then select "No"', () => {
    const numberOfCarsToAdd = 5;
    cy.visit('https://amprenta.at.assistcloud.services');
    cy.get(':nth-child(1) > .button-try').should('be.visible').click();
    cy.get('.Modal_modalOverlay_Modal__JbBmx').should('be.visible');
    cy.get('[style="display: flex; flex-direction: column;"] > :nth-child(2) > .button-try').click();
    cy.get('.modal-section_modalSection_Modal__RIZtO').should('be.visible');
    cy.get('.button-try').click();
    let index = Cypress._.random(1, 30);
    cy.get('select').first().select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    index = Cypress._.random(1, 30);
    cy.get('select').select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    cy.get(':nth-child(1) > .checkbox > input').check();
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();

    const addCar = () => {

      cy.get('#total_km').type(Cypress._.random(0, 100000).toString());
      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
      index = Cypress._.random(0, 4);
      cy.get('select').last().select(index);
      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
      cy.get('#fuel_consumption').type(Cypress._.random(0, 100).toString());
      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    };
    


    for (let i = 0; i < numberOfCarsToAdd; i++) {
      addCar();
      if (i < numberOfCarsToAdd - 1) {
        cy.get(':nth-child(1) > .checkbox > input').check();
      }
    }

    cy.get(':nth-child(2) > .checkbox > input').check();
  });
  it('Add a fixed number of flights and then select "No"', () => {
    const numberOfCarsToAdd = 5;
    cy.visit('https://amprenta.at.assistcloud.services')
    cy.get(':nth-child(1) > .button-try').should('be.visible');
    cy.get(':nth-child(1) > .button-try').click();
    cy.get('.Modal_modalOverlay_Modal__JbBmx').should('be.visible');
    cy.get('[style="display: flex; flex-direction: column;"] > :nth-child(2) > .button-try').click();
    cy.get('.modal-section_modalSection_Modal__RIZtO').should('be.visible');
    cy.get('.button-try').click();
    var index = Cypress._.random(1, 30);
    cy.get('select').select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    index = Cypress._.random(1, 30);
    cy.get('select').select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    cy.get(':nth-child(2) > .checkbox > input').check();
    cy.get(':nth-child(1) > .checkbox > input').check();
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    const addFlights = () => {
      index = Cypress._.random(0, 20);
      cy.get('select').select(index);
      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
      index = Cypress._.random(0, 20);
      cy.get('select').select(index);
      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    }
    for (let i = 0; i < numberOfCarsToAdd; i++) {
      addFlights();
      if (i < numberOfCarsToAdd - 1) {
        cy.get(':nth-child(1) > .checkbox > input').check();
      }
    }

    cy.get(':nth-child(2) > .checkbox > input').check();
  });

  it('Add a fixed number of public transport and then select "No"', () => {
    const numberOfCarsToAdd = 5;
    cy.visit('https://amprenta.at.assistcloud.services')
    cy.get(':nth-child(1) > .button-try').should('be.visible');
    cy.get(':nth-child(1) > .button-try').click();
    cy.get('.Modal_modalOverlay_Modal__JbBmx').should('be.visible');
    cy.get('[style="display: flex; flex-direction: column;"] > :nth-child(2) > .button-try').click();
    cy.get('.modal-section_modalSection_Modal__RIZtO').should('be.visible');
    cy.get('.button-try').click();
    var index = Cypress._.random(1, 30);
    cy.get('select').select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    index = Cypress._.random(1, 30);
    cy.get('select').select(index);
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    cy.get(':nth-child(2) > .checkbox > input').check();
    cy.get(':nth-child(2) > .checkbox > input').check();
    cy.get(':nth-child(1) > .checkbox > input').check();
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();

    const publicT = () => {
      cy.get('#total_km').type(Cypress._.random(0, 100000))
      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
      var index = Cypress._.random(0, 1);
      if (index == 0) {
        cy.get('select').select(1);
      }
      cy.get('select').select(index);
      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    }
    for (let i = 0; i < numberOfCarsToAdd; i++) {
      publicT();
      if (i < numberOfCarsToAdd - 1) {
        cy.get(':nth-child(1) > .checkbox > input').check();
      }
    }

    cy.get(':nth-child(2) > .checkbox > input').check();
  });



  it('Household Questions Flow', () => {


    cy.visit('https://amprenta.at.assistcloud.services/gospodarie/1039')
    cy.get('.button-try').click()
    cy.get('#electricity').type(Cypress._.random(0, 10000));
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    cy.get('#natural_gas').type(Cypress._.random(0, 10000));
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    cy.get('#wood').type(Cypress._.random(0, 10000));
    cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();


  });
  it('Food sections Questions Flow', () => {
    cy.visit('https://amprenta.at.assistcloud.services/mancare/1049')
    cy.get('.button-try').click()
    for (let i = 0; i < 11; i++) {
      cy.get('.RadioButton_radioButton_Body__LgaFh')
        .find('input[type="radio"]')
        .then($radios => {
          const randomIndex = Cypress._.random(0, $radios.length - 1);
          cy.wrap($radios.get(randomIndex)).check();
        });

      cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();

    }
    cy.get('.button-try').click();
  });

  
});






