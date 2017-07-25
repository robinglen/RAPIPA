// require("events").EventEmitter.prototype._maxListeners = 100;

const client = require("./client");
const server = require("./server");
const { calculateServerAverages, calculateClientAverages } = require("./utils");
const { clientPerformanceGraphs } = require("./graphs");

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
