const { client, utils } = require('../src');

const API =
  'https://api.net-a-porter.com/NAP/GB/en/10/0/summaries/expand?visibility=any-visible&customListUrlKeys=whats-new-this-month';

async function getAverageServerPerformanceMetrics() {
  const performanceMetricsArray = await client(API, 1);
  const fetchAveragesArray = utils.calculateClientAverages(
    performanceMetricsArray,
    'fetch'
  );
  process.exit(0);
}

getAverageServerPerformanceMetrics();
