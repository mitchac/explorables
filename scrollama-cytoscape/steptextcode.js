let steptextcode = [
    {
        text: "A century ago novelist E M Forster",
    },
    {
        text: "A few preliminaries",
    },
    {
        text: "This is a node",
        code: function(){
            addNextNodes(1);
        }
    },
    {
        text: "A node in real life could represent person in a social network, a species in a food web or any kind of entity or thing",
    },
    {
        text: "This is another node",
        code: function(){
            addNextNodes(1);
        }
    },
    {
        text: "And this is an edge",
        code: function(){
            addLink(0,1);
        }
    },
    {
        text: "In real life, edges are used to represent relationships between people or things. For example an edge between two people in a social network might represent that the two people have liked or followed one another",
        code: function(){
            addLink(0,1);
        }
    },
    {
        text: "By adding more and more nodes and edges to this graph we can generate a larger and more complex graph",
        code: function(){
            addNextNodes(5);
            addLinks(10);
        }
    },
    {
        text: "But by so doing it also becomes more difficult to intuit the structure or patterns of connectedness of the graph from a simple visualisation",
        code: function(){
            addNextNodes(5);
            addLinks(10);
        }
    },
];