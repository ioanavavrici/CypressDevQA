
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api.amprenta.at.assistcloud.services/api/v1/',
    env: {
      "expectedLength":91,
    },
    setupNodeEvents(on, config) {
      // Configurați event listenerii aici dacă este nevoie
    },
  },
});
