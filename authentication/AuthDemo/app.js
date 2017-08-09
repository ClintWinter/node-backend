var express 				= require("express");
var app 					= express();
var bparser					= require("body-parser");
var mongoose				= require("mongoose");
var passport 				= require("passport");
var LocalStrategy			= require("passport-local");
var passportLocalMongoose	= require("passport-local-mongoose");

// MODELS
var User = require("./models/user");

// CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/auth_demo", {useMongoClient: true});

app.set("view engine", "ejs");
app.use(require("express-session")({
	secret: "blahblahblahblah",
	resave: false,
	saveUninitialized: false
}));
app.use(express.static(__dirname + "/public"));
app.use(bparser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
});

// auth routes
app.get("/register", function(req, res) { // show sign up form
	res.render("register");
});

app.post("/register", function(req, res) {
	User.register(
		new User({
			username: req.body.username
		}), 
		req.body.password,
		function(err, user) {
			if (err) {
				console.log(err);
				return res.render("register");
			}
			passport.authenticate("local")(req, res, function() {
				res.redirect("/secret");
			});
		}
	);
});

// login routes
app.get("/login", function(req, res) {
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req, res) {

});

// logout
app.get("/logout", function(req, res) {
	// log out user
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}


// SERVER
app.listen(3000, 'localhost', function() {
	console.log('Server listening...');
});