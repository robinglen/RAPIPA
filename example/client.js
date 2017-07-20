const { client, utils } = require('../src');

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await client(
    'https://httpbin.org/user-agent',
    10
  );
  console.log(performanceMetricsArray);
}

getAverageServerPerformanceMetrics();
