/* declare empty variable to hold data */
var barData = [];

/* fill with a random number of random data */
for (var i=0; i<(Math.random()*100 + 5); i++) {
  barData.push(Math.round(Math.random() * 30 + 5));
}

/* sort barData from smallest to largest */
barData.sort(function compareNumbers(a, b) {
  return a -b;
});

/* declare attribute variables */
var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5,
    /* set y to scale linearly */
    yScale = d3.scale.linear()
               .domain([0, d3.max(barData)])
               .range([0, height]),
    /* scale x ordinally */
    xScale = d3.scale.ordinal()
               .domain(d3.range(0, barData.length))
               .rangeBands([0, width]),
    /* scale color linearly from left to right */
    colors = d3.scale.linear()
               .domain([0, barData.length])
               .range(['#FFB832', 'maroon']);
/* var to hold color for returning to normal after mouseoff */
var tempColor;

/* tool tip to state value on mousover */
var toolTip = d3.select('body')
                .append('div')
                .style('position','absolute')
                .style('padding','0 10px')
                .style('background','white')
                .style('opacity', 0);

/* chart */
var myChart = d3.select('#chart')
  /* add svg to chart div */
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  /* group into an element */
  .append('g')
  /* select rects you create after enter() */
  .selectAll('rect')
  /* use barData */
  .data(barData)
  .enter()
    .append('rect')
    /* fill according to color scale */
    .style('fill', function(d, i) {
      return colors(i);
    })
    /*  */
    .attr('width', xScale.rangeBand())
    .attr('x', function(d, i) {
      return xScale(i);
    })
    .attr('height', 0)
    .attr('y', height)
  .on('mouseover', function(d) {
    toolTip.transition()
           .style('opacity', 0.9);
    toolTip.html(d)
           .style('left', (d3.event.pageX) + 'px')
           .style('top', (d3.event.pageY - 50) + 'px');

    tempColor = this.style.fill;
    d3.select(this)
      .style('opacity', 0.5)
      .style('fill', 'yellow');
  })
  .on('mouseout', function(d) {
    toolTip.transition()
           .style('opacity', 0);

    d3.select(this)
      .style('opacity', 1)
      .style('fill', tempColor);
  });

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
    .ease('elastic');

/* Create a new scale to use for the axis */
var vGuideScale = d3.scale.linear()
    .domain([0, d3.max(barData)])
    .range([height, 0]);

/* create axis using special d3 method */
var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10);

var vGuide = d3.select('svg').append('g');
    vAxis(vGuide);
    vGuide.attr('transform', 'translate(35, 0)');
    vGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000" });
    vGuide.selectAll('line')
        .style({ stroke: "#000" });
