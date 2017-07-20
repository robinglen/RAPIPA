const calculateAverages = require('./utils');
const client = require('./client');
const server = require('./server');

module.exports = {
  client: client,
  server: server,
  utils: {
    calculateAverages: calculateAverages
  }
};
