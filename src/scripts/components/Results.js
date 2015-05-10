'use strict';

var React              = require('react/addons');
var BarChart           = require('./BarChart');
var $                  = require('jquery');
var Router             = require('react-router');
var Link               = Router.Link;
var RouteHandler       = Router.RouteHandler;

require('styles/Results.less');

var apiURL = 'https://ctrlpkw.touk.pl/api/';

var Results = React.createClass({

    getInitialState: function() {
        return { data: {names: [], values: [], title: 'Wynik wyborów na Prezydenta Rzeczypospolitej Polskiej'} };
    },

    fetchOptions: function() {

        $.ajax({
            url: apiURL + "votings/2010-06-20/ballots/1",
            dataType: 'json',
            success: function(data) {
                var state = this.state;
                state.data.names = [];
                //state.data.title = data.title;
                data.options.forEach( function(s) {
                    state.data.names.push(s);
                });
                this.setState(state);
            }.bind(this),
            error: function(xhr, status, err) { console.error(this.props.url, status, err.toString()); }.bind(this)
        });
    },

    fetchResults: function() {

        $.ajax({
            url: apiURL + "votings/2010-06-20/results/ballots/1",
            dataType: 'json',
            success: function(data) {
                var state = this.state;
                state.data.values = [];
                data.votesCountPerOption.forEach( function(s) {
                    state.data.values.push(s);
                });
                state.data.votesCastCount = data.votesCastCount;
                state.data.votesValidCount = data.votesValidCount;

                state.data.votersEntitledCount = data.votersEntitledCount;
                state.data.ballotsGivenCount = data.ballotsGivenCount;

                this.setState(state);
            }.bind(this),
            error: function(xhr, status, err) { console.error(this.props.url, status, err.toString()); }.bind(this)
        });
    },

    componentDidMount: function() {
        this.fetchOptions();
        this.fetchResults();
        setInterval(this.fetchResults, 6000);
    },

    render: function () {
      return (
          <div className="scores">
            <BarChart data={this.state.data}/>
          </div>
        );
    }
});

module.exports = Results;

