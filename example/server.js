const { server, utils, graphs } = require("../src");

const API = "https://httpbin.org/user-agent";

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await server(API, 5);
  const averagesArray = utils.calculateServerAverages(performanceMetricsArray);
  console.log(averagesArray);
  process.exit(0);
}

getAverageServerPerformanceMetrics();
