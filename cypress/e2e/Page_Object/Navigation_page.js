class Navigation {

    navigateToGeneralStatistics() {
        cy.visit('https://amprenta.at.assistcloud.services/statistici-generale')
    }

    navigateToDonations() {
        cy.visit('https://amprenta.at.assistcloud.services/donatii')
    }

    navigateToMyFootprint() {
        cy.visit('https://amprenta.at.assistcloud.services/statistici')
    }


    navigateToAboutUs() {
        cy.visit('https://amprenta.at.assistcloud.services/*')
    }

    navbar(a) {
        let buttonSelectors = [
            'svg',
            '[href="/statistici"]',
            '[href="/*"]',
            '[href="/statistici-generale"]',
            '.active',
            '.button-conect',
        ]
        if (a == 1) {
            for (let i = 0; i < buttonSelectors.length - 1; i++) {
                cy.get(buttonSelectors[i]).should('be.visible');
                cy.get(buttonSelectors[i]).click({ multiple: true })
                cy.wait(1000)
            }
        }
        else {
            for (let i = 2; i < buttonSelectors.length; i++) {
                cy.get(buttonSelectors[i]).should('be.visible');
                cy.get(buttonSelectors[i]).click({ multiple: true })
                cy.wait(1000)
            }
        }
    }
}

export default Navigation;
