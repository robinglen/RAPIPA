const { client, utils, graphs } = require("../src");

const API = "https://httpbin.org/user-agent";

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await client(API, 5);
  const fetchAveragesArray = utils.calculateClientAverages(
    performanceMetricsArray,
    "fetch"
  );
  const xhrAveragesArray = utils.calculateClientAverages(
    performanceMetricsArray,
    "xhr"
  );
  console.log([fetchAveragesArray, xhrAveragesArray]);
  process.exit(0);
}

getAverageServerPerformanceMetrics();
