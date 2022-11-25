const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: 'cypress/integration/**/*.cy.{js,ts}',
    // baseUrl: "http://localhost:3000",

  },
  evn: {
    // apiUrl: "http://localhost:3001",
  }
});
