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
var session         = require('express-session');

// var connect         = require('connect')
// var flash           = require('connect-flash');

app.use(session({secret: 'keyboard cat'}))
// app.use(express.session({ cookie: { maxAge: 60000 }}));
// app.use(flash());
app.use(bodyParser());
app.use(multer({ dest: './uploads/'}));
app.use(express.static('assets'));
app.use(methodOverride());
app.use(morgan('dev')); 
app.engine('.html', require('ejs').__express);
app.engine('.js', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(passport.initialize());
app.use(passport.session());


// mongoose.connect('mongodb://localhost/yack');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//     console.log('### Connected to MongoDB.');
// });

// var User = mongoose.model( 'User', {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true}
// });

// app.get('/login', function(req, res, next){
//     res.render('login', {message: ''});
// });
// app.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/admin',
//     failureRedirect: '/login'
//   })
// );
// app.get('/login', function(req, res, next) {
//   res.render('login');
// });
 
// app.get('/loginSuccess', function(req, res, next) {
//   res.send('Successfully authenticated');
// });
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
 
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     process.nextTick(function () {
//       User.find({username: username}, function(err, user) {
//         user = user[0];
//         if (err) { return done(err); }
//         if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
//         if ( user.password != md5(password)) { return done(null, false, { message: 'Invalid password' }); }
//         return done(null, user);
//       })
//     });
//   }
// ));

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login');
// }

// app.post('/login', passport.authenticate('local', { successRedirect: '/admin',
//     failureRedirect: '/login' }));



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
app.get('/admin', function(req, res) {
  // console.log( req )
  res.render('login', { message: req });

});








require('./routes/message.js')(app);
require('./socket-logic.js')(io);

// Start server
http.listen(port, function(){
    console.log('### listening on port ' + port);
});
