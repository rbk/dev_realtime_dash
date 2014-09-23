var express         = require('express');
var session         = require('express-session');
var MongoStore 		= require('connect-mongo')(session);
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

app.use(session({
    secret: 'sasdflkajdf9q83j4rqj34r98u3r90jf09ij34',
    cookie: { path: '/', httpOnly: true, secure: false, maxAge:3600000 },
    store: new MongoStore({
        db: 'yack',
        collection: 'sessions',
        host: '127.0.0.1',
        port: 27017,
        username: '',
        password: '',
        ssl: false,
        mongoose_connection: db
    })
}));

var db              = require('./config/dbschema');
var pass            = require('./config/pass');
var basic_routes    = require('./routes/basic');
var user_routes     = require('./routes/user');

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.use(multer({ dest: './uploads/'}));
app.use(express.static('assets'));
app.use(methodOverride());
app.use(morgan('dev')); 
app.engine('.html', require('ejs').__express);
app.engine('.js', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');


// Basic pages
app.get('/', basic_routes.index);

// User pages
app.get('/account', pass.ensureAuthenticated, user_routes.account);
app.get('/login', user_routes.getlogin);
app.post('/login', user_routes.postlogin);
// app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);
app.get('/logout', user_routes.logout);


// app.get('/user/new', function(req,res){
//   var user = new db.userModel({username: 'richard', password: 'password', email: 'richard.be.jamin@gmail.com', admin: true });
//   user.save(function (err) {
//       if( !err ){
//           res.render('user_new', { message: 'New Users Created!' });
//           res.end();
//       } 
//   });
// })




// require('./routes/message.js')(app);
// require('./socket-logic.js')(io);



http.listen(port, function(){
    console.log('### listening on port ' + port);
});