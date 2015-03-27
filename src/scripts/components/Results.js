'use strict';

var React = require('react/addons');
var $ = require('jquery');
var d3 = require('d3');
var _ = require('underscore');
var colorbrewer = require('colorbrewer');

require('styles/Results.less');

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


var Results = React.createClass({

    getInitialState: function() {
        return { data: {names: [], values: []} };
    },

    fetchOptions: function() {

        $.ajax({
            url: this.props.url + "votings/2010-06-20/ballots/1", dataType: 'json',
            success: function(data) {
                var state = this.state;
                state.data.names = [];
                data.options.forEach( function(s) {
                    state.data.names.push(s);
                    //console.debug(s);
                });
                this.setState(state);
            }.bind(this),
            error: function(xhr, status, err) { console.error(this.props.url, status, err.toString()); }.bind(this)
        });
    },

    fetchResults: function() {

        $.ajax({
            url: this.props.url + "votings/2010-06-20/ballots/1/result", dataType: 'json', method: 'POST',
            success: function(data) {
                var state = this.state;
                state.data.values = [];
                data.votesCountPerOption.forEach( function(s) {
                    //console.debug(s);
                    //TODO wyrzucić random
                    state.data.values.push(Math.random() * 1000000000 + s);
                });
                this.setState(state);
            }.bind(this),
            error: function(xhr, status, err) { console.error(this.props.url, status, err.toString()); }.bind(this)
        });
    },

    componentDidMount: function() {
        this.fetchOptions();
        this.fetchResults();
        setInterval(this.fetchResults, 1000);
    },

    render: function () {
      return (
          <div className="Results">
            <h1>Wyniki</h1>
            <BarChart width="800" height="320" data={this.state.data}/>
          </div>
        );
    }
});

module.exports = Results;

