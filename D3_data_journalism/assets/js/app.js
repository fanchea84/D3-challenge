// @TODO: YOUR CODE HERE!
// Load data from data.csv
d3.csv("assets/data/data.csv").then(function (journalismData) {
    console.log(journalismData);
    // log a list of ages
    var ages = journalismData.map(data => data.age);
    console.log("ages", ages);
    // log a list of income
    var income = journalismData.map(data => data.income);
    console.log("income", income);

    // Start buildling out the chart
    // SVG wrapper dimensions are determined by the current width & height of the browser window.
    var svgWidth = 1200;
    var svgHeight = 660;

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // append svg and group
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scales
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(ages)])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(income)])
        .range([height, 0]);

    // line generator
    var line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

    // append circles to data points
    var circlesGroup = chartGroup.selectAll("circle")
        .data(ages)
        .enter()
        .append("circle")
        .attr("r", "10") // r dictates radius
        .attr("fill", "red");

    // Event listeners with transitions
    circlesGroup.on("mouseover", function () {
        d3.select(this)
            .transition()
            .duration(1000)
            .attr("r", 20)
            .attr("fill", "lightblue");
    })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", 10)
                .attr("fill", "red");
        });

    // transition on page load
    chartGroup.selectAll("circle")
        .transition()
        .duration(2000)
        .attr("cx", (d, i) => xScale(i))  // lookup CX and CY on MDN, it's driving how the circles get placed
        .attr("cy", d => yScale(d));


}
    , function (error) {
        console.log(error);
    });


// RESOURCE FOR SVG: https://developer.mozilla.org/en-US/docs/Web/SVG
// RESOURCE FOR SVG ELEMENTS: https://developer.mozilla.org/en-US/docs/Web/SVG/Element
// RESOURCE FOR SVG ATTRIBUTES: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
// RESOURCE FOR SVG <G>: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
// RESOURCE FROM D3 CLASS: https://oregon.bootcampcontent.com/Oregon_Coding_Bootcamp/uofo-por-data-pt-09-2020-u-c/-/blob/master/16-D3/3/Activities/08-Stu_Transitions/Solved/app.js
// NEXT STEPS: Look @ other class activities that use the CX and CY in rows 78-79