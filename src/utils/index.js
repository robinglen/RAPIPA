function calculateServerAverages(performanceMetricsArray) {
  const averagesArray = {
    request: [],
    parse: [],
    size: [],
    stringify: []
  };

  for (let audit of performanceMetricsArray) {
    for (let metric of Object.keys(audit.response)) {
      if (typeof audit.response[metric].raw !== 'undefined') {
        averagesArray[metric].push(audit.response[metric].raw);
      }
    }
  }
  
  return _calculateAverages(averagesArray);
}

function _calculateAverages(averagesArray) {
  for (let audit of Object.keys(averagesArray)) {
    let sum = averagesArray[audit].reduce(
      (previous, current) => (current += previous)
    );
    averagesArray[audit] = Number(
      (sum / averagesArray[audit].length).toFixed(2)
    );
  }
  return averagesArray;
}

function calculateClientAverages(performanceMetricsArray, type = 'fetch') {
  const averagesArray = {
    request: [],
    parse: [],
    size: []
  };
  const fixedItems = {
    gzipEnabled: false,
    api: ''
  };

  for (let audit of performanceMetricsArray) {
    averagesArray.size.push(audit.response.size.raw);
    averagesArray.request.push(audit.response[type].request.raw);
    averagesArray.parse.push(audit.response[type].parse.raw);
    // it doesn't matter these are over written as they are the same
    fixedItems.gzipEnabled = audit.response.gzipEnabled;
    fixedItems.api = audit.response.api;
  }

  const averages = _calculateAverages(averagesArray);
  averages.type = type;
  averages.gzipEnabled = fixedItems.gzipEnabled;
  averages.api = fixedItems.api;
  return averages;
}

module.exports = { calculateServerAverages, calculateClientAverages };
