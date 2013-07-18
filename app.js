
/*
*   Module dependencies
*/
var Helper = require('./modules/helper')(),
    Routes = require('./routes'),
    express = require('express'),
    http = require('http'),
    path = require('path');

/*
*   Start express-app
*/
var App = express();

/*
*   Configure app
*/
App.configure(function() {
    App.set('port', process.env.PORT || 3000);
    App.set('views', __dirname + '/views');
    App.set('view engine', 'jade');

    App.use(express.bodyParser());
    App.use(express.methodOverride());
    App.use(App.router);
    App.use(express.static(path.join(__dirname, 'public')));

    /*
    *   Development debugging
    */
    if (App.get('env') === 'development')
        App.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/*
*   Configure routes
*/
App.get('/', Routes.index);

/*
*   Start server
*/
http.createServer(App).listen(App.get('port'), function() {
    Helper.log('Started server successfully on port ' + App.get('port') + ', in environment \'' + App.get('env') + '\'');
});
