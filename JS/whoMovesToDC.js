
var margin = {top: 40, right: 40, bottom: 60, left: 40},
    width = 550 - margin.left - margin.right,
    height =  380- margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .05);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .outerTickSize(0)
    .orient("left");

var cex = d3.select(".cex").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-Demographics/master/cityMobilityStats.csv", type, function(error, data) {
  data.sort(function(a, b) { return b.Age20s - a.Age20s; });
  x.domain(data.map(function(d) {return d.City; }));
  y.domain([0, d3.max(data, function(d) { return d.Age20s; })]);

  cex.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".05em")
      .attr("transform", "rotate(50)")
      .style("text-anchor", "start");;
  cex.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  cex.append("text")
        .attr('class', 'd3title')
        .attr("x", (width / 2))             
        .attr("y", 0 - margin.top/1.5)
        .attr("text-anchor", "middle")  
        .text("Nearly half of the District's New Residents in their 20s");

  cex.append("text")
        .attr('class', 'd3subtitle')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .text("New Residents in their 20's (%)");

  cex.append("text")
    .attr("text-anchor", "end")
    .attr("y", 9)
    .attr("dy", "-4.5em")
    .attr("transform", "rotate(-90)")
        .text("% of New Residents");

  cex.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("class", "bar")
      .style("fill", function(d, i){return d.City=="Washington"?"orange":"#53CFCF";})
      .attr("x", function(d) { return x(d.City); })
      .attr("y", function(d) { return y(d.Age20s); })
      .attr("height", function(d) { return height - y(d.Age20s); })
      .attr("width", x.rangeBand())
         
});
function type(d) {
  d.Age20s = +d.Age20s;
  return d;
}
function MarryData() {
     d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-Demographics/master/cityMobilityStats.csv", function(error, data) {
      data.sort(function(a, b) { return b.married - a.married; });
      x.domain(data.map(function(d) {return d.City; }));
      y.domain([0, d3.max(data, function(d) { return d.married; })]);

      
    var sel = cex.selectAll("rect")
         .data(data);
    sel.exit().remove();
    d3.select(".y.axis").remove();
    d3.select(".x.axis").remove();
    d3.select(".d3title").remove();
    d3.select(".d3subtitle").remove();
    sel.enter().append("rect")
      sel.attr("class", "bar")
      sel.attr("x", function(d) { return x(d.City); })
      sel.attr("y", function(d) { return y(d.married); })
      sel.attr("height", function(d) { return height - y(d.married); })
      .style("fill", function(d, i){return d.City=="Washington"?"orange":"#53CFCF";})

    cex.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    cex.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", "0.5em")
      .attr("transform", "rotate(50)")
      .style("text-anchor", "start");;

      cex.append("text")
        .attr('class', 'd3title')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top/1.5))
        .attr("text-anchor", "middle")  
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")       
        .attr("fill", "gray")
        .text("New Residents to DC Among Least Likely to be Married");

      cex.append("text")
        .attr('class', 'd3subtitle')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .text("New Residents that are Married (%)");

function type(d) {
d.married = +d.married;
return d;}
}
)};

function genderData() {
    d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-Demographics/master/cityMobilityStats.csv", function(error, data) {
      data.sort(function(a, b) { return b.female - a.female; });
      x.domain(data.map(function(d) {return d.City; }));
      y.domain([30, d3.max(data, function(d) { return d.female; })]);

      
    var sel = cex.selectAll("rect")
         .data(data);
    sel.exit().remove();
    d3.select(".y.axis").remove();
    d3.select(".x.axis").remove();
    d3.select(".d3title").remove();
    d3.select(".d3subtitle").remove();
    sel.enter().append("rect")
      sel.attr("class", "bar")
      sel.attr("x", function(d) { return x(d.City); })
      sel.attr("y", function(d) { return y(d.female); })
      sel.attr("height", function(d) { return height - y(d.female); })
      .style("fill", function(d, i){return d.City=="Washington"?"orange":"#53CFCF";})

    cex.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    cex.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".05em")
      .attr("transform", "rotate(50)")
      .style("text-anchor", "start");;

      cex.append("text")
        .attr('class', 'd3title')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top/1.5))
        .attr("text-anchor", "middle")  
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")       
        .attr("fill", "gray")
        .text("DC Attracts the Highest Proportion of Women");

      cex.append("text")
        .attr('class', 'd3subtitle')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .text("New Residents that are Women (%)");

function type(d) {
d.female = +d.female;
return d;}
}
)};

function above75Data() {
    d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-Demographics/master/cityMobilityStats.csv", function(error, data) {
      data.sort(function(a, b) { return b.above75K - a.above75K; });
      x.domain(data.map(function(d) {return d.City; }));
      y.domain([0, 25]);
      
    var sel = cex.selectAll("rect")
         .data(data);
    sel.exit().remove();
    d3.select(".y.axis").remove();
    d3.select(".x.axis").remove();
    d3.select(".d3title").remove();
    d3.select(".d3subtitle").remove();
    sel.enter().append("rect")
      sel.attr("class", "bar")
      sel.attr("x", function(d) { return x(d.City); })
      sel.attr("y", function(d) { return y(d.above75K); })
      sel.attr("height", function(d) { return height - y(d.above75K); })
      .style("fill", function(d, i){return d.City=="Washington"?"orange":"#53CFCF";})

    cex.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    cex.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".05em")
      .attr("transform", "rotate(50)")
      .style("text-anchor", "start");;

    cex.append("text")
        .attr('class', 'd3title')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top/1.5))
        .attr("text-anchor", "middle")  
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")       
        .attr("fill", "gray")
        .text("DC Second in Proportion of Wealthy New Residents");

    cex.append("text")
        .attr('class', 'd3subtitle')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .text("New residents with previous year income over $75,000 (%)");

function type(d) {
d.above75K = +d.above75K;
return d;}
}
)};

function eduData() {
    d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-Demographics/master/cityMobilityStats.csv", function(error, data) {
      data.sort(function(a, b) { return b.BAplus - a.BAplus; });
      x.domain(data.map(function(d) {return d.City; }));
      y.domain([0, d3.max(data, function(d) { return d.BAplus; })]);
      
    var sel = cex.selectAll("rect")
         .data(data);
    sel.exit().remove();
    d3.select(".y.axis").remove();
    d3.select(".x.axis").remove();
    d3.select(".d3title").remove();
    d3.select(".d3subtitle").remove();
    sel.enter().append("rect")
      sel.attr("class", "bar")
      sel.attr("x", function(d) { return x(d.City); })
      sel.attr("y", function(d) { return y(d.BAplus); })
      sel.attr("height", function(d) { return height - y(d.BAplus); })
      .style("fill", function(d, i){return d.City=="Washington"?"orange":"#53CFCF";})

    cex.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    cex.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".05em")
      .attr("transform", "rotate(50)")
      .style("text-anchor", "start");;

    cex.append("text")
        .attr('class', 'd3title')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top/1.5))
        .attr("text-anchor", "middle")  
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")       
        .attr("fill", "gray")
        .text("New DC Residents Among the Most Highly Educated");

    cex.append("text")
        .attr('class', 'd3subtitle')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .text("New Residents with at least a Bachelors Degree (%)");

function type(d) {
d.BAplus = +d.BAplus;
return d;}
}
)};

function ageData() {
    d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-Demographics/master/cityMobilityStats.csv", function(error, data) {
      data.sort(function(a, b) { return b.Age20s - a.Age20s; });
      x.domain(data.map(function(d) {return d.City; }));
      y.domain([0, d3.max(data, function(d) { return d.Age20s; })]);
      
    var sel = cex.selectAll("rect")
         .data(data);
    sel.exit().remove();
    d3.select(".y.axis").remove();
    d3.select(".x.axis").remove();
    d3.select(".d3title").remove();
    d3.select(".d3subtitle").remove();
    sel.enter().append("rect")
      sel.attr("class", "bar")
      sel.attr("x", function(d) { return x(d.City); })
      sel.attr("y", function(d) { return y(d.Age20s); })
      sel.attr("height", function(d) { return height - y(d.Age20s); })
      .style("fill", function(d, i){return d.City=="Washington"?"orange":"#53CFCF";})

    cex.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    cex.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".05em")
      .attr("transform", "rotate(50)")
      .style("text-anchor", "start");;

  cex.append("text")
        .attr('class', 'd3title')
        .attr("x", (width / 2))             
        .attr("y", 0 - margin.top/1.5)
        .attr("text-anchor", "middle")  
        .text("Nearly half of the District's New Residents in their 20s");

  cex.append("text")
        .attr('class', 'd3subtitle')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .text("New Residents in their 20's (%)");

function type(d) {
  d.Age20s = +d.Age20s;
  return d;}
}
)};