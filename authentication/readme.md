# Authentication

## Intro to Auth

* What tools are we using?
	* Passport
	* Passport Local
	* Passport Local Mongoose
* Walk through auth flow
* Discuss sessions
	* Express-Session

We will use *PassportJS* - [PassportJS](http://www.passportjs.org)  
We will also use *passport-local*, which is for a simple username and password, but we can also use PassportJS to add logins for google, facebook, twitter, etc.  
Lastly we will use *passport-local-mongoose*, which will help us work with mongoose.  

Authentication and being logged in/logged out from page to page is based around sessions. HTTP is supposed to be a **stateless protocol**, they are one time things that shouldn't know about history, which is why authentication becomes difficult. We must use *SESSIONS*, which allows us to not be stateless--it provides state. Now we can navigate to different pages and maintain our logged in or logged out status.  

To handle sessions we will be using a package called *express-sessions*.

## Auth Code Along (Part 1)  

Package List for this projec:

* express
* ejs
* mongoose
* passport
* passport-local
* passport-local-mongoose
* body-parser
* express-session

Just setup a basic express app, nothing new in this section. Create a home page for the root route, and a secret page for the `/secret` route.

## Auth Code Along (Part 2)

* Create User model
* Configure Passport

First we create a User model, like we have done before. Then we add in passport-local-mongoose package:

```javascript
var mongoose = require("mongoose");
var plm = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(plm);

var User = mongoose.model("User", userSchema);

module.exports = User;
```

userSchema.plugin adds in a bunch of methods onto the userSchema that we will need to use for user authentication. We have some new packages to implement in app.js:  

```javascript
// First we have the new packages to require:
var passport 				= require("passport");
var LocalStrategy			= require("passport-local");
var passportLocalMongoose	= require("passport-local-mongoose");

// Then we have some new settings to use:
app.use(require("express-session")({
	secret: "blahblahblahblah",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

The passport.serialize lines are responsible for getting the data from the session and decoding it, then encoding it and putting it back in. We can use User.serializeUser because we used the plugin in the user model.

## Auth Code Along (Part 3)

* Add Register routes
* Add Register form

We create a register route/view page with a form to submit a new user. The form submits back to `/register` with method POST, here is how we handle the form data:

```javascript
app.post("/register", function(req, res) {
	User.register(
		new User({
		username: req.body.username
	}), 
	req.body.password,
	function(err, user) {
		if (err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/secret");
		});
	}});
});
```

The reason we don't pass the password into the new user is because we **DO NOT** want to save the password directly into the database. User.register will encrypt the password we pass into the second argument, and save the hashed password instead.  

`passport.authenticate("local")` *logs the user in* using the local strategy. That means with a username and password. We could replace local with twitter, facebook, or google if we were using that sort of authentication.  

Now we can register through the app. Once we do, if we go to mongo and find the users, we can see how it is stored. We have the username, a very long hash, and something called salt. If you think back, you will remember we worked with this in the CS50 Harvard course for bruteforcing passwords. The salt is what's used to unhash the hash into a password.

## Auth Code Along (Part 4)

* Add Login routes
* Add Login form

Basically copy and paste part 3 but replace register with login, the only difference is how we handle the post... because making everything obscure and hard to work with is what makes this so fun! It's no surprise I gave up on node like 3 times before this.

```javascript
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req, res) {

});
```

This is what is known as *middleware*. The idea is that it is code that runs before our final callback. So we are handling whether it's a real username/password and logging them in, then redirecting them to one of the two pages. Also, above the weird serialize/deserialize code at the top of app.js, add this line: `passport.use(new LocalStrategy(User.authenticate()));`  

Once that is setup, go ahead and try to login with a bad username/password, and you should be redirected to the login page, otherwise you will be redirected to the secret page.  

## Auth Code Along (Part 5)

* Add Logout route
* Add isLoggedIn middleware

Logging out is much easier than the other stuff:

```javascript
app.get("/logout", function(req, res) {
	// log out user
	req.logout();
	res.redirect("/");
});
```

All we need is a link to `/logout` for one of our nav buttons. Passport is simply destroying the data in the session. So now we can log out, but the problem is we can still go to the secret page even when logged out. To fix that, we need middleware. So now on the `/secret` route, we check if the user is logged in before we render the page.  

We write a middleware function like this:

```javascript
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}

// simply add the middleware to the secret route:
app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
});
```

The req, res, next parameters are standard with middleware--express knows how to handle them automatically. Now the /secret route runs the middleware before doing anything else. `next()` refers to the callback function in the get route, so basically if the user is logged in, continue as normal, otherwise redirect them to the login page. `isAuthenticated()` is one of the functions that comes with passport.  

When using the page now, you must login to navigate to the secret page, otherwise you will be redirected to the login page. Once logged in you can go to any page and back to secret without an issue. Once you click log out, you cannot navigate back to the secret page until you log in once again.