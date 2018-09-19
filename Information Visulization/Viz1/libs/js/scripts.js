var bars = function (data, id, country) {
	var svg = d3.select(id),
	margin = { top: 20, right: 20, bottom: 30, left: 50},
	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleBand()
		.rangeRound([0, width])
		.padding(0.1);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

	data = data.filter(function(d, i) {
            return d.Origin == country;
        }).map(function(d) {return Math.round(d.MPG)});

	var minMPG = d3.min(data), maxMPG = d3.max(data);

	var result = new Array(maxMPG-minMPG+1).fill(0);
	data.map((d) => {result[d-minMPG]++});
	var maxHeight = d3.max(result);

	data = result.map((d, i) => ({"x" : i+minMPG, "mpg" : d})); 
	
	x.domain(data.map(function (d) { return d.x;}));
	y.domain([0, maxHeight+1]);

	g.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));

	g.append("g")
	.call(d3.axisLeft(y))
	.append("text")
	.attr("fill", "#000")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
	.text("Count");

	g.selectAll(".bar")
	.data(data)
	.enter().append("rect")
	.attr("class", "bar")
	.attr("x", function (d) {
		return x(d.x);
	})
	.attr("y", function (d) {
		return y(d.mpg);
	})
	.attr("width", x.bandwidth())
	.attr("height", function (d) {
		return height - y(d.mpg);
	});
};

var lines = function (data, id) {
	var svg = d3.select(id), 
	margin = { top: 50, right: 50, bottom: 20, left: 50 },
  	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var svg = d3.select(id)
		.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
    	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// The number of datapoints
	var n = 13;

	var dataset = [], us = [], eu = [], ja=[], maxHeight = 0;

	for (var i = 70; i < 83; i++) {
		tempData = data.filter((d) => (d.Model==i));
		avgU = Math.round(d3.mean(tempData.filter((d) => (d.Origin=="US")).map((d)=>(d.MPG))));
		avgE = Math.round(d3.mean(tempData.filter((d) => (d.Origin=="Europe")).map((d)=>(d.MPG))));
		avgJ = Math.round(d3.mean(tempData.filter((d) => (d.Origin=="Japan")).map((d)=>(d.MPG))));
		maxHeight = Math.max(maxHeight, avgU, avgE, avgJ);
		us.push({"Year":i, "MPG" : avgU});
		eu.push({"Year":i, "MPG" : avgE});
		ja.push({"Year":i, "MPG" : avgJ});
	};

	dataset.push( 
		{"id" : "US", "values" : us},
		{"id" : "Europe", "values" : eu},
		{"id" : "Japan", "values" : ja});

	var x = d3.scaleLinear()
	    .domain([70, 83]) // input
	    .range([0, width]), // output\
		y = d3.scaleLinear()
	    .domain([0, maxHeight]) // input 
	    .range([height, 0]), // output 
		z = d3.scaleOrdinal(d3.schemeCategory10)
			  .domain(dataset.map((d)=>(d.id)));

	g.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x))
	.append('text')
	.attr("fill", "#000")
	.attr('x', width)
	.attr('y', -10)
	.attr('text-anchor', 'end')
	.attr('class', 'label')
	.text('Year');

	g.append("g")
	.call(d3.axisLeft(y))
	.append("text")
	.attr("fill", "#000")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
	.text("Average MPG");

	var line = d3.line()
    .x((d) => (x(d.Year))) // set the x values for the line generator
    .y((d) => (y(d.MPG))); // set the y values for the line generator 

    var city = g.selectAll(".city")
    .data(dataset)
    .enter().append("g")
      .attr("class", "city");

    // 9. Append the path, bind the data, and call the line generator 
    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });

	city.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.Year) + "," + y(d.value.MPG) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
};

var scatters = function(data, id) {
	data.forEach(function(d) {
    	d.MPG = +d.MPG;
    	d.Horsepower = +d.Horsepower;
  	});

		// for each year, get horse power vs gas mileage
	var svg = d3.select(id), 
	margin = { top: 50, right: 50, bottom: 20, left: 50 },
  	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var svg = d3.select(id)
		.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
    	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleLinear()
			  .range([0, width])
			  .domain(d3.extent(data, (d)=>(d.MPG))).nice(),
		y = d3.scaleLinear()
			  .range([height, 0])
			  .domain(d3.extent(data, (d)=>(d.Horsepower))).nice(),
		color = d3.scaleOrdinal(d3.schemePaired.concat(d3.schemePastel2));

	svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)) 
    .append("text")
      .attr("fill", "#000")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Gas Mileage (MPG)");

	svg.append("g")
	    .attr("class", "y axis")
	    .call(d3.axisLeft(y))
	   .append("text")
	    .attr("class", "label")
	    .attr("fill", "#000")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Horse Power (HP)");

	svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.MPG); })
      .attr("cy", function(d) { return y(d.Horsepower); })
      .style("fill", function(d) { return color(d.Model); });

    var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });
};


var scatterMatrix = function(data, id) {
	data.forEach(function(d) {
    	d.MPG = +d.MPG;
    	d.Weight = +d.Weight;
    	d.Horsepower = +d.Horsepower;
    	d.Displacement = +d.Displacement;
  	});

	var width = 1100,
    size = 250,
    padding = 80;

	var x = d3.scaleLinear()
	    .range([padding / 2, size - padding / 2]);

	var y = d3.scaleLinear()
	    .range([size - padding / 2, padding / 2]);

	var xAxis = d3.axisBottom()
	    .scale(x)
	    .ticks(6);

	var yAxis = d3.axisLeft()
	    .scale(y)
	    .ticks(6);

	var color = d3.scaleOrdinal(d3.schemeCategory10);

	var countryOrigin = {},
      traits = d3.keys(data[0]).filter(function(d) { return d !== "Origin" && d!=="Model" && d!=="Car"; }),
      n = traits.length;

    traits.forEach(function(trait) {
    	countryOrigin[trait] = d3.extent(data, function(d) { return d[trait]; });
  	});

  	xAxis.tickSize(size * n);
    yAxis.tickSize(-size * n);

    var svg = d3.select(id)
      .attr("width", size * n + padding+40)
      .attr("height", size * n + padding)
    .append("g")
      .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

	svg.selectAll(".x.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "x axis")
      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
      .each(function(d) { x.domain(countryOrigin[d]); d3.select(this).call(xAxis); });

  	svg.selectAll(".y.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "y axis")
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { y.domain(countryOrigin[d]); d3.select(this).call(yAxis); });

    var cell = svg.selectAll(".cell")
      .data(cross(traits, traits))
    .enter().append("g")
      .attr("class", "cell")
      .attr("transform", function(d) {return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
      .each(plot);

    var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(-50," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

    // Titles for the diagonal.
  	cell.filter(function(d) { return d.i === d.j; }).append("text")
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(function(d) { return d.x; });

    function plot(p) {
	    var cell = d3.select(this);
	    x.domain(countryOrigin[p.x]);
	    y.domain(countryOrigin[p.y]);
    	cell.append("rect")
        .attr("class", "frame")
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", size - padding)
        .attr("height", size - padding);

    	cell.selectAll("circle")
        .data(data)
      	.enter().append("circle")
        .attr("cx", function(d) { return x(d[p.x]); })
        .attr("cy", function(d) { return y(d[p.y]); })
        .attr("r", 4)
        .style("fill", function(d) { return color(d.Origin); });
  	}
};

function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
  return c;
};

d3.csv("./Data/old_cars.csv").then(function (data) {bars(data, "#USBar","US")});
d3.csv("./Data/old_cars.csv").then(function (data) {bars(data, "#EuroBar","Europe")});
d3.csv("./Data/old_cars.csv").then(function (data) {bars(data, "#JapanBar","Japan")});
d3.csv("./Data/old_cars.csv").then(function (data) {lines(data, "#Line")});
d3.csv("./Data/old_cars.csv").then(function (data) {scatters(data, "#Scatter")});
d3.csv("./Data/old_cars.csv").then(function (data) {scatterMatrix(data, "#ScatterMatrix")});