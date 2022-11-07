// Test on localhost app Kitchen Sink	Vanilla (JS)

describe("home page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  
  context('Hero Section', () => {
    it('the h1 contains the correct text', () => {
      cy.getByData('hero-heading').contains(
        'Testing Next.js Applications with Cypress'
      )
      cy.get("[class='lg:py-24']").contains(
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
      )
    })
    it('the features on the homepage are correct', () => {
      cy.get('dt').eq(0).contains('4 Courses')
      cy.get('dt').eq(1).contains('25+ Lessons')
      cy.get('dt').eq(2).contains('Free and Open Source')
    })
  });

  context('Course Section', () => {
      it.only('Testing Your First Next.js Application', () => {
          cy.getByData('course-0').find('a').eq(3).click()
          cy.location('pathname').should('eq', '/testing-your-first-application')
      });

      it.only('Testing Foundations', () => {
        cy.getByData('course-1').find('a').eq(3).click()
        cy.location('pathname').should('eq', '/testing-foundations')
    });

      it.only('Cypress Fundamentals', () => {
        cy.getByData('course-2').find('a').eq(3).click()
        cy.location('pathname').should('eq', '/cypress-fundamentals')
    });

  });
   
})


