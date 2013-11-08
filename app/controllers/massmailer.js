 
exports.sendFormMail = function(req,res) {

    // body.user: name, email, username,  body: subject, tokenURL, formEmail

    console.log('formMailer ' + formEmail); 
    
    var message = {
        name: req.body.user.name,
        email: req.body.user.email,
        username: req.body.user.username,
        subject: req.body.subject,
        tokenURL: req.body.tokenURL,
        supportURL:      'http' + "://" + 'localhost:3000' + "/support",
        notMyAccountURL: 'http' + "://" + 'localhost:3000' + "/support/notmyaccount",
        compromisedURL:  'http' + "://" + 'localhost:3000' + "/support/compromised"
    };

    mailer.sendTemplate(formEmail, message, function(error, response, html, text) { 
        if (error) {
            console.log("Error in sending " + formEmail + " " + response);
            req.flash('error', 'Unable to send verification email ' + error.message);
        }        
        else {
            console.log("Success in sending " + formEmail + " " + response);          
        }
        res.json(error,response);
    });
};
 
