var express 		= require("express"),
 	bodyParser 		= require("body-parser"), // parsing form data into an object
 	mongoose 		= require("mongoose"),
 	seedDB			= require("./seeds"),
 	passport		= require("passport"),
 	LocalStrategy	= require("passport-local"),
 	app 			= express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // allows you to leave off .ejs on each res.render call
app.use(express.static(__dirname + "/public"));

seedDB();

/****************/
/* MODELS
/****************/
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

// passport config
app.use(require("express-session")({
	secret: "Here is a very long sentence that I need for setting up the secret.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

/****************/
/* ROUTES
/****************/


app.get("/", function(req, res) {
	res.render("home");
});

// NEW - form for new campgrounds
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});

// we have to be careful because /campgrounds/new could be recognized as an id from the route below
// if we put :id route above /new. order is important

// SHOW - details about a single campground
app.get("/campgrounds/:id", function(req, res) {
	// find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
		if (err) console.log(err);
		else {
			// render show template with that campground
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

// INDEX - display all campgrounds
app.get("/campgrounds", function(req, res) {
	// get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) return err;

		res.render("campgrounds/index", {campgrounds: allCampgrounds});
	});
});

// CREATE - submit new campground to DB (and redirect to all campgrounds)
app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;

	Campground.create({
		name: name,
		image: image,
		description: description
	}, function(err, campground) {
		if (err) return err;

		res.redirect("/campgrounds");
	});
});

// auth routes
app.get("/register", function(req, res) {
	res.render("register");
});

app.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(req, res, function() {
			res.redirect("/campgrounds");
		});
	});
});

app.get("/login", function(req, res) {
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res) {});

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
}

// ====================
// COMMENTS ROUTES
// ====================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) console.log(err)
		else res.render("comments/new", {campground: campground});
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
					console.log(comment);
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

app.get("*", function(req, res) {
	res.send("Error: Page not found");
});


// SERVER
app.listen(3000, 'localhost', function() {
	console.log("Server listening...");
});