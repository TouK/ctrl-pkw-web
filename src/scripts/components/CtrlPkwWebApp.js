'use strict';

var React = require('react/addons');
var Imagebox = require('./Imagebox');
var Results = require('./Results');

var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var CtrlPkwWebApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <Imagebox imageURL={imageURL} />
          <Results url='http://ctrlpkw.pl/api/' />
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = CtrlPkwWebApp;
