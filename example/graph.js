const { client, graphs, utils } = require('../src');

const API1 = 'https://httpbin.org/user-agent';
const API2 = 'https://httpbin.org/ip';
const INTERATOR = 5;

async function drawClientGraph() {
  const API1AverageArray = await client({ api: API1 }, INTERATOR);
  const fetchAPI1AverageArray = utils.calculateClientAverages(
    API1AverageArray,
    'fetch'
  );
  const xhrAPI1AverageArray = utils.calculateClientAverages(
    API1AverageArray,
    'xhr'
  );

  const API2AverageArray = await client({ api: API2 }, INTERATOR);
  const fetchAPI2AverageArray = utils.calculateClientAverages(
    API2AverageArray,
    'fetch'
  );
  const xhrAPI2AverageArray = utils.calculateClientAverages(
    API2AverageArray,
    'xhr'
  );

  const compareMetrics = [
    {
      name: 'API1',
      metrics: [fetchAPI1AverageArray, xhrAPI1AverageArray]
    },
    {
      name: 'API2',
      metrics: [fetchAPI2AverageArray, xhrAPI2AverageArray]
    }
  ];

  graphs.clientPerformanceGraphs(compareMetrics);
}

drawClientGraph();
