const blessed = require("blessed");
const contrib = require("blessed-contrib");

function clientPerformanceGraphs(metrics) {
  const screen = blessed.screen();
  const grid = new contrib.grid({
    rows: 3,
    cols: metrics.length,
    screen: screen
  });

  let columnNumber = 0;

  metrics.forEach(audit => {
    buildGraph(columnNumber, audit, grid);
    columnNumber++;
  });

  screen.key(["escape", "q", "C-c"], function(ch, key) {
    return process.exit(0);
  });
  screen.render();
}

function buildGraph(columnNumber, audit, grid) {
  const metadata = grid.set(0, columnNumber, 1, 1, contrib.markdown);
  metadata.setMarkdown(
    `# ${audit.name} \n\n * Filesize: ${audit.metrics[0]
      .filesize}kb \n * gZip enabled: ${audit.metrics[0]
      .gzipEnabled} \n * api: ${audit.metrics[0].api}`
  );

  const requestGraph = grid.set(1, columnNumber, 1, 1, contrib.bar, {
    label: "Request time ms",
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
    label: "Parse time ms",
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
}

module.exports = { clientPerformanceGraphs };
