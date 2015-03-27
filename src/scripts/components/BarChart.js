'use strict';

//Chart taken/branched from blogpost - http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/
//Usage <BarChart width="800" height="320" data={this.state.data}/>
//data must contain array of values and array of names

var React = require('react/addons');
var d3 = require('d3');
var _ = require('underscore');
var colorbrewer = require('colorbrewer');

require('styles/BarChart.less');

var Chart = React.createClass({
    render: function() {
        return (
            <svg className="chart" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height}>
                {this.props.children}
            </svg>
        );
    }
});

var Bar = React.createClass({

    getDefaultProps: function() {
        return {
            width: 0,
            height: 0,
            offset: 0
        };
    },

    render: function() {
        return (
            <g>
                <text x="5" y={this.props.offset + this.props.height - 2} className="label">{this.props.name}</text>
                <rect fill={this.props.color} width={this.props.width} height={this.props.height} y={this.props.offset} x={this.props.availableWidth / 3} />
            </g>
        );
    }
});


var DataSeries = React.createClass({

    getDefaultProps: function() {
        return {
            title: '',
            data: []
        };
    },

    render: function() {

        var props = this.props;

        var cScale = d3.scale.ordinal()
            .domain(d3.range(this.props.data.values.length))
            .range(colorbrewer.RdBu[9]);

        var xScale = d3.scale.linear()
            .domain([0, d3.max(this.props.data.values)])
            .range([0, this.props.width]);

        var yScale = d3.scale.ordinal()
            .domain(d3.range(this.props.data.values.length))
            .rangeRoundBands([0, this.props.height], 0.20);

        var bars = _.map(this.props.data.values, function(point, i) {
            return (
                <Bar name={props.data.names[i]} height={yScale.rangeBand()} width={xScale(point)} offset={yScale(i)} availableWidth={props.width} color={cScale(i)} key={i} />
            );
        });

        return (
            <g>{bars}</g>
        );
    }
});

var BarChart = React.createClass({
    render: function() {
        return (
            <Chart width={this.props.width} height={this.props.height}>
                <DataSeries data={this.props.data} width={this.props.width} height={this.props.height} />
            </Chart>
        );
    }
});

module.exports = BarChart;

