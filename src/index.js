const { calculateServerAverages, calculateClientAverages } = require('./utils');
const client = require('./client');
const server = require('./server');

module.exports = {
  client: client,
  server: server,
  utils: {
    calculateClientAverages: calculateClientAverages,
    calculateServerAverages: calculateServerAverages
  }
};
