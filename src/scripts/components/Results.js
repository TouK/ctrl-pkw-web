'use strict';

var React = require('react/addons');
var BarChart = require('./BarChart');
var $ = require('jquery');

require('styles/Results.less');

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
                    state.data.values.push(Math.random() * 100 + s);
                });
                this.setState(state);
            }.bind(this),
            error: function(xhr, status, err) { console.error(this.props.url, status, err.toString()); }.bind(this)
        });
    },

    componentDidMount: function() {
        this.fetchOptions();
        this.fetchResults();
        setInterval(this.fetchResults, 60000);
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

