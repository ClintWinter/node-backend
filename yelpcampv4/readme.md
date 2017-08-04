# Yelpcamp v4

## Comment New/Create

* Nested routes
* Add the comment new and create routes
* Add the new comment form

RESTFUL ROUTES

|	Name 	|	URL					|	VERB	|	DESCRIPTION									|
|	---		|	---					|	---		|	---											|
|	INDEX 	|	/campgrounds		|	GET		|	Display a list of all campgrounds			|
|	NEW 	|	/campgrounds/new 	|	GET		|	Displays form to make a new campgrounds 	|
| 	CREATE 	|	/campgrounds		|	POST	|	Add new campground to DB					|
|	SHOW 	|	/campgrounds/:id 	|	GET		| 	Shows info about one campground 			|

Now we need comment routes, which ___WILL NOT___ look like this:

|	NAME	|	URL				|	VERB	|
|	---		|	---				|	---		|
|	NEW 	| 	/comments/new 	|	GET		|
|	CREATE 	| 	/comments 		|	POST 	|

If we want to comment on a particular campground, then we have to have the campground ID in the url, which is where nested routes comes in.

|	Name 	|	URL								|	VERB	|	DESCRIPTION									|
|	---		|	---								|	---		|	---											|
|	NEW 	|	/campgrounds/:id/comments/new 	|	GET		|	Displays form to make a new campgrounds 	|
| 	CREATE 	|	/campgrounds/:id/comments		|	POST	|	Add new campground to DB					|

First we must refactor. Inside views, create folders for campgrounds and comments. Move index, new, and show to campgrounds. If this is ran, you'll get an error. `app.js` must have the render urls changed from just `res.render("new")` to `res.render("campgrounds/new")`. Same for the comment ones.  

Then when ran you'll get a second error. This one will be because the header/footer routes are no longer correct. `<% include partials/header %>` must become `<% include ../partials/header %>`.

Now, we can set up the comment routes. It's pretty intuitive at this point how the route should look for a new comment:

```javascript
app.get("/campgrounds/:id/comments/new", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) console.log(err)
		else res.render("comments/new", {campground: campground});
	});
});
```

In the `comments/new.ejs` form, the action url will be `campgrounds/<%=campground._id%>/comments`, and the route will look like this:

```javascript
app.post("/campgrounds/:id/comments", function(req, res) {
	// lookup campground using id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if (err) consoe.log(err);
				else {
					// connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});
```

And don't forget to include the Comment model in app.js! `var Comment = require("./models/campground");`

# Putting v5 in with v4

* Add sidebar to show page
* Display comments nicely