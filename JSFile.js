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
};
