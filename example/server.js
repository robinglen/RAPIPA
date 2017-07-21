const { server, utils, graphs } = require('../src');

const API = 'https://httpbin.org/user-agent';

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await server(API, 1);
  const averagesArray = utils.calculateServerAverages(performanceMetricsArray);
  console.log(averagesArray);
  graphs.clientPerformanceGraphs(averagesArray);
}

getAverageServerPerformanceMetrics();
