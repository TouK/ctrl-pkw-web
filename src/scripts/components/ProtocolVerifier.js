'use strict';

var React = require('react/addons');
var Imagebox = require('./Imagebox');
var JSONPath = require('JSONPath');
var $ = require('jquery');

require('styles/ProtocolVerifier.less');

var ProtocolVerifier = React.createClass({

    getInitialState: function() {
        return { options: [], imageUrls: [], verificationUrl: null, ballotResult: null };
    },

    fetchBallot: function(ballotUrl) {
        $.ajax({
            url: ballotUrl, dataType: 'json',
            success: function(data) {
                var state = this.state;
                state.options = [];
                data.options.forEach( function(s) {
                    state.options.push(s);
                });
                this.setState(state);
            }.bind(this),
            error: function(xhr, status, err) { console.error(this.props.url, status, err.toString()); }.bind(this)
        });
    },

    fetchImageUrls: function(urlUrls) {

        console.log("Image urls url: " + urlUrls);
        $.ajax({
            type: "GET",
            url: urlUrls,
            success: function (data) {
                var state = this.state;
                this.state.imageUrls = [];
                for (var i in data) {
                    state.imageUrls.push(data[i]);
                }
                this.setState(state);
            }.bind(this)
        })
    },

    reportV: function() {

        $.ajax({
            type: "POST",
            url: this.state.verificationUrl,
            headers: {
                "Authorization":  "Bearer " + this.props.authorization
            },
            data: "\"APPROVAL\"",
            contentType: "application/json",
            success: function (data) {
                this.fetchProtocol();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.verificationUrl, status, err.toString());
                this.fetchProtocol();
            }.bind(this)
        });
    },

    reportX: function() {

        $.ajax({
            type: "POST",
            url: this.state.verificationUrl,
            headers: {
                "Authorization":  "Bearer " + this.props.authorization
            },
            data: '\"DEPRECATION\"',
            contentType: "application/json",
            success: function (data) {
                this.fetchProtocol();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.verificationUrl, status, err.toString());
                this.fetchProtocol();
            }.bind(this)
        });
    },

    fetchProtocol: function() {

        $.ajax({

            url: this.props.url + "protocols?count=1", dataType: 'json', method: 'GET',

            headers: {
                "Authorization":  "Bearer " + this.props.authorization
            },

            success: function(data) {

                var state = this.state;

                state.verificationUrl = JSONPath.eval(data, '$..links[?(@.rel == "verification")].href')[0];
                state.ballotResult = JSONPath.eval(data, '$..ballotResult')[0];
                state.votersEntitledCount = JSONPath.eval(data, '$..ballotResult.votersEntitledCount')[0];
                state.ballotsGivenCount = JSONPath.eval(data, '$..ballotResult.ballotsGivenCount')[0];
                state.votesCastCount = JSONPath.eval(data, '$..ballotResult.votesCastCount')[0];
                state.votesValidCount = JSONPath.eval(data, '$..ballotResult.votesValidCount')[0];

                this.fetchImageUrls(JSONPath.eval(data, '$..links[?(@.rel == "images")].href')[0]);
                this.fetchBallot(JSONPath.eval(data, '$..links[?(@.rel == "ballot")].href')[0]);

                this.setState(state);

            }.bind(this),

            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.fetchProtocol();
    },

    render: function () {
        return (
            <div className="ProtocolVerifier">

                <h1>Czy ten protokół jest poprawny ?</h1>
				<div className="button-container">
					<input className="tak" type="button" value="TAK" onClick={this.reportV}/>
					<input className="nie" type="button" value="NIE" onClick={this.reportX}/>
                </div>
				<div className="Images">
                    {this.state.imageUrls.map(function(item, i) {
                        console.log("Rendering image: " + item);
                        return (
                            <Imagebox className="Image" width="320" imageURL={item}/>
                        );
                    }, this)}
                   
                </div>

                <table className="Protocol">
					
                    <tr><td>Liczba wyborców uprawnionych</td><td className="count">{this.state.votersEntitledCount}</td></tr>
                    <tr><td>Liczba wyborców, którym wydano karty</td><td className="count">{this.state.ballotsGivenCount}</td></tr>
                    <tr><td>Liczba oddanych głosów</td><td className="count">{this.state.votesCastCount}</td></tr>
                    <tr><td>Liczba głosów ważnych</td><td className="count">{this.state.votesValidCount}</td></tr>
                    <tr><td colspan="2">&nbsp;</td></tr>
                    {
                        this.state.options.map(function(item, i) {
                            var votes = this.state.ballotResult.votesCountPerOption[i];
                            return <tr><td>{item}</td><td className="count">{votes}</td></tr>;
                        }, this)
                    }
                </table>
            </div>
        );
    }
});

module.exports = ProtocolVerifier;

