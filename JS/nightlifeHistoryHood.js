
var margin = {top: 30, right: 20, bottom: 40, left: 120},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg = d3.select(".slopeBar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g").attr("transform", "translate(0," + 0 + ")")

d3.csv("https://raw.githubusercontent.com/katerabinowitz/DC-FoodandDrink/master/nightlifeHistory/nightlifeHoodCount0816.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
      d.yr08 = +d.yr08;
      d.yr16 = +d.yr16;

      d.shortList = 0;

      if (d.NBH_VSHORT === 'Shaw' || d.NBH_VSHORT === 'Logan Circle' || d.NBH_VSHORT === 'Bloomingdale' || 
          d.NBH_VSHORT === 'Dupont, K St.' || d.NBH_VSHORT === 'Chinatown') 
            {d.shortList = 1}
  }); 

  var y = d3.scaleLinear()
            .range([height, margin.top]);

  y.domain([0, (d3.max(data, function (d) { return d.yr16; } ) + 5)])


  var lines = g.selectAll('line')
                .data(data);

                    
  lines.enter().append('line')
        .attr("y1", function(d) { return y(d.yr08); })
        .attr("y2", function(d) { return y(d.yr16); })
        .attr("x1", margin.left)
        .attr("x2", width)
        .style("stroke-width", 1)
        .style("stroke", function (d) {if (d.shortList == 1) {return '#6639A6'} else {return '#cccccc'} })
        .attr("class", function (d, i) { return 'loLine line select-' + i; })
        .on('mouseover', function (d, i) {
            d3.selectAll('.loLabel').style('opacity', 0);
            d3.selectAll('.someLabels').style('opacity', 0.2);
            d3.selectAll('.loLine').style('stroke', '#cccccc');

            d3.selectAll('.line.select-' + i).style('stroke', '#6639A6');
            d3.selectAll('.showLabel.select-' + i).style('opacity', 1);
        })
        .on('mouseout', function (d, i) {
            d3.selectAll('.line.select-' + i).transition().delay(3000).style('stroke', '#cccccc');
            d3.selectAll('.showLabel.select-' + i).transition().delay(3000).style('opacity', 0);
        }); 

  labelData = data.filter(function (d) { return d.shortList === 1})

  var someLabels = g.selectAll('.labels')
                    .data(labelData);
                    
  someLabels.enter().append('text')
                    .attr("x", width)
                    .attr("y", function(d) { return y(d.yr16) + 4; })
                    .attr("class", "someLabels")
                    .text(function (d) {
                        return d.yr16;
                    })
                    .style('text-anchor','start');

  var someLabelsLeft = g.selectAll('.labels')
                         .data(labelData);
                    
  someLabelsLeft.enter().append('text')
                .attr("x", margin.left)
                .attr("y", function(d) { return y(d.yr08) + 4; })
                .attr("class", "someLabels")
                .text(function (d) {
                      return d.NBH_VSHORT + ' ' + d.yr08;
                })
                .style('text-anchor','end');

  var rightLabels = g.selectAll('.labels')
                      .data(data);
                    
  rightLabels.enter().append('text')
                    .attr("x", width)
                    .attr("y", function(d) { return y(d.yr16) + 4; })
                    .text(function (d) {
                        return d.yr16;
                    })
                    .style('text-anchor','start')
                    .style('fill', '#6639A6')
                    .style('opacity', 0)
                    .attr("class", function (d, i) { return 'loLabel showLabel select-' + i; })
                    .on('mouseover', function (d, i) {
                        d3.selectAll('.loLabel').style('opacity', 0);
                        d3.selectAll('.someLabels').style('opacity', 0.2);
                        d3.selectAll('.loLine').style('stroke', '#cccccc');

                        d3.selectAll('.line.select-' + i).style('stroke', '#6639A6');
                        d3.selectAll('.showLabel.select-' + i).style('opacity', 1);
                    })
                    .on('mouseout', function (d, i) {
                        d3.selectAll('.line.select-' + i).transition().delay(3000).style('stroke', '#cccccc');
                        d3.selectAll('.showLabel.select-' + i).transition().delay(3000).style('opacity', 0);
                    }); 



   var leftLabels = g.selectAll('.left-labels')
                    .data(data);

   leftLabels.enter().append('text')
                    .attr("x", margin.left)
                    .attr("y", function(d) { return y(d.yr08) + 4; })
                    .text(function (d) {
                        return d.yr08;
                    })
                    .style('text-anchor','end')
                    .style('fill', '#6639A6')
                    .style('opacity', 0)
                    .attr("class", function (d, i) { return 'loLabel label select-' + i; })
                    .on('mouseover', function (d, i) {
                        d3.selectAll('.loLabel').style('opacity', 0);
                        d3.selectAll('.someLabels').style('opacity', 0.2);
                        d3.selectAll('.loLine').style('stroke', '#cccccc');

                        d3.selectAll('.line.select-' + i).style('stroke', '#6639A6');
                        d3.selectAll('.showLabel.select-' + i).style('opacity', 1);
                    })
                    .on('mouseout', function (d, i) {
                        d3.selectAll('.line.select-' + i).transition().delay(3000).style('stroke', '#cccccc');
                        d3.selectAll('.showLabel.select-' + i).transition().delay(3000).style('opacity', 0);
                    });

   var topLabels = g.selectAll('.top-labels')
                    .data(data);

   topLabels.enter().append('text')
                    .attr("x", (width + margin.right + margin.left) / 2)
                    .attr("y", margin.top / 2)
                    .text(function (d) {
                        return d.NBH_SHORT;
                    })
                    .style('text-anchor','middle')
                    .style('opacity', 0)
                    .attr("class", function (d, i) { return 'loLabel showLabel select-' + i; })

  var leftTitle = g.append('text')
                    .attr('class', 'leftTitle')
                    .attr('x', margin.left)
                    .attr('y', height + (margin.bottom / 2))
                    .text('2008')
                    .style('text-anchor','end');

   var rightTitle = g.append('text')
                        .attr('class', 'rightTitle')
                        .attr('x', width + (margin.right / 2))
                        .attr('y', height + (margin.bottom / 2))
                        .text('2016')
                        .style('text-anchor','end');
});