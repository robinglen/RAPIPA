const blessed = require('blessed');
const contrib = require('blessed-contrib');

function clientPerformanceGraphs(metrics) {
  const screen = blessed.screen();
  const grid = new contrib.grid({
    rows: 4,
    cols: metrics.length,
    screen: screen
  });

  let columnNumber = 0;

  metrics.forEach(audit => {
    buildGraph(columnNumber, audit, grid, columnNumber);
    columnNumber++;
  });

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  screen.render();
}

function buildGraph(columnNumber, audit, grid, index) {
  const metadata = grid.set(0, columnNumber, 1, 1, contrib.markdown);
  metadata.setMarkdown(
    `# ${audit.name} \n\n * Filesize: ${audit.metrics[index]
      .filesize}kb \n * gZip enabled: ${audit.metrics[index]
      .gzipEnabled} \n * api: ${audit.metrics[index].api}`
  );

  const requestGraph = grid.set(1, columnNumber, 1, 1, contrib.bar, {
    label: 'Request time ms',
    barWidth: 15,
    barSpacing: 4,
    xOffset: 0,
    maxHeight: 9
  });
  requestGraph.setData({
    titles: audit.metrics.map(auditType => {
      return auditType.type.toUpperCase();
    }),
    data: audit.metrics.map(auditType => {
      return auditType.request;
    })
  });
  const parseGraph = grid.set(2, columnNumber, 1, 1, contrib.bar, {
    label: 'Parse time ms',
    barWidth: 15,
    barSpacing: 4,
    xOffset: 0,
    maxHeight: 9
  });
  parseGraph.setData({
    titles: audit.metrics.map(auditType => {
      return auditType.type.toUpperCase();
    }),
    data: audit.metrics.map(auditType => {
      return auditType.parse;
    })
  });
  const totalGraph = grid.set(3, columnNumber, 1, 1, contrib.bar, {
    label: 'Total time ms',
    barWidth: 15,
    barSpacing: 4,
    xOffset: 0,
    maxHeight: 9
  });
  totalGraph.setData({
    titles: audit.metrics.map(auditType => {
      return auditType.type.toUpperCase();
    }),
    data: audit.metrics.map(auditType => {
      return (auditType.request + auditType.parse).toFixed(2);
    })
  });
}

module.exports = { clientPerformanceGraphs };
