/// <reference types="cypress" />

describe('Test example', () => {
  beforeEach(() => {
        //Navigate to main mage
        cy.visit('https://iwanttohelp.bim.assistcloud.services/')
  })
        //Test if the main page is loaded
  it('Navigate to Despe noi page', () => {
        //Click on the link to Despre noi page
    cy.get('a[href*="/about"]').click()
        //Check if the url is correct
    cy.url().should('contains','/about')
        //Check if the title is correct
    cy.get('.mb-5 h3.card-title').should('have.text', 'Despre noi')
  })

})
