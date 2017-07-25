const { client } = require("rapip");
let serverRunning = false;

async function getPerformanceMetricsArray(api, iterations = 10, port = 3000) {
  return new Promise((resolve, reject) => {
    let collectionOfPerformanceMetrics;
    if (serverRunning) {
      collectionOfPerformanceMetrics = startServer(api, iterations);
      resolve(collectionOfPerformanceMetrics);
    } else {
      client.framework.listen(port, async () => {
        console.log(`Listening on port ${port}`);
        serverRunning = true;
        collectionOfPerformanceMetrics = await startServer(api, iterations);
        resolve(collectionOfPerformanceMetrics);
      });
    }
  });
}

async function startServer(api, iterations) {
  let collectionOfPerformanceMetrics = [];

  for (let i = 0; i < iterations; i++) {
    const cacheBuster = Math.random();
    collectionOfPerformanceMetrics.push(
      await client.performanceTestApi(`${api}`)
    );
  }

  return collectionOfPerformanceMetrics;
}

module.exports = getPerformanceMetricsArray;
