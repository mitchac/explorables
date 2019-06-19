// var graph = {
//     nodes: d3v4.range(15).map(Object),
//     links: [
//       {source:  0, target:  1, distance: 20 },
//       {source:  0, target:  2, distance: 40},
//       {source:  0, target:  3, distance: 80},
//       {source:  1, target:  4, distance: 20},
//       {source:  1, target:  5, distance: 40},
//       {source:  1, target:  6, distance: 80},
//       {source:  2, target:  7, distance: 12},
//       {source:  2, target:  8, distance: 8},
//       {source:  2, target:  9, distance: 6},
//       {source:  3, target:  10, distance: 10},
//       {source:  3, target:  11, distance: 10},
//       {source:  3, target:  12, distance: 2},
//       {source:  3, target:  13, distance: 2},
//       {source:  3, target:  14, distance: 2}
//     ]
//   };

var graph = {
        nodes: d3v4.range(30).map(Object),
        links: [
          {source:  0, target:  1, distance: 20, fx:1000, fy:1000, fy:1000},
          {source:  1, target:  2, distance: 40},
          {source:  2, target:  3, distance: 80},
          {source:  3, target:  4, distance: 20},
          {source:  4, target:  5, distance: 40},
          {source:  5, target:  6, distance: 80},
          {source:  6, target:  7, distance: 12},
          {source:  7, target:  8, distance: 8},
          {source:  8, target:  9, distance: 6},
          {source:  9, target:  10, distance: 10},
          {source:  10, target:  11, distance: 10},
          {source:  11, target:  12, distance: 20},
          {source:  12, target:  13, distance: 20},
          {source:  13, target:  14, distance: 20},
          {source:  14, target:  15, distance: 20},
          {source:  15, target:  16, distance: 20},
          {source:  16, target:  17, distance: 20},
          {source:  17, target:  18, distance: 20},
          {source:  18, target:  19, distance: 20},
          {source:  19, target:  20, distance: 10},
          {source:  20, target:  21, distance: 10},
          {source:  21, target:  22, distance: 20},
          {source:  22, target:  23, distance: 20},
          {source:  23, target:  24, distance: 20},
          {source:  24, target:  25, distance: 20},
          {source:  25, target:  26, distance: 20},
          {source:  26, target:  27, distance: 20},
          {source:  27, target:  28, distance: 20},
          {source:  28, target:  29, distance: 20}
        ]
      };

      graph.nodes[0].fx=500;
      graph.nodes[0].fy=500;
      graph.nodes[0].fz=500;
      console.log(graph.nodes[0]);

  var width = 1200,
    height = 800;
  
  var svg = d3v4.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

  //var svg = d3.select("svg"),
  //    width = +svg.attr("width"),
  //    height = +svg.attr("height");
  
  var color = d3v4.scaleOrdinal(d3v4.schemeCategory20);
  
  var simulation = d3v4.forceSimulation()
      .force("charge", d3v4.forceManyBody().strength(-3000 ))
      .force("link", d3v4.forceLink().distance(function(d) { return d.distance } ).strength(2) )
      .force("center", d3v4.forceCenter(width / 2, height / 2))
      .force("collide",d3v4.forceCollide().strength(1).radius(50))
      .alphaDecay(0.03)
      .velocityDecay(0.4);
      
    console.log(simulation);  
      
    var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
        .attr("stroke-width", 1);
  
    var node = svg.append("g")
       .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
       .attr("r", 3)
        
   simulation
        .nodes(graph.nodes)
        .on("tick", ticked);
  
    simulation.force("link")
        .links(graph.links);
  
    
    
        
    function ticked() {
      
      var alpha = this.alpha();
      var chargeStrength;
  
      if ( alpha > 0.2 ) {
          chargeStrength = (alpha - 0.2 / 0.8);
      }
      else {
          chargeStrength = 0;
      }
  
      this.force("charge", d3v4.forceManyBody().strength( -30 * chargeStrength ))
      this.force("collide", d3v4.forceCollide().strength( 10 ).radius(110 * chargeStrength))
      
      
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
  
      node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
          
      // validate:
      if (alpha < 0.001) {
          link.each(function(d,i) {
          
              var a = d.source.x - d.target.x;
              var b = d.source.y - d.target.y;
              var c = Math.pow(a*a + b*b, 0.5);
              
              console.log("specified length: " + graph.links[i].distance + ", realized distance: " + c );
          })
      }
    }