const express = require('express');
const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const middlewareObject = require('../middlewares');
const router = express.Router();

// =================== //
//   COMMENT ROUTERS   //
// =================== //


// CREATE ROUTER - to create a comment on selected blog
router.post('/blogs/:id/comments', middlewareObject.isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body, function(err, addedComment){
                if(err){
                    console.log(err);
                } else {
                    addedComment.author.id = req.user._id;
                    addedComment.author.name = req.user.username;
                    addedComment.save();
                    foundBlog.comments.push(addedComment);
                    foundBlog.save();
                    res.redirect('/blogs/'+req.params.id);
                }
            });
        }
    });
});

// EDIT ROUTER --------- shows the edit form with existing comment text
router.get('/blogs/:id/comments/:comment_id/edit', middlewareObject.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
        } else {
            res.render('comments/edit', {comment: foundComment, blogId: req.params.id});
        }
    });
});

//UPDATE ROUTER -------- to edit and update comment into the database
router.put('/blogs/:id/comments/:comment_id', middlewareObject.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body, function(err, updateComment){
        if(err){
            console.log(err);
        } else {
            console.log(updateComment);
            req.flash("success", "Comment updated !!!");
            res.redirect('/blogs/'+req.params.id);
        }
    });
});

// DESTROY ROUTER - to delete selected comment
router.delete('/blogs/:id/comments/:comment_id', middlewareObject.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        }
        req.flash("success", "Comment deleted !!!");
        res.redirect('/blogs/'+req.params.id);
    });
});

module.exports = router;