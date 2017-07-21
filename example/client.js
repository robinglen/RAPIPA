const { client, utils, graphs } = require('../src');

const API =
  'https://api.net-a-porter.com/NAP/GB/en/10/0/summaries/expand?visibility=any-visible&customListUrlKeys=whats-new-this-month';

// const API = 'https://httpbin.org/user-agent';

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await client(API, 1);
  const fetchAveragesArray = utils.calculateClientAverages(
    performanceMetricsArray,
    'fetch'
  );
  const xhrAveragesArray = utils.calculateClientAverages(
    performanceMetricsArray,
    'xhr'
  );
  console.log([fetchAveragesArray, xhrAveragesArray]);
}

getAverageServerPerformanceMetrics();
