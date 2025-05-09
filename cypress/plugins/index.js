const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('task', {
    /**
     * Sets a variable in the variables.json file.
     * @param {Object} data - An object containing the key and value to set.
     * @returns {null}
     */
    setVariable({ key, value }) {
      const filePath = path.resolve(__dirname, '..', 'fixtures', 'variables.json');
      let variables = {};

      if (fs.existsSync(filePath)) {
        variables = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }

      variables[key] = value;
      fs.writeFileSync(filePath, JSON.stringify(variables, null, 2));

      return null;
    },

    /**
     * Gets a variable from the variables.json file.
     * @param {string} key - The key of the variable to get.
     * @returns {string|null} - The value of the variable or null if not found.
     */
    getVariable(key) {
      const filePath = path.resolve(__dirname, '..', 'fixtures', 'variables.json');
      if (fs.existsSync(filePath)) {
        const variables = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return variables[key] || null;
      }
      return null;
    }
  });

  // You can also use this area to configure other plugins or set up event listeners.
};
