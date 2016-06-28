
/**
 * Module dependencies.
 */
//Main App file
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, fs = require('fs')
, controller = require('./controller');
var mongoose = require('mongoose');
var db = require('./models/db')
var app = express();
//var session = require('express-session');
//var session = require('express-session');
//var RedisStore = require('connect-redis')(express);
//var redis = require("redis").createClient();
//for session 
var RedisStore = require('connect-redis')(express);
//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('S3CRE7'));
app.use(express.session({ store: new RedisStore({
	host:'127.0.0.1',
	port:6379,
	prefix:'sess'
}), secret: 'SEKR37' }));
//app.use(express.session());
/*
app.use(session({
    store: new RedisStore({
    	  host:'127.0.0.1',
    	  port:6379,
    	  prefix:'sess',
    	  client: redis
    	}),
    secret: 'keyboard cat'
}));
 */
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.home);
app.get('/game_stream',routes.game_stream);
app.get('/home',routes.home);
app.get('/pre_stream',routes.pre_stream);
app.get('/piece', routes.piece);
app.get('/logout',routes.logout);
app.get('/users', user.list);
app.post('/game', routes.game);
app.get('/get_game_list',routes.get_game_list);
app.post('/signup',routes.signup);
app.post('/signin',routes.signin);
app.get('/play',routes.play);
app.get('/load',routes.load_game);
app.get('/test',routes.test);

app.get('/create',routes.create);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Game server listening on port ' + app.get('port'));
});
