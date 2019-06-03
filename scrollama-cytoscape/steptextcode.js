let steptextcode = [
    {
        text: "A tale of nodes and edges",
    },
    {
        text: "This is a node",
        code: function () {
            addNextNodes(1);
        }
    },
    {
        text: "A node in real life could represent person in a social network, a species in a food web or any kind of entity or thing",
    },
    {
        text: "This is another node",
        code: function () {
            addNextNodes(1);
        }
    },
    {
        text: "And this is an edge",
        code: function () {
            addLink(0, 1);
        }
    },
    {
        text: "In real life, edges are used to represent relationships between people or things. For example an edge between two people in a social network might represent that the two people have liked or followed one another",
        code: function () {
            addLink(0, 1);
        }
    },
    {
        comment:"This code often generates graphs with multiple components and or isolated nodes. Intuitively most people probably think of a graph as a single component. Also isolated nodes mess with the sizing / layout of the graph. Recommend change to algo for adding nodes and links accordingly",
        text: "By adding more and more nodes and edges to this graph we can generate a larger and more complex graph",
        code: function () {
            addNextNodes(5);
            addLinks(10);
        }
    },
    {
        text: "But by so doing it also becomes more difficult to intuit the structure or patterns of connectedness of the graph from a simple visualisation",
        code: function () {
            addNextNodes(5);
            addLinks(10);
        }
    },
    {
        text: "Is there some simple property of the graph or its nodes or edges which we could use to gain some additional insight into the graph’s structure?",
    },
    {
        text: "One property mathematicians have studied extensively is the degree of a node in a graph. This is simply a count of the number of edges that each node has",
    },
    {
        comment: "will interactivity confuse the user? before i was scrolling now i'm clicking. do i need to start scrolling again to resume?",
        comment: "change code which colours edges on clicking a node so that edges previously coloured on selecting previous nodes are returned to the default colour for the graph",
        text: "Click on a node in the graph at right to highlight it's edges",
    },
    {
        text: "The degree of a node seems intuitively useful as a measure of the relative ‘importance’ of particular nodes in a graph when we consider that nodes with very high degrees or edge counts in real life social networks might be prominent and powerful individuals",
    },
    {
        text: "Next we could calculate the degree for each node in the chart and create a chart which shows how many nodes have zero edges, one edge and so on",
        code: function () {
            //insert boilerplate code to eg zoom in on the axes of a chart and back out 
            // insert code to communicate that bars in the node degree distribution chart are derived from the graph. Eg mouseover bar for degree = 2 in chart, then highlight the nodes in the graph which have this number of edges and then display text saying "3 nodes have 2 edges or degree 2"
        }
    },
    {
        text: "This chart gives us a view of the graph which is complementary to the simple visualisation of the nodes and edges. Further if we consider links to be the ‘currency’ of a graph, it gives us an insight into how equitably such edges are shared out between the different nodes",
    },
    {
        text: "Random, yes; Senseless, no",
    },
    {
        text: "One challenge faced by mathematicians early to the field of graph theory was how to generate graphs to study",
    },
    {
        text: "One strategy frequently employed by mathematicians is to start by analysing a simple version of a more general problem, because such simple cases are frequently simpler to analyse.",
    },
    {
        text: "In 1959, Paul Erdős and Alfréd Rényi proposed just such a simple method for generating graphs called the random graph model. The rule they proposed is to start with a graph with fixed number of nodes and no edges and then take each of the pairs of nodes in the graph and with a certain probability add an edge between these two edges",
        code: function () {
            //insert boilerplate code to eg zoom in on the axes of a chart and back out 
            // insert code to communicate that bars in the node degree distribution chart are derived from the graph. Eg mouseover bar for degree = 2 in chart, then highlight the nodes in the graph which have this number of edges and then display text saying "3 nodes have 2 edges or degree 2"
        }
    },
    {
        text: "For example in the following graph we take the first two nodes and ‘toss a coin’ to see if we need to add an edge",
        code: function () {
            //Start with graph with eg 5 isolated edges. Then highlight first two edges. Then demonstrate tossing of coin to see if coin added. Heads add. Tails don't add.   
        }
    },
    {
        text: "We then do the same for each of the other pairs of edges",
        code: function () {
            //Repeat for each other pair of edges   
        }
    },
    {
        text: "It seems intuitive that because the edges are being added to the nodes randomly that each node should end up with about the same number of edges",
    },
    {
        text: "In fact by using the same process to generate larger and larger graphs",
        code: function () {
            //Sequentially add more and more nodes and edges to erdos renyi graph OR create sequence of more and more complex random graphs. 
        }
    },
    {
        text: "We can see that the distribution of edges across nodes becomes closer and closer to a bell curve or normal distribution",
    },
    {
        text: "The normal distribution is, for example, a reasonably accurate approximation for the distribution of heights in a group of people where the bulk of heights are clustered around the average height. But is it a reasonable approximation to the sort of distribution of edges across nodes that we would expect to see, for example, in a real life social network? ",
        code: function () {
            //Show Facebook graph with hubs or famous youtuber? 
        }
    },
    {
        text: "It’s hard to tell for certain just by looking at the graph but it seems that the social network diagram instead has a small number of nodes with very high degree or number of edges - known as hubs - while there are many more nodes which each have very few edges",
    },
    {
        text: "So it seems adding edges to nodes at random doesn’t seem to generate the sort of graphs or social networks that we see in the real world",
    },
];