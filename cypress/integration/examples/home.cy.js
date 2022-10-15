// Test on localhost app Kitchen Sink	Vanilla (JS)

describe("home page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  
  
  it.only('the h1 contains the correct text', () => {
    cy.get("[data-test='hero-heading']").contains(
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
  
  
})


