'use strict';

var React = require('react/addons');

require('styles/Imagebox.less');

var Imagebox = React.createClass({
  render: function () {
    return (
        <div>
          <img width={this.props.width} height={this.props.height} src={this.props.imageURL} />
        </div>
      );
  }
});

module.exports = Imagebox;

