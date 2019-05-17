var graph;

// variables for d3 histogram set up
var binsize = 1,
    minbin = 0,
    maxbin = 8
    numbins = (maxbin - minbin) / binsize;

var binmargin = 0.2,
    margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 225 - margin.top - margin.bottom;

var xmin = minbin - 1,
    xmax = maxbin + 1;

var x, x2, y, xAxis, yAxis, svg, bar;

// loads data from a csv file
function getData(degreeArray) {

    if (graph) {
      // if the graph exists then update its data
      updateGraph();  
    } else {
      // otherwise create the graph
      makeGraph();
    }

}

// creates the histogram
function makeGraph() {
  //var histdata = makeHistData(data);
  var histdata = window.nodeDegreeDist;

  x = d3.scale.linear()
  //x = d3.scale.ordinal()
      .domain([0, (xmax - xmin)])
     // .range([0, width+]);
     .range([0, width]);

  x2 = d3.scale.linear()
  //x2 = d3.scale.ordinal()
      .domain([xmin, xmax])
      .range([0, width]);

  y = d3.scale.linear()
  //y = d3.scale.ordinal()
      .domain([0, d3.max(histdata, function(d){
              return d;
            })])
      .range([height, 0]);

  xAxis = d3.svg.axis()
      .scale(x2)
      .tickFormat(function(d) {
        return d.toString();
      })
      .orient("bottom");

  yAxis = d3.svg.axis()
      .scale(y)
      .ticks(8)
      .orient("left");

  svg = d3.select(".graph").append("svg")
      .attr("position", "relative")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  bar = svg.selectAll(".bar")
      .data(histdata)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function(d,i) {
          return "translate(" + x2(i * binsize + minbin) + "," + y(d) + ")"; 
        });
  
  bar.append("rect")
    .attr("x", x(binmargin))
    .attr("width", x(binsize - 2 * binmargin))
    .attr("height", function(d) { return height - y(d); });

  // x-axis & labels
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // y-axis & labels
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);

  /*      

  svg.append("text")
    .attr("class", "ylabel")
    .attr("y", 0 - 1.1 * margin.left)
    .attr("x", 0 - (height/2))
    .attr("dy", "0.8em")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
    .text("Number of Flips");

  */

  graph = true;

}

// updates the data in the graph
function updateGraph() {    

  // group the data into new bins
  var newhistdata = window.nodeDegreeDist;

  y = null, yAxis = null;

  y = d3.scale.linear()
      .domain([0, d3.max(newhistdata, function(d){
              return d;
            })])
      .range([height, 0]);

  yAxis = d3.svg.axis()
      .scale(y)
      .ticks(8)
      .orient("left");

  bar.data(newhistdata)
    .transition()
    .duration(1000)
    .attr("transform", function(d,i) { 
        return "translate(" + x2(i * binsize + minbin) + "," + y(d) + ")";
      })
    .select('rect')
    .attr('x', x(binmargin))
    .attr("width", x(binsize - 2 * binmargin))
    .attr("height", function(d) { return height - y(d); });

  d3.select('.x.axis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  d3.select('.y.axis')
    .attr("transform", "translate(0,0)")
    .call(yAxis);

}  
    getData();

d3.select('button').on('click', function(){
        getData();
});