const { server, utils } = require('../src');

const API = 'https://httpbin.org/user-agent';

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await server(API, 2);
  const averagesArray = utils.calculateServerAverages(performanceMetricsArray);
  console.log(averagesArray);
}

getAverageServerPerformanceMetrics();
