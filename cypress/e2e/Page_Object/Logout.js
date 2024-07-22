class Logout {

    logout() {
        cy.get('.auth-user>svg').click()
        cy.wait(1000)
    }
    
    validation()
    {
        cy.url().should('contain', '/conectare')
    }

}

export default Logout