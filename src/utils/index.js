function calculateServerAverages(performanceMetricsArray) {
  const averagesArray = {
    request: [],
    parse: [],
    responseSize: [],
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
    filesize: []
  };

  for (let audit of performanceMetricsArray) {
    averagesArray.filesize.push(audit.response.filesize.raw);
    averagesArray.request.push(audit.response[type].request.raw);
    averagesArray.parse.push(audit.response[type].parse.raw);
  }
  const averages = _calculateAverages(averagesArray);
  averages.type = type;
  return averages;
}

module.exports = { calculateServerAverages, calculateClientAverages };
