var express 		= require("express"),
 	bodyParser 		= require("body-parser"), // parsing form data into an object
 	mongoose 		= require("mongoose"),
 	app 			= express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // allows you to leave off .ejs on each res.render call
app.use(express.static("public"));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

/****************/
/* ROUTES
/****************/


app.get("/", function(req, res) {
	res.render("home");
});

// NEW - form for new campgrounds
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

// we have to be careful because /campgrounds/new could be recognized as an id from the route below
// if we put :id route above /new. order is important

// SHOW - details about a single campground
app.get("/campgrounds/:id", function(req, res) {
	// find the campground with the provided ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) return err;

		// render show template with that campground
		res.render("show", {campground: campground});
	});
});

// INDEX - display all campgrounds
app.get("/campgrounds", function(req, res) {
	// get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) return err;

		res.render("index", {campgrounds: allCampgrounds});
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

app.get("*", function(req, res) {
	res.send("Error: Page not found");
});

app.listen(3000, 'localhost', function() {
	console.log("Server listening...");
});