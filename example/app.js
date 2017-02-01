
/**
 * Module dependencies.
 */

var express = require('express')
  , bodyParser = require('body-parser')
  , user = require('./user-api')
  , http = require('http')
  , path = require('path')
  , swagger = require('../');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:3000',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    apis: ['./user-api.js']
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

// User
app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.put('/user/:id/edit', user.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//TODO: app.configure is deprecated - need to update to express4
//Check if run different proj under 1 server port
// Error handling 
