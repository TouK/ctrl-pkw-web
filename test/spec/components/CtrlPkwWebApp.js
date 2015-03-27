'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var CtrlPkwWebApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    CtrlPkwWebApp = require('components/CtrlPkwWebApp.js');
    component = React.createElement(CtrlPkwWebApp);
  });

  it('should create a new instance of CtrlPkwWebApp', function () {
    expect(component).toBeDefined();
  });
});
