// removing max event listeners - can lead to memory leaks and an issue with lots of iterations
// https://nodejs.org/docs/latest/api/events.html#events_emitter_setmaxlisteners_n
process.setMaxListeners(0);

const client = require('./client');
const server = require('./server');
const { calculateServerAverages, calculateClientAverages } = require('./utils');
const { clientPerformanceGraphs } = require('./graphs');

module.exports = {
  client: client,
  server: server,
  utils: {
    calculateClientAverages: calculateClientAverages,
    calculateServerAverages: calculateServerAverages
  },
  graphs: {
    clientPerformanceGraphs: clientPerformanceGraphs
  }
};
