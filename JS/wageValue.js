var width = 500,
  height = 450,
  svg = d3.select('#countyMap').append('svg')
    .attr('width', width)
    .attr('height', height)
  dataFormat = {
    percentage: d3.format('%'),
    num: d3.format('$,.4r'),
    numLegend: d3.format('$,.2s'),
  },

  dataPath = 'https://raw.githubusercontent.com/katerabinowitz/DC-Demographics/master/realPersonalIncome/rpiSpend.csv',
  legendDataType = dataFormat.numLegend,
  tooltipDataType = dataFormat.num,
  countyId = 'county',
  countyName = 'name',
  stateID = '',
  stateName = '',
  observation = 'realPersonalIncome',
  rangeTruncated = true,

  min = 25000,
  max = 45000, 
  steps = 5, 
  increment = (max - min) / (steps - 1),

  borderColor = '#fff', 
  noDataColor = '#ddd', 
  lowBaseColor = '#371C28', 
  highBaseColor = '#2ECFC3';

var colors = [],
  scaleColor = d3.scale.linear()
    .domain([0, steps - 1])
    .range([lowBaseColor, highBaseColor])
    .interpolate(d3.interpolateHcl); 

for (var c = 0; c < steps; c++) {
  colors.push(scaleColor(c));
}

var tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('opacity', 0);

var projection = d3.geo.albersUsa()
  .scale(width * 1.2)
  .translate([width / 2, height - height * 0.6]);

var path = d3.geo.path()
  .projection(projection);

var mapColor = d3.scale.quantize()
  .domain([min, max + increment]) 
  .range(colors);

var map = svg.append('g')
  .attr('class', 'counties');

var legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform', 'translate(0,' + (height - height * 0.1) + ')');

queue()
  .defer(d3.json, 'https://raw.githubusercontent.com/TaxFoundation/interactive-us-county-maps/master/data/us.json')
  .defer(d3.csv, dataPath)
  .await(ready);


function ready(error, us, data) {
  if (error) return console.error(error);

  map.selectAll('path')
    .data(topojson.feature(us, us.objects.counties).features)
  .enter().append('path')
    .attr('d', path)
    .attr('fill', noDataColor)
    .attr('id', function (d) { return 'county' + d.id; });

  data.forEach(function (d) {
    d3.select('#county' + d[countyId])
      .style('fill', mapColor(parseFloat(d[observation])))
      .on('mouseover', function () { return addTooltip(d[countyName], parseFloat(d[observation])); })
      .on('mouseout', function (d) { tooltip.transition().duration(200).style('opacity', 0); });
  });

  map.append('path')
    .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
    .attr('fill', 'none')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .attr('d', path);

  drawLegend();
}

var adjustment = d3.scale.linear()
        .domain([0, width])
        .range([0, 150]);

function addTooltip(label, number) {
  tooltip.transition()
  .duration(200)
  .style('opacity', 0.9);
  tooltip.html(
  label + ': ' + (number ? tooltipDataType(number) : 'No Data')
  )
  .style('left', (d3.event.pageX - adjustment(d3.event.pageX)) + 'px')
  .style('top', (d3.event.pageY + 50) + 'px');
}

function drawLegend() {
  var legendData = [{'color': noDataColor, 'label': 'No Data'}],
    legendDomain = [],
    legendScale,
    legendAxis;

  if (rangeTruncated) {
    for (var i = 0, j = colors.length; i < j; i++) {
      var fill = colors[i];
      var label = legendDataType(min + increment * i) + ((i === j - 1) ? '+' : '-' + legendDataType(min + increment * (i + 1)));
      legendData[i + 1] = { color: fill, label: label };
    }
  } else {
    for (var i = 0, j = colors.length; i < j; i++) {
      var fill = colors[i];
      var label = legendDataType(min + increment * i);
      legendData[i + 1] = { color: fill, label: label };
    }
  }

  for (var k = 0, x = legendData.length; k < x; k++) {
    legendDomain.push(legendData[k].label);
  }

  legendScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2)
    .domain(legendDomain);

  legendAxis = d3.svg.axis()
    .scale(legendScale)
    .orient('bottom');

  legend.call(legendAxis);

  legend.selectAll('rect')
    .data(legendData)
  .enter()
    .append('rect')
    .attr('x', function (d) {return legendScale(d.label);})
    .attr('y', -30)
    .attr('height', 30)
    .attr('class', 'legend-item')
    .transition()
    .duration(700)
    .attrTween('width', function () {return d3.interpolate(0, legendScale.rangeBand());})
    .attrTween('fill', function (d) {return d3.interpolate('#fff', d.color);});
}