var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// INDEX - display all campgrounds
router.get("/", function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if (err) return err;

		res.render("campgrounds/index", {campgrounds: allCampgrounds});
	});
});

// NEW - form for new campgrounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {id: req.user._id, username: req.user.username};

	Campground.create({
		name: name,
		image: image,
		price: price,
		description: description,
		author: author
	}, function(err, campground) {
		if (err) console.log(err);
		else {
			req.flash("success", "Your campground was successfully created.");
			res.redirect("/campgrounds");
		}
	});
});

// EDIT
router.get("/:id/edit", middleware.campgroundUserMatch, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		res.render("campgrounds/edit", {campground: campground});
	});
});

// UPDATE
router.put("/:id", middleware.campgroundUserMatch, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
		if (err) {
			console.log(err);
			return res.redirect("/campgrounds");
		}
		req.flash("success", "Your campground was successfully modified.");
		res.redirect("/campgrounds/"+req.params.id);
	});
});

// DELETE
router.delete("/:id", middleware.campgroundUserMatch, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
		}
		req.flash("success", "Your campground was successfully deleted.");
		res.redirect("/campgrounds");
	});
});

module.exports = router;