
describe('Google Search Bar', () => {
    beforeEach(() => {
        cy.visit('https://www.google.com/')
    });

    it('Click search bar input filed to display dropdown trending results', () => {
        cy.clickSearchBar()
        cy.get('.aajZCb')
        .should('be.visible').within(() => {
            cy.get('.ynRric').should('contain', 'Trending searches')
            cy.get("li[data-view-type='1']").should('be.visible')
            cy.get('div.lJ9FBc > center').should('be.visible').within(() => {
                cy.get('.gNO89b').should('have.value', 'Google Search')
                cy.get('.RNmpXc').should('have.value', 'I\'m Feeling Lucky')
            })
        })
        cy.get('.oBa0Fe.aciXEb').should('have.text', 'Report inappropriate predictions')
    });

    it.only('Click on random item from the promp dropdown to open the result page', () => {
        cy.clickSearchBar()

        cy
        .get("li[data-view-type='1']")
        .should('be.visible')

        cy
        .getRandomItem().then(($item) => {
            const str1 = $item.text()
            cy.log(`str1: ${str1}`)
            $item.click()
            cy.wait(1000)
            cy
            .get('input.gLFyf')
            .should('be.visible')
            .invoke('attr', 'value')
            .then((str2) => {
                cy.log(`str2: ${str2}`)
                expect(str2).to.eq(str1)
            })
        })               
    })

})