# YelpCamp version 3  

* Create a models directory
* Use module.exports
* Require everything correctly!

## Add Seeds File

* Add a seeds.js file
* Run the seeds file every time the server starts

`$ touch seeds.js`

Go look at the seed.js file

## Add the Comment model

* Make errors go away.
* Display comments on campgrounds show page

To be able to show comments on our show page, we have to modify how we retrieve the data, which is essentially replacing the comment IDs with the comments themselves:

```javascript
// OLD
Campground.findById(req.params.id, function(err, campground) {
	if (err) console.log(err);
	else {
		console.log(campground);
		// render show template with that campground
		res.render("show", {campground: campground});
	}
});

// NEW
Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
	if (err) console.log(err);
	else {
		console.log(campground);
		// render show template with that campground
		res.render("show", {campground: campground});
	}
});
```

This `).populate("comments").exec(` specifically replaces `, ` in the first line.

## Comment New/Create

* Nested routes
* Add the comment new and create routes
* Add the new comment form