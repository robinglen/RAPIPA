const { client } = require('rapip');

async function getPerformanceMetricsArray(
  request,
  iterations = 10,
  port = 3000
) {
  return new Promise((resolve, reject) => {
    let collectionOfPerformanceMetrics;
    const server = client.framework.listen(port, async () => {
      serverRunning = true;
      collectionOfPerformanceMetrics = await startServer(request, iterations);
      server.close();
      resolve(collectionOfPerformanceMetrics);
    });
  });
}

async function startServer(request, iterations) {
  const headers = request.headers ? request.headers : {};
  let collectionOfPerformanceMetrics = [];
  for (let i = 0; i < iterations; i++) {
    let response;
    try {
      response = await client.performanceTestApi(request.api, headers);
    } catch (error) {
      console.log(error);
    }
    collectionOfPerformanceMetrics.push(response);
  }

  return collectionOfPerformanceMetrics;
}

module.exports = getPerformanceMetricsArray;
