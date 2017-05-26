(function() {
var margin = {top: 0, right: 15, bottom: 20, left: 15},
    width = 450 - margin.left - margin.right,
    height = 90 - margin.top - margin.bottom;

var xValue = function(d) { return d.adjustLot;}, 
    xScale = d3.scale.linear().range([0, width]),
    xMap = function(d) { return xScale(xValue(d));},
    xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(6).tickFormat(d3.format("."));;

var yValue = function(d) { return d.zero;}, 
    yScale = d3.scale.linear().range([height, 0]), 
    yMap = function(d) { return yScale(yValue(d));};

var color = d3.scale.ordinal()
    .range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d','#666666']);

var svg = d3.select("#homeSizeScatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("#homeSizeScatter").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-RealEstate/master/DCResHomesExt/resGroupSum.csv", function(error, data) {
  data.forEach(function(d) {
    d.adjustLot = +d.adjustLot;
    d.zero = +d.zero;
  });

  xScale.domain([1300,5100]);
  yScale.domain([d3.min(data, yValue), d3.max(data, yValue)+1]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(d.WARD); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html("Ward "+ d.WARD + ":<br/>" + d.medLand)
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  svg.append('foreignObject')
    .attr({
        height: 30,
        width: 300, 
        transform: 'translate(60,10)'
     })
     .html('<div><p class="graph-stitle" text-align="center">Median lot size (square feet)</p></div>');
});
})();