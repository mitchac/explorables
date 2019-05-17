// Code goes here

var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  elements: { // list of graph elements to start with
    nodes: [{ // node a
      data: {
        id: 'a'
      }
    }, { // node b
      data: {
        id: 'b'
      }
    }, {
      data: {
        id: 'd'
      }
    }, {
      data: {
        id: 'e'
      }
    }, {
      data: {
        id: 'f'
      }
    }, {
      data: {
        id: 'g'
      }
    }],
    edges: [{ // edge ab
      data: {
        id: 'ab',
        source: 'a',
        target: 'b'
      }
    }, {
      data: {
        id: 'bd',
        source: 'b',
        target: 'd'
      }
    }, {
      data: {
        id: 'ad',
        source: 'a',
        target: 'd'
      }
    }, {
      data: {
        id: 'df',
        source: 'd',
        target: 'f'
      }
    }, {
      data: {
        id: 'ed',
        source: 'e',
        target: 'd'
      }
    }, {
      data: {
        id: 'dg',
        source: 'd',
        target: 'g'
      }
    }, {
      data: {
        id: 'fe',
        source: 'f',
        target: 'e'
      }
    }]
  },

  ready: function(e) {
    console.info("cytoscape is ready");
  },
  minZoom: 1e-5,
  maxZoom: 1e5,
  wheelSensitivity: 0.5,
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'shape': 'roundrectangle',
        'background-color': '#ccc',
        'border-color': '#888',
        'shape ': 'roundrectangle',
        'width': 'label',
        'height': 'label',
        'padding-right': '3',
        'padding-left': '3',
        'padding-top': '3',
        'padding-bottom': '3',
        'text-wrap': 'wrap',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-max-width': '100px',
        'label': 'data(id)',
        'font-size': '10'
      },
    }, {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#1100cc',
        'target-arrow-color': '#1100cc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'grid',
    rows: 2
  }
});

var options = {
  name: 'cose',
  // Called on `layoutready`
  ready: function() {},
  // Called on `layoutstop`
  stop: function() {},
  // Whether to animate while running the layout
  animate: true,
  // The layout animates only after this many milliseconds
  // (prevents flashing on fast runs)
  animationThreshold: 250,
  // Number of iterations between consecutive screen positions update
  // (0 -> only updated on the end)
  refresh: 20,
  // Whether to fit the network view after when done
  fit: true,
  // Padding on fit
  padding: 30,
  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox: undefined,
  // Extra spacing between components in non-compound graphs
  componentSpacing: 100,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: function(node) {
    return 400000;
  },
  // Node repulsion (overlapping) multiplier
  nodeOverlap: 10,
  // Ideal edge (non nested) length
  idealEdgeLength: function(edge) {
    return 10;
  },
  // Divisor to compute edge forces
  edgeElasticity: function(edge) {
    return 100;
  },
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 5,
  // Gravity force (constant)
  gravity: 80,
  // Maximum number of iterations to perform
  numIter: 1000,
  // Initial temperature (maximum node displacement)
  initialTemp: 200,
  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor: 0.95,
  // Lower temperature threshold (below this point the layout will end)
  minTemp: 1.0,
  // Whether to use threading to speed up the layout
  useMultitasking: true
};


function foo(arr) {
  var a = [], b = [], prev;

  arr.sort();
  for ( var i = 0; i < arr.length; i++ ) {
      if ( arr[i] !== prev ) {
          a.push(arr[i]);
          b.push(1);
      } else {
          b[b.length-1]++;
      }
      prev = arr[i];
  }

  var maxDegree = Math.max.apply(null, a);
  var degreeFreq = [];
  var biter = 0;

  for ( var i = 0; i <= maxDegree; i++ ) {
    
    if (a.includes(i)){
      
      degreeFreq.push(b[biter]);
      biter = biter + 1;
    } else {
      degreeFreq.push(0);
    }

  }

  return degreeFreq;
}

var createDegreeArray = function() {
  allElements = cy.elements();
  var allEdges  = allElements.filter('edge');                
  var allNodes = allElements.filter('node');
  window.degreeArray = [];
  allNodes.filter(function(i,ele){
    degreeArray.push(ele.degree());
  });
  window.nodeDegreeDist = foo(degreeArray)
}

createDegreeArray();

cy.layout(options);

cy.on('click', 'node', function(evt) {
  console.log('clicked ' + this.id());
});

var destroy = function() {
  cy.destroy();
}

var addNode = function() {
  var elem_id = document.getElementById('node_id').value;
  var from_node = document.getElementById('from_node').value;
  var blah = document.getElementById("test").innerHTML = "test";

  if (elem_id.length === 0 || from_node.length === 0) {
    alert("please fill both input fields");
    return;
  }
  cy.add([{
      data: {
        id: elem_id
      }
    }, {
      data: {
        id: from_node + '' + elem_id,
        source: from_node + '',
        target: elem_id + ''

      }
    }
  ]);

  createDegreeArray();
  
  var blah = document.getElementById("test").innerHTML = degreeArray;
  
  cy.layout(options);
  
}