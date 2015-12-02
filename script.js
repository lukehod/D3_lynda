/* declare empty variable to hold data */
var barData = [];

/* fill with a random number of random data */
for (var i=0; i<50; i++) {
  barData.push(Math.round(Math.random() * 30 + 5));
}

/* sort barData from smallest to largest */
barData.sort(function compareNumbers(a, b) {
  return a - b;
});

/* margin variable */
var margin = { top: 30, right: 30, bottom: 40, left: 50};

/* declare attribute variables */
var height = 400 - margin.top - margin.bottom,
    width = 600 - margin.left - margin.right,
    barWidth = 50,
    barOffset = 5;

/* var to hold color for returning to normal after mouseoff */
var tempColor;

/* scale color linearly from left to right */
var colors = d3.scale.linear()
    .domain([0, barData.length*0.33, barData.length*0.66, barData.length])
    .range(['#B58929','#C61C6F', '#268BD2', '#85992C']);

/* set y to scale linearly */
var yScale = d3.scale.linear()
    .domain([0, d3.max(barData)])
    .range([0, height]);

/* scale x ordinally */
var xScale = d3.scale.ordinal()
    .domain(d3.range(0, barData.length))
    .rangeBands([0, width], 0.2);

/* tool tip to state value on mousover */
var toolTip = d3.select('body').append('div')
    .style('position','absolute')
    .style('padding','0 10px')
    .style('background','white')
    .style('opacity', 0);

/* chart */
var myChart = d3.select('#chart').append('svg')
    /* set attributes of graph */
    .style('background', '#E7E0CB')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top +margin.bottom)
    /* group into an element */
    .append('g')
    .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
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
        /* set widths and heights */
        .attr('width', xScale.rangeBand())
        .attr('x', function(d, i) {
            return xScale(i);
        })
        .attr('height', 0)
        .attr('y', height)
    /* set mouseover action */
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

/* create verticle axis using special d3 method */
var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10);

/* verticle guide */
var vGuide = d3.select('svg').append('g');
    vAxis(vGuide);
    vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')');
    vGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000" });
    vGuide.selectAll('line')
        .style({ stroke: "#000" });

/* create horizontal axis using special d3 method */
var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d, i) {
        return !(i % (barData.length/5));
    }));

/* horizontal guide */
var hGuide = d3.select('svg').append('g');
    hAxis(hGuide);
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
    hGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000" });
    hGuide.selectAll('line')
        .style({ stroke: "#000" });
