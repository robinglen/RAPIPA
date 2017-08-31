const { client, graphs, utils } = require('../src');

process.on('unhandledRejection', r => console.log(r));

const INTERATOR = 1;

const PROXY = 'https://localhost:3000/api';
const LAD =
  'https://api.net-a-porter.com/NAP/GB/en/50/0/summaries/expand?visibility=any-visible&customListUrlKeys=whats-new-this-month';
const POLYJUICE =
  'http://ynap-polyjuice.eu-west-1.elasticbeanstalk.com/search/resources/store/NAP_GB/productview/byCategory?category=Clothing';
const MATCHES =
  'http://www.matchesfashion.com/mens/just-in/just-in-this-month?page=1&noOfRecordsPerPage=60&sort=&q=&format=json&navMode=notfull&noattraqt=Set';
// const FARFETCH =
//   'https://www.farfetch.com/uk/sets/men/new-in-this-week-eu-men.aspx?page=2&format=json';
// const ASOS =
//   'http://searchapi.asos.com/product/search/v1/categories/4210?currency=GBP&store=1&lang=en&rowlength=3&channel=desktop-web&offset=36&limit=36';
const WCS =
  'https://ecomm.ynap.biz/os/os1/search/resources/store/Moncler_GB/productview/byCategory/3074457345616678867?pageSize=50&pageNumber=1';

async function drawClientGraph() {
  // LAD
  const LADAverageArray = await client({ api: LAD }, INTERATOR);
  const fetchLADAverageArray = utils.calculateClientAverages(
    LADAverageArray,
    'fetch'
  );
  const xhrLADAverageArray = utils.calculateClientAverages(
    LADAverageArray,
    'xhr'
  );

  // POLYJUICE
  const POLYJUICEAverageArray = await client(
    {
      api: POLYJUICE
    },
    INTERATOR
  );
  const fetchPOLYJUICEAverageArray = utils.calculateClientAverages(
    POLYJUICEAverageArray,
    'fetch'
  );
  const xhrPOLYJUICEAverageArray = utils.calculateClientAverages(
    POLYJUICEAverageArray,
    'xhr'
  );

  // WCS
  const WCSAverageArray = await client(
    {
      api: WCS,
      headers: {
        'X-IBM-Client-Id': 'dea579ee-1cb3-43ad-9775-b2015636d560'
      }
    },
    INTERATOR
  );
  const fetchWCSAverageArray = utils.calculateClientAverages(
    WCSAverageArray,
    'fetch'
  );
  const xhrWCSAverageArray = utils.calculateClientAverages(
    WCSAverageArray,
    'xhr'
  );

  const compareMetrics = [
    {
      name: 'LAD',
      metrics: [fetchLADAverageArray, xhrLADAverageArray]
    },
    {
      name: 'POLYJUICE',
      metrics: [fetchPOLYJUICEAverageArray, xhrPOLYJUICEAverageArray]
    },
    {
      name: 'WSC',
      metrics: [fetchWCSAverageArray, xhrWCSAverageArray]
    }
  ];

  graphs.clientPerformanceGraphs(compareMetrics);
}

drawClientGraph();
//
