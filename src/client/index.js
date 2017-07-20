const { client } = require('rapip');

async function getPerformanceMetricsArray(api, iterations = 10) {
  return new Promise((resolve, reject) => {
    client.framework.listen(3000, async () => {
      console.log('Listening on port 3000!');
      const collectionOfPerformanceMetrics = [];

      for (let i = 0; i < iterations; i++) {
        const cacheBuster = Math.random();
        collectionOfPerformanceMetrics.push(
          await client.performanceTestApi(`${api}`)
        );
      }

      resolve(collectionOfPerformanceMetrics);
    });
  });
}

module.exports = getPerformanceMetricsArray;
