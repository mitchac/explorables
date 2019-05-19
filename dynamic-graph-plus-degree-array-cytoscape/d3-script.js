var graph;

// variables for d3 histogram set up
var binsize = 1,
    minbin = 1,
    maxbin = 8
    numbins = (maxbin - minbin) / binsize;

var binmargin = 0.2,
    margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 225 - margin.top - margin.bottom;

    //var xmin = minbin - 1,
    //xmax = maxbin + 1;

var x, x2, y, xAxis, yAxis, svg, bar;

function log(sel,msg) {
  console.log(msg,sel);
}

// loads data from a csv file
function getData() {
    if (graph) {
      // if the graph exists then update its data
      //updateGraph();  
      d3.select(".graph").selectAll("*").remove();
      makeGraph();
    } else {
      // otherwise create the graph
      makeGraph();
    }
}

// creates the histogram
function makeGraph() {
  
  var data = window.nodeDegreeDist;
  var datamax = d3.max(data)
  
  var binsize = 1,
    minbin = -1,
    maxbin = data.length,
    numbins = (maxbin - minbin) / binsize;

  var xmin = minbin,
      xmax = maxbin;

  x = d3.scale.linear()
      .domain([0, (xmax - xmin)])
      .rangeRound([0, width]);

  x2 = d3.scale.linear()
      .domain([xmin, xmax])
      .rangeRound([0,width]);

  y = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

  xAxis = d3.svg.axis()
      .scale(x2)
      .tickFormat(function(d) {
        if (d>=0) {
          return d.toString();
        }
      })
      .orient("bottom");

  yAxis = d3.svg.axis()
      .scale(y)
      .ticks(datamax + 1)
      .orient("left");

  svg = d3.select(".graph").append("svg")
      .attr("position", "relative")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  bar = svg.selectAll(".bar")
      //.call(log,".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function(d,i) {
          //return "translate(" + x2(i * binsize + minbin) + "," + y(d) + ")"; 
          return "translate(" + x2((i * binsize)-0.5) + "," + y(d) + ")"; 
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
  var data = window.nodeDegreeDist;

  y = null, yAxis = null;

  y = d3.scale.linear()
      .domain([0, d3.max(data, function(d){
              return d;
            })])
      .range([height, 0]);

  yAxis = d3.svg.axis()
      .scale(y)
      .ticks(8)
      .tickSubdivide(0)
      .orient("left");
  
  bar.data(data)
    .transition()
    .duration(1000)
    .attr("transform", function(d,i) { 
        //return "translate(" + x2(i * binsize + minbin) + "," + y(d) + ")";
        return "translate(" + x2((i * binsize)-0.5) + "," + y(d) + ")";
      })
    .select('rect')
    .attr('x', x(binmargin))
    .attr("width", x(binsize - 2 * binmargin))
    .attr("height", function(d) { return height - y(d); });

  d3.select('.x.axis')
    //.call(log,".x.axis")
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