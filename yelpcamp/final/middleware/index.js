var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

var middlewareObj = {};

middlewareObj.campgroundUserMatch = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, campground) {
			if (err) {
				req.flash("error", "Campground not found.");
				return res.redirect("/campgrounds");
			} else {
				// console.log(campground.author.id, req.user._id);
				// if (campground.author.id === req.user._id) {
				// campground.author.id is actually an object, this comparison WILL NOT WORK!!!!
				if (campground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that")
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("back");
	}
};

middlewareObj.commentUserMatch = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, comment) {
			if (err) {
				req.flash("error", "Comment not found.");
				return res.redirect("/campgrounds");
			} else {
				if (comment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");
	}
};

module.exports = middlewareObj;