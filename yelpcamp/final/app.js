var express 		= require("express"),
 	bodyParser 		= require("body-parser"), // parsing form data into an object
 	mongoose 		= require("mongoose"),
 	seedDB			= require("./seeds"),
 	passport		= require("passport"),
 	LocalStrategy	= require("passport-local"),
 	override		= require("method-override"),
 	flash			= require("connect-flash");
 	app 			= express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // allows you to leave off .ejs on each res.render call
app.use(express.static(__dirname + "/public"));
app.use(override("_method"));
app.use(flash());

// seed the database
// seedDB();

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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//================
// ROUTES
//================
var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

// SERVER
app.listen(3000, 'localhost', function() {
	console.log("Server listening...");
});