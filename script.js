var barData = [];

for (var i=0; i<50; i++) {
  barData.push(Math.round(Math.random() * 30 + 5))
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

var tempColor;

var toolTip = d3.select('body')
                .append('div')
                .style('position','absolute')
                .style('padding','0 10px')
                .style('background','white')
                .style('opacity', 0)

var myChart = d3.select('#chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .selectAll('rect').data(barData)
  .enter().append('rect')
    .style('fill', function(d, i) {
      return colors(i);
    })
    .attr('width', xScale.rangeBand())
    .attr('x', function(d, i) {
      return xScale(i);
    })
    .attr('height', 0)
    .attr('y', height)
  .on('mouseover', function(d) {
    toolTip.transition()
           .style('opacity', .9)
    toolTip.html(d)
           .style('left', (d3.event.pageX) + 'px')
           .style('top', (d3.event.pageY - 50) + 'px')

    tempColor = this.style.fill;
    d3.select(this)
      .style('opacity', .5)
      .style('fill', 'yellow');
  })
  .on('mouseout', function(d) {
    d3.select(this)
      .style('opacity', 1)
      .style('fill', tempColor);
  })

myChart.transition()
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
    .delay(function(d, i) {
      return i * 20;
    })
    .duration(1000)
    .ease('elastic')
