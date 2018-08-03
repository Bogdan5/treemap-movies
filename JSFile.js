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
    .attr('width', 600)
    .attr('height', 600);

  let svg = container.append('svg')
    .attr('width', 600)
    .attr('height', 600);

  svg.append('g');

  let root = d3.hierarchy(data);

  const color = d3.scaleOrdinal().range(d3.schemeCategory20c);

  //treemap layout defined and configured
  let  treemapLayout = d3.treemap();
  treemapLayout.size([400, 400]);

  root.sum(function (d) {
    return parseInt(d.value);
  });

  treemapLayout(root);
  let childrenMovies = () => {
    let res = root.descendants();
    return res.filter((item) => !item.children);
  };

  console.log('descendents', childrenMovies());

  d3.select('svg g')
    .selectAll('rect')
    .data(childrenMovies())
    .enter()
    .append('rect')
    .attr('x', function (d) {
      // console.log(d);
      return d.x0; })
    .attr('y', function (d) { return d.y0; })
    .attr('width', function (d) { return d.x1 - d.x0; })
    .attr('height', function (d) { return d.y1 - d.y0; })
    .style('fill', (d) => color(d.data.category));
};
