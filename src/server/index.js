const { server } = require('rapip');

async function getPerformanceMetricsArray(api, iterations = 10) {
  const collectionOfPerformanceMetrics = [];

  for (let i = 0; i < iterations; i++) {
    const cacheBuster = Math.random();
    collectionOfPerformanceMetrics.push(await server(`${api}`));
  }
  return collectionOfPerformanceMetrics;
}

module.exports = getPerformanceMetricsArray;
