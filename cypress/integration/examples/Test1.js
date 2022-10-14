/// <reference types="Cypress" />

describe('My First Test', () => {
    it('visit the Kitchen Sink', () => {
      cy.visit('https://example.cypress.io')

      cy.contains('type').click()

      // Should be on a new URL which
      // includes '/commands/actions'
      cy.url().should('include', '/commands/actions')

      // Get an input, type into it and verify
      // that value has been udpated
      cy.get('.action-email')
        .type('fake@gmail.com')
        .should('have.value', 'fake@gmail.com')
    })
  })
