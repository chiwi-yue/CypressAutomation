// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

Cypress.Commands.add("getBySel", (selector) => {
    return cy.get(`[data-test=${selector}]`)
})

Cypress.Commands.add(
    'login', (username, password, { rememberUser = false } ={} ) => {
        const signinPath = "/signin";
        const log = Cypress.log({
            name: "login",
            displayName: "LOGIN",
            message: [`Authentication | ${username}`],
            autoEnd: false,
        });

        cy.intercept('POST', '/loging').as('loginUser');
        cy.intercept('GET', 'checkAuth').as('getUserProfile');

        cy.location("pathname", { log: false}).then((currentPath) => {
            if (currentPath !== signinPath) {
                cy.visit(signinPath)
            }
        });

        cy.getBySel('signin-username').type(username);
        cy.getBySel('signin-password').type(password);

        if(rememberUser) {
            cy.getBySel('signin-remember-me').find('input').check();
        }

        cy.getBySel('signin-submit').click();

    }
)