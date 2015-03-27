'use strict';

describe('Chart', function () {
  var React = require('react/addons');
  var Chart, component;

  beforeEach(function () {
    Chart = require('components/BarChart.js');
    component = React.createElement(Chart);
  });

  it('should create a new instance of Chart', function () {
    expect(component).toBeDefined();
  });
});
