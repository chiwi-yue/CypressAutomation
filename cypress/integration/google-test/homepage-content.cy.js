
const leftTopMenu = [
    'About',
    'Store',
]

const rightTopMenu = [
    'Gmail',
    'Images',
]

const googleImage = {
    URL: '/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    width: '272',
    height: '92',
    alt: 'Google',
}

const centreButtons = [
    'Google Search',
    'I\'m Feeling Lucky',
]

const leftFooterItems = [
    'Advertising',
    'Business',
    'How Search works',
]

const rightFooterItems = [
    'Privacy',
    'Terms',
    'Settings',
]

describe('Contents in Google homepage', () => {
    beforeEach(() => {
        cy.visit('https://www.google.com/')
    });
    it('Header should have various tabs', () => {
        // Left Top Menu: 'About', 'Store'
        cy.get('a.MV3Tnb').should('be.visible').and('have.length', 2).each(($el, index) => {
            const string = $el[0].innerText;
            expect(string).to.have.string(leftTopMenu[index])   
        })
       // Right Top Menu: 'Gmail', 'Images'
        cy.get('.gb_d').should('be.visible').and('have.length', 2).each(($el, index) => {
            const string = $el[0].innerText;
            expect(string).to.have.string(rightTopMenu[index])   
        })
        // Google apps thumbnail
        cy.get('.gb_A').should('be.visible')
        // Sign-in button
        cy.get('.gb_2').should('be.visible').and('have.text', 'Sign in')
    })

    it('Should display Google Image with correct attributes', () => {
        cy.get('.lnXdpd').as('getGoogleImage')
        .should('be.visible')
        .invoke('attr', 'src')
        .should('eq', googleImage.URL)

        cy.get('@getGoogleImage')
        .invoke('attr', 'alt')
        .should('eq', googleImage.alt)

        cy.get('@getGoogleImage')
        .invoke('attr', 'width')
        .should('eq', googleImage.width)

        cy.get('@getGoogleImage')
        .invoke('attr', 'height')
        .should('eq', googleImage.height)
    });

    it('Should display search bar', () => {
        cy.get('.RNNXgb').should('exist').as('getSearchField')

        cy.get('.SDkEP')
        .children()
        .should('have.length', 3)
        .as('getSearchBar')

        cy.get('.QCzoEc > svg')
        .should('be.visible')
        .as('getSearchIcon')

        cy.get('.gLFyf')
        .should('be.empty')
        .as('getSearchInputField')

        cy.get('.goxjub')
        .should('be.visible')
        .as('getSearchByVoice')

        cy.get('.Gdd5U')
        .should('be.visible')
        .as('getSearchByImage')
    });

    const getIframeDocument = ()=> {
        return cy
        .get('iframe')
        .its('0.contentDocument')
        .should('exist')
    }

    const getIframeBody = () => {
        // get the document
        return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
      }
    it('method#1: Should display the Sign in pop-up correctly and dismiss it', () => {
        getIframeBody().find('.yZqNl').should('have.text', 'Sign in')
        getIframeBody().find('.rr4y5c').should('have.text', 'No thanks').click()
    });
    
    it('method#2: iframe plugin', () => {
        cy.frameLoaded('iframe')
        cy.iframe('iframe').find('.yZqNl').should('have.text', 'Sign in')
        cy.iframe('iframe').find('.rr4y5c').should('have.text', 'No thanks').click()
    });

    it('Should display centre elements', () => {
        cy.get('.FPdoLc > center > input')
        .as('getCentreElements')
        .should('be.visible')
        .and('have.length', 2)
        .each(($el, index) => {
            const buttonName = $el[0].ariaLabel
            expect(buttonName).to.have.string(centreButtons[index])
        })
    });

    it('Should display centre promotion', () => {
        cy.get('body').then((body) => {
            if(body.find('.szppmdbYutt__middle-slot-promo').length > 0) {
                cy.get('.szppmdbYutt__middle-slot-promo').should('be.visible')
                cy.get('.szppmdbYutt__middle-slot-promo > img').should('be.visible')
            }
            else {
                cy.log('No Promption today')
            }
        })

    });

    it('Should disoplay correct user region', () => {
        cy.get('.uU7dJb').should('be.visible').and('have.text', 'Australia')
    });

    it('Should display the left footer content', () => {
        cy.verifyItem('div.KxwPGc.AghGtd', leftFooterItems, 3)
    });

    it('Should display the right footer content', () => {
        cy.verifyItem('.KxwPGc.iTjxkf', rightFooterItems, 3)
    });
})