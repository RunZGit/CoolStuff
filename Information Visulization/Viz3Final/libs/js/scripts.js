let drawBasicNetwork = function(graph, id){
	
	var width = 1000, height = 600;

	var svg = d3.select("#"+id).append("svg")
				.attr("width", width)
				.attr("height", height);

	graph.links.forEach(function(d) {
		d.source = graph.nodes[d.source-1];
		d.target = graph.nodes[d.target-1];
	});

	var x = d3.scaleLinear()
		.range([0, width])
		.domain(d3.extent(graph.nodes, (d)=>(d.x))).nice(),
	y = d3.scaleLinear()
		.range([height, 0])
		.domain(d3.extent(graph.nodes, (d)=>(d.y))).nice();

	var link = svg.append("g")
		.attr("class", "link")
		.selectAll("line")
		.data(graph.links)
		.enter().append("line")
		.attr("x1", function(d) { return x(d.source.x); })
		.attr("y1", function(d) { return y(d.source.y); })
		.attr("x2", function(d) { return x(d.target.x); })
		.attr("y2", function(d) { return y(d.target.y); });

	var node = svg.append("g")
		.attr("class", "node")
		.selectAll("circle")
		.data(graph.nodes)
		.enter().append("circle")
		.attr("r", 4)
		.attr("cx", function(d) { return x(d.x); })
		.attr("cy", function(d) { return y(d.y); });
};

d3.json("/Data/UsAir97.json").then(function(data) {
  // drawBasicNetwork(data, 'c1');
});

