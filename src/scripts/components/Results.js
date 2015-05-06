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
        return { data: {names: [], values: []} };
    },

    fetchOptions: function() {

        $.ajax({
            url: apiURL + "votings/2015-05-10/ballots/1",
            dataType: 'json',
            success: function(data) {
                var state = this.state;
                state.data.names = [];
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
            url: apiURL + "votings/2015-05-10/ballots/1/result",
            dataType: 'json',
            method: 'POST',
            success: function(data) {
                var state = this.state;
                state.data.values = [];
                data.votesCountPerOption.forEach( function(s) {
                    state.data.values.push(1 + s);
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
          <div className='main'>

              <div className="Results">
                <h1>Wyniki</h1>
                <BarChart width="800" height="320" data={this.state.data}/>
              </div>
          </div>
        );
    }
});

module.exports = Results;

