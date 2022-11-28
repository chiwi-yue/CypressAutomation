describe('Validate links in Google home page', () => {
    beforeEach(() => {
        cy.visit('https://www.google.com/')
    });

    it("check and open URL of 'About' page ", () => {
        cy.verifyURL('.MV3Tnb:nth-of-type(1)', 'https://about.google/')
    });

    it("check and open URL of 'Store' page ", () => {
        cy.verifyURL('.MV3Tnb:nth-of-type(2)', 'store.google.com')
    });

    it("check and open URL of 'Gmail'", () => {
        cy.verifyURL('[data-pid="23"]', 'https://www.google.com/intl/en-GB/gmail/about/')
    });

    it("check and open URL of 'Feeling Lucky'", () => {
        cy.verifyURL('.FPdoLc > center > .RNmpXc', 'doodles')
    });

    it("check and open URL of 'Advertising'", () => {
        cy.verifyURL('.KxwPGc.AghGtd > a:first-child', 'ads.google.com')
    });

    it("check and open URL of 'Business'", () => {
        cy.verifyURL('.KxwPGc.AghGtd > a:nth-child(2)', 'www.google.com/services/')
    });

    it("check and open URL of 'How Search Works'", () => {
        cy.verifyURL('.KxwPGc.AghGtd > a:nth-child(3)', '/search/howsearchworks')
    });

    it("check and open URL of 'Privacy'", () => {
        cy.verifyURL('.KxwPGc.iTjxkf > a:first-child', 'https://policies.google.com/privacy')
    });

})