var express      = require('express');
var app          = express();
var http         = require('http').Server(app);
var io           = require('socket.io')(http);
var port         = process.env.PORT || 3001;
var mongoose     = require('mongoose');
var cookieParser = require('cookie-parser');
var router       = express.Router();
var sanitizer    = require('sanitizer');
var md5          = require('MD5');
var fs           = require('fs');
var passport     = require('passport-local');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(bodyParser());
app.use(multer({ dest: './uploads/'}));
app.use(express.static('assets'));
app.engine('.html', require('ejs').__express);
app.engine('.js', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('### Connected to MongoDB.');
});

app.get('/', function(req, res){ 
    res.render('index'); 
});

// Start server
http.listen(port, function(){
    console.log('### listening on port ' + port);
});
