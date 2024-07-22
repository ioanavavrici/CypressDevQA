class Donatii {

    navigate() {
        cy.visit('https://amprenta.at.assistcloud.services/donatii')
    }

    elementVisible(selectorPrefix, selectorSuffix) {
        for (let i = 1; i <= 5; i++) {
            cy.get(`${selectorPrefix}${i}${selectorSuffix}`).should('be.visible')
        }
    }

    checkVisibility() {
        this.elementVisible(':nth-child(', ') > .donation-card_donationCard_Paragraph__NCt8k')
        this.elementVisible(':nth-child(', ') > [style="width: 100%; display: flex;"] > .button-try')
        this.elementVisible(':nth-child(', ') > .donation-card_donationCard_Image__kknvJ > img')
    }

    functionalityButtons(i) {
        cy.get(`:nth-child(${i}) > [style="width: 100%; display: flex;"] > .button-try`).click()
        cy.url().should('not.include', 'amprenta.at.assistcloud.services')
    }

    navbar(a) {
        let buttonSelectors = [
            '[href="/statistici"]',
            'svg',
            '[href="/*"]',
            '[href="/statistici-generale"]',
            '.active',
            '.button-conect',
        ]
        if (a == 1) {
            for (let i = 0; i < buttonSelectors.length - 1; i++) {
                cy.get(buttonSelectors[i]).should('be.visible');
            }
        }
        else {
            for (let i = 2; i < buttonSelectors.length; i++) {
                cy.get(buttonSelectors[i]).should('be.visible');
            }
        }
    }
}

export default Donatii
