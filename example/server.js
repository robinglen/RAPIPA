const { server, utils } = require('../src');

const API = 'https://httpbin.org/user-agent';

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await server(API, 10);
  const averagesArray = utils.calculateAverages(performanceMetricsArray);
  console.log(averagesArray);
}

getAverageServerPerformanceMetrics();
