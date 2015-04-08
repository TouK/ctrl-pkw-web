'use strict';

var React = require('react/addons');
var Imagebox = require('./Imagebox');
var JSONPath = require('JSONPath');
var $ = require('jquery');

require('styles/ProtocolVerifier.less');

var ProtocolVerifier = React.createClass({

    getInitialState: function() {
        return { image: null, verification: null, ballot: null, reported: false };
    },

    reportV: function() {

        $.ajax({
            type: "POST",
            url: this.state.verification,
            data: 'APPROVAL',
            contentType: "application/json",
            success: function (data) {

                this.state.reported = true;
                this.fetchProtocol();

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.verification, status, err.toString());
                this.fetchProtocol();
            }.bind(this)
        });
    },

    reportX: function() {

        $.ajax({
            type: "POST",
            url: this.state.verification,
            data: 'DEPRECATION',
            contentType: "application/json",
            success: function (data) {

                this.state.reported = true;
                this.fetchProtocol();

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.verification, status, err.toString());
                this.fetchProtocol();
            }.bind(this)
        });
    },

    fetchProtocol: function() {

        $.ajax({
            url: this.props.url + "protocols?count=1", dataType: 'json', method: 'GET',
            success: function(data) {

                this.state.image = JSONPath.eval(data, '$..links[?(@.rel == "img")].href')[0];
                this.state.verification = JSONPath.eval(data, '$..links[?(@.rel == "verification")].href')[0];
                this.state.ballot = JSONPath.eval(data, '$..links[?(@.rel == "ballot")].href')[0];

                this.state.reported = false;

            }.bind(this),
            error: function(xhr, status, err) { console.error(this.props.url, status, err.toString()); }.bind(this)
        });
    },

    componentDidMount: function() {
        this.fetchProtocol();
    },

    render: function () {
        return (
            <div>
                <h1>Czy ten protokół jest poprawny ?</h1>
                <Imagebox width="800" height="600" imageURL={this.state.image} />
                <input type="button" value="V" onClick={this.reportV}/>
                <input type="button" value="X" onClick={this.reportX}/>

            </div>
        );
    }
});

module.exports = ProtocolVerifier;

