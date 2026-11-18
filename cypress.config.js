const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.js",
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 6000
  }
});
