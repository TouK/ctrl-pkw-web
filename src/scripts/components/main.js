'use strict';

var CtrlPkwWebApp = require('./CtrlPkwWebApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={CtrlPkwWebApp}>
    <Route name="/" handler={CtrlPkwWebApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
