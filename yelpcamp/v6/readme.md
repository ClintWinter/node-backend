# YelpCamp v6

Nearly everything being done here will be the same as the authentication project. Anything new will be here.

## Add User Model

* Install all package needed for auth
* Define User Model

## Register

* Configure Passport
* Add register routes
* Add register template

When registering as a new user, if the user already exists, passport blocks it and returns an error that the user already exists. Was not aware of that before.

## Login

* Add login routes
* Add login template

## Logout/Navbar

* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

## Show/Hide Links

* Show/hide auth links correctly  

A user's data is stored in `req.user`. To use it, we can pass it into our res.render function:

```javascript
res.render("campgrounds/index", {
	campgrounds: allCampgrounds,
	user: req.user
});
```

The problem with this, is that we don't want to have to pass this into every single route manually. Instead, we use `app.use()` to write a middleware that will be automatically used in every single route.


```javascript
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});
```

That allows us to use the user data in the header on every page. `if (!currentUser) { //show login/signup}`