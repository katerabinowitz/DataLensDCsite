(function() {
      var chartWidth       = 350,
        barHeight        = 20,
        gapBetweenGroups = 40,
        spaceForLabels   = 80;

      var x = d3.scale.linear()
        .range([0, chartWidth]);

      d3.csv("https://raw.githubusercontent.com/katerabinowitz/Air-BnB/master/BnBPerCapita.csv", type, function(error, data) {
          x.domain([0, d3.max(data, function(d) { return d.Airpc; })]);

      var chartHeight = barHeight * 13;

      var y = d3.scale.linear()
        .range([chartHeight + gapBetweenGroups, 0]);

      var yAxis = d3.svg.axis()
        .scale(y)
        .tickFormat('')
        .tickSize(0)
        .orient("left");
      var rank = d3.select(".rank").append("svg")
        .attr("width", spaceForLabels + chartWidth)
        .attr("height", chartHeight);
    var bar = rank.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.length))) + ")";
    });
    bar.append("rect")
      .attr("class", "bar")
      .attr("width", function(d) { return x(d.Airpc); })
      .attr("height", barHeight - 1);
    bar.append("text")
      .attr("x", function(d) { return x(d.Airpc-0.4); })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
        .text(function(d) { return (d.Airpc.toFixed(2)); });
    bar.append("text")
      .attr("class", "label")
      .attr("x", function(d) {return - 80; })
      .attr("y", barHeight/2)
      .attr("dy", ".1em")
      .text(function(d) { return d.city; });

    rank.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);
    });

    function type(d) {
      d.Airpc = +d.Airpc; // coerce to number
    return d;
    };
})();