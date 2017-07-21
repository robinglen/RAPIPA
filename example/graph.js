const { graphs } = require('../src');

async function drawClientGraph() {
  const compareMetrics = [
    {
      name: 'LAD',
      metrics: [
        { request: 85, parse: 4, filesize: 1.05, type: 'fetch' },
        { request: 11, parse: 1, filesize: 1.05, type: 'xhr' }
      ]
    },
    {
      name: 'LAD2',
      metrics: [
        { request: 85, parse: 4, filesize: 1.05, type: 'fetch' },
        { request: 11, parse: 1, filesize: 1.05, type: 'xhr' }
      ]
    }
  ];

  graphs.clientPerformanceGraphs(compareMetrics);
}

drawClientGraph();
