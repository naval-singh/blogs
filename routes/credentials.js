const express = require('express');
const passport = require('passport');
const User =  require('../models/userModel');
const router = express.Router();


// ROOT ROUTER - to show home page
router.get('/', function(req, res){
    res.redirect('/blogs');
});

// ==================== //
//  CREDENTIAL ROUTERS  //
// ==================== //

// SIGNUP GET ROUTER - to show the signup form
router.get('/signup', function(req, res){
    res.render('credentials/signup');
});

// SIGNUP POST ROUTER - handles all the signup process
router.post('/signup', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('/signup');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash("success", "Welcome "+req.body.username+" --- You have successfully Signed Up");
            res.redirect('/blogs');
        });
    });
});

// LOGIN GET ROUTER -   to show the login form
router.get('/login', function(req, res){
    res.render('credentials/login');
});

// LOGIN POST ROUTER - handles all the login process
router.post('/login', passport.authenticate('local', {
        successRedirect: '/blogs',
        failureRedirect: '/login'
    }), function(req, res){
});

// LOGOUT ROUTER - to logout and redirect to the home page
router.get('/logout', function(req, res){
    req.logOut();
    req.flash("success", "Good Bye....");
    res.redirect('/blogs');
});

module.exports = router;