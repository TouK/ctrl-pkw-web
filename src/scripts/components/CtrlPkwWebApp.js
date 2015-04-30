'use strict';

var React = require('react/addons');
var Imagebox = require('./Imagebox');
var Results = require('./Results');
var ProtocolVerifier = require('./ProtocolVerifier');

var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');
var apiURL = 'https://ctrlpkw.touk.pl/api/';

var CtrlPkwWebApp = React.createClass({

    getInitialState: function() {
        return { authorization: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNGZlMThiYS1lYzViLTRlYzEtYTY4ZC1iNTgwZmE4NGQ5NjciLCJpYXQiOjE0MzAzODI3ODksInN1YiI6Imh0dHBzOi8vYXBpLnN0b3JtcGF0aC5jb20vdjEvYWNjb3VudHMvMnVrR2hwRTVza2o2VzZlMTVkUXN4YSIsImV4cCI6MTQzMDY0MTk4OX0.3rAckOMik9-wJdOVjC7gVdmaEPZe00a-7KlNnrB8dkU" };
    },

    handleAuthorizationChange: function(event) {
        this.setState( { authorization: event.target.value } );
    },

  render: function() {
    return (
      <div className='main'>
        <span>
            Authorization from Cookie:
            <input type="text" name="authorization" value={this.state.authorization} onChange={this.handleAuthorizationChange} />
        </span>
        <ReactTransitionGroup transitionName="fade">
          <Imagebox imageURL={imageURL} />
          <Results url={apiURL} />
          <ProtocolVerifier url={apiURL} authorization={this.state.authorization} />
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = CtrlPkwWebApp;
