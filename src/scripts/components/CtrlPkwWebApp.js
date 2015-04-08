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
var apiURL = 'http://ctrlpkw.pl/api/';

var CtrlPkwWebApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <Imagebox imageURL={imageURL} />
          <Results url={apiURL} />
          <ProtocolVerifier url={apiURL} />
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = CtrlPkwWebApp;
