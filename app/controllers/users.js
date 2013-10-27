/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    User = mongoose.model('Xuser'); 



var pass = require('pwd');

exports.login = function(req, res) {
    res.render('users/login', {
        // 'error' is used by failureFlash
        message: req.flash('error'),
        title: 'Login',
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};

exports.signup = function(req, res) {
    res.render('users/signup', {
        // 'error' is set by exports.create
        message: req.flash('error'),
        title: 'Signup',
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};

exports.forgot = function(req, res) {
    res.render('users/forgot', {
        title: 'Forgot',
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};

exports.reset = function(req, res) {
    res.render('users/reset', {
        title: 'Reset',
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};

exports.welcome = function(req, res) {
    res.render('welcome', {
        title: 'Welcome',
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};




exports.create = function(req, res) {

    User.findOne({'email' : req.body.email}, function(err,user ) {
      
      if(user) { 
        console.log("Email " + user.email + " exists in the database. isEmailTaken" );
        var message = 'Email ' + user.email + ' is already used.';
        req.flash('error', 'Email is already used');
        // redirect to new http
        return res.redirect('/signup');
      }
      else {
        User.findOne({'username': req.body.username}, function(err,user) {
          if (user) {
            console.log('Username '+ user.username + ' is taken');
            // var message = 'Username '+ user.username + ' is already taken';
            req.flash('error', 'Username is already taken');
            return res.redirect('/signup');
          }
          else {
            var newUser = new User(req.body);
            newUser.provider = 'local';
            newUser.createdAt = Date.now();
            newUser.save(function(err) {
              if(err) {
                  console.log('error in user.create ' + err);
                  // render an html
                  return res.render('users/signup', {
                    errors: err.errors,
                    user: user
                  });
              }
              else {
                console.log("no problem in user.create ");
                return res.redirect('/welcome');
              }
            });
          }      
        });
      }
    });
   
};


 
/*
// old session before passport.authenticate was used

exports.session = function(req,res) {
  // check if username or email and password matches record in database
  // if successful redirect to 

  User.findOne({'email' : req.body.email}, function(err,user) {
    if(err) {
      return done(err);
    }
    if (!user) {
      // email does not exist
      console.log("Email does not exist");
      return res.render('users/login');
    }
    else {
      if (!user.authenticate(req.body.password)) {
        // invalid password
        console.log("Password is not correct");
        return res.render('users/login');
      }
      else {
        // correct password. login successful
        console.log('Login successful');
        return res.redirect('/welcome');
      }   
    }
  });
};
*/

/*** Session ***/

exports.session = function(req, res) {
    res.redirect('/welcome');
};

/** Logout  */
exports.signout = function(req, res) {
    //req.logout();
    res.redirect('/');
};



