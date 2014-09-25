var passport = require('passport');

exports.account = function(req, res) {
  res.render('account', { user: req.user });
};

exports.getlogin = function(req, res) {
  res.render('logged_out', { user: req.user, message: req.session.messages });
};

exports.admin = function(req, res) {
  res.send('access granted admin!');
};

// POST /login
exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/account');
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};


// Need user logged in collection here to track people for the chat
// When seesion expires, log user out!!!
// just track with socketio
// nevermind. socket io logic will interact with own collection besides this.
// keep this as main login auth since nobody can access main page without logged in status! Yay.