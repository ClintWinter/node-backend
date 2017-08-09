var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// INDEX - display all campgrounds
router.get("/", function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if (err) return err;

		res.render("campgrounds/index", {campgrounds: allCampgrounds});
	});
});

// NEW - form for new campgrounds
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// SHOW - details about a single campground
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
		if (err) console.log(err);
		else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

// CREATE - submit new campground to DB (and redirect to all campgrounds)
router.post("/", isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {id: req.user._id, username: req.user.username};

	Campground.create({
		name: name,
		image: image,
		description: description,
		author: author
	}, function(err, campground) {
		if (err) return err;

		res.redirect("/campgrounds");
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
}

module.exports = router;