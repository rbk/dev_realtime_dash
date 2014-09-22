var express         = require('express');
var app             = express();
var http            = require('http').Server(app);
var io              = require('socket.io')(http);
var port            = process.env.PORT || 3001;
var mongoose        = require('mongoose');
var cookieParser    = require('cookie-parser');
var router          = express.Router();
var sanitizer       = require('sanitizer');
var md5             = require('MD5');
var fs              = require('fs');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var morgan          = require('morgan');
var multer          = require('multer');
var requirejs       = require('requirejs');
var bcrypt          = require('bcrypt');

app.use(bodyParser());
app.use(multer({ dest: './uploads/'}));
app.use(express.static('assets'));
app.use(methodOverride());
app.use(morgan('dev')); 
app.engine('.html', require('ejs').__express);
app.engine('.js', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

mongoose.connect('mongodb://localhost/yack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('### Connected to MongoDB.');
});

var User = mongoose.model( 'User', {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      User.find({username: username}, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if ( md5(user.password) != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));
app.use(passport.initialize());
app.use(passport.session());
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.post('/login', passport.authenticate('local', { successRedirect: '/admin',
    failureRedirect: '/login' }));

app.get('/login', function(req, res, next){
    res.render('login', {message: ''});
});


// var user = new User({ username: 'richard', email: 'richard.be.jamin@gmail.com', password: md5('password') });
// user.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('user: ' + user.username + " saved.");
//   }
// });


// notes:
/*

    - enable passport auth
    - three column layout
        - news feeds
        - chat
        - todo list
        - api console
        - server status ( by requesting file from a server )


*/


app.get('/', function(req, res){
    res.redirect('/login');
});
app.get('/admin', function(req, res){
    res.send('log in success'); 
});
require('./routes/message.js')(app);
require('./socket-logic.js')(io);

// Start server
http.listen(port, function(){
    console.log('### listening on port ' + port);
});
