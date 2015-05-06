'use strict';

var Verification       = require('./Verification');
var Results            = require('./Results');

var React              = require('react');
var Router             = require('react-router');
var Route              = Router.Route;
var DefaultRoute       = Router.DefaultRoute;
var Link               = Router.Link;
var RouteHandler       = Router.RouteHandler;

var content = document.getElementById('content');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="results">Wyniki</Link></li>
                        <li><Link to="verification">Weryfikacja</Link></li>
                    </ul>
                </header>

                {/* this is the important part */}
                <RouteHandler/>
            </div>
        );
    }
});

var Routes = (
    <Route path="/" handler={App} >
        <Route name="verification" handler={Verification}/>
        <Route name="results" handler={Results}/>
        <DefaultRoute handler={Verification}/>
    </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
