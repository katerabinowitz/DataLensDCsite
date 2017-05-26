

var margin = {top: 10, right: 40, bottom: 30, left: 55},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#798E87", "#C27D38", "#CCC591"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left").ticks(5)
    .tickFormat(d3.format("s"));

var svg = d3.select("#totalTicket").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-Transportation/master/Parking%20Tickets/Graph1.csv", function(error, data) {
  if (error) throw error;

  var stateNames = d3.keys(data[0]).filter(function(key) { return key !== "Year"; });

  data.forEach(function(d) {
    d.states = stateNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.Year; }));
  x1.domain(stateNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.states, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "translate("+ -55 +","+(height/2)+")rotate(-90)")
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("Parking tickets");

  var stateUnAdj = svg.selectAll(".stateUnAdj")
      .data(data)
    .enter().append("g")
      .attr("class", "stateUnAdj")
      .attr("transform", function(d) { return "translate(" + x0(d.Year) + ",0)"; });

  stateUnAdj.selectAll("rect")
      .data(function(d) { return d.states; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

  var legend = stateUnAdj.selectAll(".legend")
      .data(stateNames.slice())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate("+ 30 +","+ i * 20 + ")"; });

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
      .text(function(d) { return d; });
});