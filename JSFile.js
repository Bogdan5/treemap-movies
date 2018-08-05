let req = new XMLHttpRequest();
let url = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/';
url += 'a80ce8f9/src/data/tree_map/movie-data.json';
let jsonData = {};
req.open('GET', url, true);
req.send();
req.onload = () => {
  jsonData = JSON.parse(req.responseText);
  drawTreeMap(jsonData);
};

const drawTreeMap = (data) => {
  console.log(data);

  let container = d3.select('body')
    .append('div')
    .attr('width', 1000)
    .attr('height', 600)
    .style('position', 'relative')
    .style('left', 20)
    .style('top', 30);

  let root = d3.hierarchy(data);

  const color = d3.scaleOrdinal().range(d3.schemeCategory20c);

  //treemap layout defined and configured
  let  treemapLayout = d3.treemap();
  treemapLayout.size([1000, 600]);

  root.sum(function (d) {
    return parseInt(d.value);
  });

  treemapLayout(root);
  let childrenMovies = () => {
    let res = root.descendants();
    return res.filter((item) => !item.children);
  };

  let tooltip = container.append('div')
    .style('position', 'absolute')
    .attr('class', 'tooltip')
    .style('visibility', 'hidden');

  container.selectAll('.nodes')
    .data(childrenMovies())
    .enter()
    .append('div')
    .style('position', 'absolute')
    .attr('class', 'nodes')
    .style('left', (d) => d.x0 + 'px')
    .style('top', (d) => d.y0 + 'px')
    .style('width', (d) => Math.abs(d.x1 - d.x0) + 'px')
    .style('height', (d) => Math.abs(d.y1 - d.y0) + 'px')
    .style('background-color',  (d) => color(d.data.category))
    .text((d) => d.data.name)
    .on('mouseover', (d) => {
        tooltip.style('visibility', 'visible')
        .text(
          `Title: ${d.data.name}
          Gross: ${d.value}`
        )
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 'px');
      })
    .on('mouseout', (d) => tooltip.style('visibility', 'hidden'));
};
