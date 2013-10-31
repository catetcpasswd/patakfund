var async = require('async');

module.exports = function(app, passport, auth) {

    //Front End Routes
   
    var about = require('../app/controllers/about');
    app.get('/about', about.render);

    var contact = require('../app/controllers/contact');
    app.get('/contact', auth.requiresLogout, contact.render);

    //User Routes
    var users = require('../app/controllers/users');

    // user must not be logged in for the following operations
    // if logged in they will be redirected to '/'

    app.get('/login',  auth.requiresLogout, users.login);
    app.get('/signup', auth.requiresLogout, users.signup);
    app.get('/forgot', auth.requiresLogout, users.forgot);

    app.get('/reset',   auth.requiresLogin, users.reset);    
    app.get('/signout', auth.requiresLogin, users.signout);
    app.get('/welcome', auth.requiresLogin, users.welcome);

    // POST

    // send contact message to admin. triggered by contact.jade and controller
    app.post('/contact/sendemail', contact.sendemail);

    // user saving. triggered by signup.jade
    app.post('/signup', users.create);


    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Invalid email or password.'
    }), users.session);

  
  
    //Verify token route
    var verificationtoken = require('../app/controllers/verificationtoken');
    app.get('/verify/:token', verificationtoken.checkToken);
    

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};



