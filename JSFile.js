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

  let treemap = d3.tree()
    .size([600, 600]);

  //  assigns the data to a hierarchy using parent-child relationships
  let nodes = d3.hierarchy(data, (d) => d.children);

  // maps the node data to the tree layout
  nodes = treemap(nodes);

  let cells = svg.selectAll('.cell')
    .data(treemap)
    .enter()
    .append('g')
    .attr('class', 'cell');

  cells.append('rect')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('dx', (d) => d.dx)
    .attr((d) => d.dy);
};
