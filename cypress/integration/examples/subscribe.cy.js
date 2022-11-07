describe('Newsletter Subscribe Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('allows users to subscribe to the email list', () => {
        cy.getByData('email-input').type("stanmma@gmail.com")
        cy.getByData('submit-button').click()
        cy.getByData('success-message').should('exist').contains("stanmma@gmail.com")
    });

    it('it does NOT allow invalid email address', () => {
        cy.getByData('email-input').type("@gmail.com")
        cy.getByData('submit-button').click()
        cy.getByData('success-message').should('not.exist')
    });

    it.only('users cannot sign up for our newsletter if they are already subscribed', () => {
        cy.getByData('email-input').type("john@example.com")
        cy.getByData('submit-button').click()
        cy.getByData('success-message').should('not.exist')
        cy.getByData('server-error-message')
          .should('exist')
          .contains("Error: john@example.com already exists. Please use a different email address.")
    });
});