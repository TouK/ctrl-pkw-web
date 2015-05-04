'use strict';

var React = require('react/addons');

require('styles/Imagebox.less');

var Imagebox = React.createClass({
  render: function () {
    return (
        <div>
          <a target="_blank" href={this.props.imageURL}>
            <img width={this.props.width} height={this.props.height} src={this.props.imageURL} alt="brak zdjęcia"/>
          </a>
        </div>
      );
  }
});

module.exports = Imagebox;

