var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res) {
	res.render("home");
});

// auth routes
router.get("/register", function(req, res) {
	res.render("register");
});

router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash("error", err.message);
			return res.redirect("/register");
		}

		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome <strong>" + user.username + "</strong>! We hope you enjoy your stay!");
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	successFlash: "Welcome back!",
	failureFlash: "Username or password is incorrect."
}), function(req, res) {});

router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "You have been logged out!");
	res.redirect("/campgrounds");
});

router.get("*", function(req, res) {
	res.send("Error: Page not found");
});

module.exports = router;