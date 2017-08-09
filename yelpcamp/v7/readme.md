# YelpCamp v7

## Refactor the Routes

* Use Express router to reorganize all the routes.

First thing to do is create a new directory called `routes`, and inside create 3 files: `comments.js`, `campgrounds.js`, and `index.js`. campgrounds.js will take all of the campgrounds related routes, comments the same, and index takes authentication, the root route, and all the other stuff. We won't be using app.get, app.post, etc., to create the routes. Instead we will be using the express Router:

```javascript
var express = require("express");
var router = express.Router();

router.get(...);

router.post(...);

module.exports = router;
```

This will be done in the 3 router files we created, make sure the `isLoggedIn()` function is in the files that use it. Then in app.js, we will require the route files and use them:

```javascript
var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");

app.use(campgroundRoutes);
app.use(indexRoutes);
app.use(commentRoutes);
```

At this point, running the code will give us errors because we still have some files that need to be required. The model files and in index.js we need passport and User. The downside to refactoring code is we need to require a ton. *Make sure **campgroundRoutes** comes first because I couldnt access any of them if it was last.*  

Next, notice that in the campgrounds route, every route starts with `/campgrounds`. We can DRY it up a bit by doing this: `app.use("/campgrounds", campgroundRoutes);`. This tells the route what each route will start with. Then we can go into the campgrounds route file and remove `"/campgrounds"` from the start of every route. So `/campgrounds` becomes `/`. We can now do the same thing with comments: `app.use("/campgrounds/:id/comments", commentRoutes);`.

```javascript
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);
```

# YelpCamp v8 - putting into v7

## Users + Comments

* Associate users and comments
* Save author's name to a comment automatically

*****

1. Change comment schema to this:
```javascript
var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
```
2. Use the seed to remove everything except campgrounds, then stop the seedDB from running in app.js
3. Change the post route in comments.js to for creating a comment so it reflects the new schema:
```javascript
Comment.create(req.body.comment, function(err, comment) {
	if (err) consoe.log(err);
	else {
		// connect new comment to campground
		// add username and id to comment
		comment.author.id = req.user._id;
		comment.author.username = req.user.username;
		// save comment
		comment.save();
		campground.comments.push(comment);
		campground.save();
		res.redirect("/campgrounds/" + campground._id);
	}
});
```
4. Remove the author field from `comments/new.ejs`.
5. Fix `campgrounds/show.ejs` so it uses the comment author properly:
```javascript
<% if (campground.comments.length > 0) { %>
<% campground.comments.forEach(function(comment) { %>
	<div class="row">
		<div class="col-md-12">
			<strong><%=comment.author.username%></strong>
			<span class="pull-right">10 days ago</span>
			<p><%=comment.text%></p>
		</div>
	</div>
	<hr>
<% }); %>
<% } else { %>
	<div class="row">
		<div class="col-md-12">
			<h4 class="text-center"><em>No comments yet!</em></h4>
		</div>
	</div>
<% } %>
```

# YelpCamp v9

## Users + Campgrounds

* Prevent an unautenticated user from creating a campground
* Save username+id to newly created campground