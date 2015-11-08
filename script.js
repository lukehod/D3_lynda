var barData = [];

for (var i=0; i<1000; i++) {
  barData.push(Math.random() * 30)
}

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5,
    yScale = d3.scale.linear()
               .domain([0, d3.max(barData)])
               .range([0, height]),
    xScale = d3.scale.ordinal()
               .domain(d3.range(0, barData.length))
               .rangeBands([0, width]),
    colors = d3.scale.linear()
               .domain([0, barData.length])
               .range(['#FFB832', '#C61C6F']);

d3.select('#chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .selectAll('rect').data(barData)
  .enter().append('rect')
    .style('fill', function(d, i) {
      return colors(i);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('x', function(d, i) {
      return xScale(i);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
