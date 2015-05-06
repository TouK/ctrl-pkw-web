'use strict';

var React              = require('react/addons');
var Results            = require('./Results');
var ProtocolVerifier   = require('./ProtocolVerifier');
var Router             = require('react-router');
var Route              = require('react');
var Location           = Router.Location;
var Link               = Router.Link;
var RouteHandler       = Router.RouteHandler;

var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var apiURL = 'https://ctrlpkw.touk.pl/api/';

var Verification = React.createClass({

    getInitialState: function() {
        return { authorization: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NzBjM2U2MS0zOTcxLTQ0M2EtODM2MS02ODg0ZmIzNzVlZTQiLCJpYXQiOjE0MzA3MjY4MTIsInN1YiI6Imh0dHBzOi8vYXBpLnN0b3JtcGF0aC5jb20vdjEvYWNjb3VudHMvMnVrR2hwRTVza2o2VzZlMTVkUXN4YSIsImV4cCI6MTQzMDk4NjAxMn0.WFk43t3BD01-NeUicAThlbTnUUG1V2_1i1yFUgAI5ek" };
    },

    handleAuthorizationChange: function(event) {
        this.setState( { authorization: event.target.value } );
    },

  render: function() {
    return (
      <div className='main'>

        <span className="authorization">
            Authorization from Cookie:
            <input type="text" name="authorization" value={this.state.authorization} onChange={this.handleAuthorizationChange} />
        </span>

        <ReactTransitionGroup transitionName="fade">
          <ProtocolVerifier url={apiURL} authorization={this.state.authorization} />
        </ReactTransitionGroup>

      </div>
    );
  }
});

module.exports = Verification;
