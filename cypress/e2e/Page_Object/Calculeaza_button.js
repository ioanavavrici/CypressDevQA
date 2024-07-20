class Calculeaza {
    constructor() {
        this.downArrowSelector = '.transport-question_transportQuestion_DownArrow__EF\\+9C';
    }

    navigate() {
        cy.visit('https://amprenta.at.assistcloud.services');
    }
    
  
    navigate2() {
    cy.visit('https://amprenta.at.assistcloud.services/gospodarie/1039')
    }
    
    navigate3(){
        cy.visit('https://amprenta.at.assistcloud.services/mancare/1049')
    }
    click()
    {
        cy.get('.transport-question_transportQuestion_DownArrow__EF\\+9C').click();
    }

    clickAndValidate(selector) {
        cy.get(selector).should('be.visible').click();
    }

    selectRandomOption(selector, range) {
        const index = Cypress._.random(0, range);
        if (index == 0) {
            cy.get(selector).select(1);
          }
          cy.get(selector).select(index);
      
    }

    first_clicks_and_validation() {
        this.clickAndValidate(':nth-child(1) > .button-try');
        cy.get('.Modal_modalOverlay_Modal__JbBmx').should('be.visible');
        this.clickAndValidate('[style="display: flex; flex-direction: column;"] > :nth-child(2) > .button-try');
        cy.get('.modal-section_modalSection_Modal__RIZtO').should('be.visible');
        this.clickAndValidate('.button-try');
    }

    selectLocation() {
        this.selectRandomOption('select', 10);
        this.click()
        this.selectRandomOption('select', 6);
         this.click()
    }
    checkYES()
    {
        cy.get(':nth-child(1) > .checkbox > input').check();
        this.click()
    }
    checkNO()
    {
        cy.get(':nth-child(2) > .checkbox > input').check();
        
    }
    checkOption(selector) {
        cy.get(selector).check();
    }

    addCar() {
        cy.get('#total_km').type(Cypress._.random(0, 100000).toString());
        this.click()
        this.selectRandomOption('select', 4);
        this.click()
        cy.get('#fuel_consumption').type(Cypress._.random(0, 100));
        this.click()
    }

    AddCars(numberOfCarsToAdd) {
        for (let i =0; i < numberOfCarsToAdd; i++) {
            this.addCar();
            if (i < numberOfCarsToAdd-1 ) 
                this.checkOption(':nth-child(1) > .checkbox > input');
           
        }  this.checkNO();
    }


    AddFlights(numberOfFlightsToAdd) {
        for (let i = 0; i < numberOfFlightsToAdd; i++) {
            this.selectLocation();
            if (i < numberOfFlightsToAdd - 1) {
                this.checkOption(':nth-child(1) > .checkbox > input');
            }
        }
    }

    publicT() {
        cy.get('#total_km').type(Cypress._.random(0, 100000).toString());
        this.click();
        this.selectRandomOption('select', 1);
       this.click()
    }

    PublicTransport(numberOfPublicTransportsToAdd) {
        for (let i = 0; i < numberOfPublicTransportsToAdd; i++) {
            this.publicT();
            if (i < numberOfPublicTransportsToAdd - 1) {
                this.checkOption(':nth-child(1) > .checkbox > input');
            }
        }this.checkOption(':nth-child(2) > .checkbox > input');
    }

    HouseQuastion() {
        cy.get('#electricity').type(Cypress._.random(0, 10000).toString());
        this.click()
        cy.get('#natural_gas').type(Cypress._.random(0, 10000).toString());
        this.click()
        cy.get('#wood').type(Cypress._.random(0, 10000).toString());
       this.click()
    }

    FoodSection() {
        for (let i = 0; i < 11; i++) {
            cy.get('.RadioButton_radioButton_Body__LgaFh')
                .find('input[type="radio"]')
                .then($radios => {
                    const randomIndex = Cypress._.random(0, $radios.length - 1);
                    cy.wrap($radios.get(randomIndex)).check();
                });

            this.clickAndValidate(this.downArrowSelector);
        }
    }
}

export default Calculeaza;
