var scatters = function(data, id) {
  var keys = {
    "x" : " GDP per capita ", 
    "y" : "Life expectancy at birth", 
    "r" : "Population", 
    "c" : "Birth rate",
    "xScale" : d3.scaleLinear,
    "yScale" : d3.scaleLinear,
    "rScale" : 50};
  var myarray = ["x", "y", "r", "c", "xScale", "yScale", "rScale"];

 let buildDetails = function(d){
      html = "";
      for (idx in d){
        if(myarray.includes(idx)) continue;
        html+= "<p><strong>"+idx+":</strong><span style='color:red'> "+d[idx]+"</span></p>"
      }
      return html;
  };

  let drawDots = function(){
      data.forEach(function(d) {
        d.x = +d[keys.x].replace(/[$,]+/g,"");
        d.y = +d[keys.y].replace(/[$,]+/g,"");
        d.r = +d[keys.r].replace(/[$,]+/g,"");
        d.c = +d[keys.c].replace(/[$,]+/g,"");
      });
      var svg = d3.select("#"+id), 
        margin = { top: 50, right: 50, bottom: 20, left: 50 },
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var svg = d3.select("#"+id)
        .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = keys["xScale"]()
            .range([0, width])
            .domain(d3.extent(data, (d)=>(d.x))).nice(),
        y = keys["yScale"]()
            .range([height, 0])
            .domain(d3.extent(data, (d)=>(d.y))).nice(),
        r = d3.scaleLinear()
            .range([3.5, 100])
            .domain(d3.extent(data, (d)=>(d.r))).nice()
        c = d3.scaleLinear()
            .range([0, 1])
            .domain(d3.extent(data, (d)=>(d.c))).nice();

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
          .text(keys.x);

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
          .text(keys.y);

      var tip = d3.select('body')
          .append('div')
          .attr('class', 'tip')
          .style('position', 'absolute')
          .style('display', 'none')
          .on('mouseover', function(d, i) {
            tip.transition().duration(0);
          })
          .on('mouseout', function(d, i) {
            tip.style('display', 'none');
          });

      svg.selectAll("#"+id+" .dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) {return keys.rScale/100.0 * r(d.r);})
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .on('mouseover', function(d, i) {
          tip.transition().duration();
          tip.style('top',  d3.event.pageY +'px');
          tip.style('left',  d3.event.pageX +'px');
          tip.style('display', 'block');
          tip.html(buildDetails(d));
        })
        .on('mouseout', function(d, i) {
          tip.transition()
          .delay(500)
          .style('display', 'none');
        })
        .style("fill", function(d) { return d3.interpolateSpectral(1-c(d.c)); });
  };

  for(idx in data.columns){
    value = data.columns[idx];
    if(value == 'Country') continue;
    $(".my-form").append($("<option></option>").attr("value", value).text(value.trim()));
  }

  for(key in keys){
    if((key == "xScale") || (key == "yScale")) continue;
    $("."+id+ " #"+key).val(keys[key]);
  }

	drawDots();

  let updateField = function(type, value){
    d3.selectAll("#" + id + " > *").remove();
    if(type == "xScale" || type == "yScale"){
      if(value == "Linear") value = d3.scaleLinear;
      else value = d3.scaleLog;
    }
    if(type == "rScale"){
      $("."+id+" span").text(d3.format(".2n")(value/100));
    }
    keys[type] = value;
    drawDots();
  };

  d3.selectAll('.'+id+" .form-control")
    .on('change', function() {
      updateField(d3.select(this).property('id'), d3.select(this).property('value'));
  });

   d3.select('.'+id+' .custom-range').on('change', function() {
      updateField(d3.select(this).property('id'), d3.select(this).property('value'));
  });
};

d3.csv("./Data/health_data.csv").then(function (data) {
  scatters(data, "c1");
  scatters(data, "c2");
  scatters(data, "c3");
  scatters(data, "c4");
});

