'use strict';

describe('ProtocolVerifier', function () {
  var React = require('react/addons');
  var ProtocolVerifier, component;

  beforeEach(function () {
    ProtocolVerifier = require('components/ProtocolVerifier.js');
    component = React.createElement(ProtocolVerifier);
  });

  it('should create a new instance of ProtocolVerifier', function () {
    expect(component).toBeDefined();
  });
});
