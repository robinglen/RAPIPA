const blessed = require('blessed');
const contrib = require('blessed-contrib');

function clientPerformanceGraphs(metrics) {
  const screen = blessed.screen();
  const grid = new contrib.grid({
    rows: 3,
    cols: metrics.length,
    screen: screen
  });

  const bar = grid.set(0, 0, 1, 1, contrib.bar, {
    label: 'Brand average',
    barWidth: 15,
    barSpacing: 4,
    xOffset: 0,
    maxHeight: 9
  });
  bar.setData({
    titles: ['test1', 'test2'],
    data: [1, 5]
  });
  const bar2 = grid.set(1, 0, 1, 1, contrib.bar, {
    label: 'Brand average',
    barWidth: 15,
    barSpacing: 4,
    xOffset: 0,
    maxHeight: 9
  });
  bar2.setData({
    titles: ['test1', 'test2'],
    data: [1, 5]
  });

  const filesize = grid.set(3, 0, 1, 1, contrib.markdown());
  markdown.setMarkdown('Filesize: 1kb');

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  screen.render();
}

module.exports = { clientPerformanceGraphs };

//{ request: 486, parse: 1, responseSize: 0.08, stringify: 0 }
