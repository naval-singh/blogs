const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');

const middlewareObject = {};

// MIDDLEWARE FUNCTION - to check whether user logged in or not
middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login first");
    res.redirect('/login');
};

// MIDDLEWARE FUNCTION- to check blog authorization of user
middlewareObject.checkBlogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err){
                console.log(err);
                req.flash("error", "Oops...... Not found!!!");
                res.redirect('/blogs/'+req.params.id);
            } else {
                if(foundBlog.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission denied");
                    res.redirect('/blogs/'+req.params.id);
                }
            }
        })
    } else {
        req.flash("error", "You need to login first");
        res.redirect('/login');
    }
};

// MIDDLEWARE FUNCTION- to check comment authorization of user
middlewareObject.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                req.flash("error", "Oops...... Not found!!!");
                res.redirect('/blogs/'+req.params.id);
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission denied");
                    res.redirect('/blogs/'+req.params.id);
                }
            }
        })
    } else {
        req.flash("error", "You need to login first");
        res.redirect('/login');
    }
};

module.exports = middlewareObject;