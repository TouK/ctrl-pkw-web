'use strict';

describe('Results', function () {
  var React = require('react/addons');
  var Results, component;

  beforeEach(function () {
    Results = require('components/Results.js');
    component = React.createElement(Results);
  });

  it('should create a new instance of Results', function () {
    expect(component).toBeDefined();
  });
});
