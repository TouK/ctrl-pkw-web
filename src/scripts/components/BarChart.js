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
            <div className="chart">
                {this.props.children}
            </div>
        );
    }
});

var Bar = React.createClass({

    getDefaultProps: function() {
        return {
            width: 0,
            value: 0
        };
    },

    render: function() {

        var percentage = d3.format(".1%");

        var barStyle = {
            backgroundColor: this.props.color,
            width: percentage(this.props.width)
        };

        return (
            <div className='item'>
                <div className="name">{this.props.name}</div>
                <div className="value">{percentage(this.props.value)}</div>
                <div className="bar"><div className='value' style={barStyle}/></div>
            </div>
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
            .range(colorbrewer.Paired[d3.min([this.props.data.values.length,11])]);

        var xScale = d3.scale.linear()
            .domain([0, d3.max(this.props.data.values)])
            .range([0, 1]);

        var val = d3.scale.linear()
            .domain([0, d3.sum(this.props.data.values)])
            .range([0, 1]);

        var bars = _.map(this.props.data.values, function(point, i) {
            return (
                <Bar name={props.data.names[i]} width={xScale(point)} value={val(point)} color={cScale(i)}/>
            );
        });

        return (
            <div className='list data-series'>{bars}</div>
        );
    }
});

var Attendance = React.createClass({

    getDefaultProps: function() {
        return {
            data: []
        };
    },

    render: function() {

        var data = this.props.data;

        var val = d3.scale.linear()
            .domain([0, data.votersEntitledCount])
            .range([0, 1]);

        return (
            <div className='list attendance'>
                <Bar name='Frekwencja' width={val(data.ballotsGivenCount)} value={val(data.ballotsGivenCount)} color={colorbrewer.Paired[3][2]}/>
            </div>
        );
    }
});

var Validity = React.createClass({

    getDefaultProps: function() {
        return {
            data: []
        };
    },

    render: function() {

        var data = this.props.data;

        var val = d3.scale.linear()
            .domain([0, data.votesCastCount])
            .range([0, 1]);

        return (
            <div className='list validity'>
                <Bar name='Liczba głosów ważnych' width={val(data.votesValidCount)} value={val(data.votesValidCount)} color={colorbrewer.Paired[3][1]}/>
            </div>
        );
    }
});

var BarChart = React.createClass({
    render: function() {
        return (
            <Chart>
                <div className='title'>{this.props.data.title}</div>
                <DataSeries data={this.props.data}/>
                <Validity data={this.props.data}/>
                <Attendance data={this.props.data}/>
                <div className='credits'>
                    <div className='logo'/>
                    <div className='logo2'/>
                </div>
            </Chart>
        );
    }
});

module.exports = BarChart;

