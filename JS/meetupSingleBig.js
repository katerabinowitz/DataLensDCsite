(function() {
var margin = {top: 20, right: 20, bottom: 100, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .4);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#AECCC6", "#F5D7A1"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(".singleBig").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/katerabinowitz/meetupSpeakerGender/master/DC/meetupSingleSum.csv", function(error, data) {
  if (error) throw error;

  var gGroup = d3.keys(data[0]).filter(function(key) { return key !== "g"; });

  data.forEach(function(d) {
    d.gender = gGroup.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.g; }));
  x1.domain(gGroup).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, 10]);

  svg.append("g")
      .attr("id", "xAxis")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll(".tick text")
        .attr("y", 0)
        .attr("x", 10)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start")
        .call(wrap, x1.rangeBand());

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 3)
      .attr("dy", ".5em")
      .style("text-anchor", "end")
      .text("Meetup Speakers");

  var mu = svg.selectAll(".singleBig")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d.g) + ",0)"; });

  mu.selectAll("rect")
      .data(function(d) { return d.gender; })
    .enter().append("rect")
      .attr("width", x1.rangeBand()/3)
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

  mu.selectAll(".dot")
    .data(function(d) { return d.gender; })
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) { return x1(d.name) + x1.rangeBand()/7; })
      .attr("cy", function(d) { return y(d.value); })
      .style("fill", function(d) { return color(d.name); })

  svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate("+width/2+",0)");

  var legendOrdinal = d3.legend.color()
      .shape('circle').shapeRadius(6)
      .orient("horizontal")
      .shapePadding(30)
      .labelOffset(5)
      .scale(color)

  svg.select(".legendOrdinal")
    .call(legendOrdinal)

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = .7, 
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

});
})();