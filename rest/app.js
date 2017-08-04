var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose		= require("mongoose"),
	methodOverride 	= require("method-override"),
	sanitizer 		= require("express-sanitizer");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog", {useMongoClient: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());


// MONGOOSE CONFIG
// ***************************
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// ROUTES
// ***************************
app.get("/", function(req, res) {
	res.redirect("/blogs");
});


// index
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) console.log(err);
		else res.render("index", {blogs: blogs});
	});
});


// new
app.get("/blogs/new", function(req, res) {
	res.render("new");
});


// create
app.post("/blogs", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, blog) {
		if (err) res.render("new");
		else res.redirect("/blogs");
	});
});


// show
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, blog) {
		if (err) res.redirect("/blogs");
		else res.render("show", {blog: blog});
	});
});


// edit
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, blog) {
		if (err) res.redirect("/blogs");
		else res.render("edit", {blog: blog});
	});
});


// update
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog) {
		if (err) res.redirect("/blogs/"+req.params.id+"/edit");
		else res.redirect("/blogs/"+req.params.id);
	});
});


// delete
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) res.redirect("/blogs");
		else res.redirect("/blogs");
	});
});


// SERVER
// ***************************
app.listen(3000, 'localhost', function() {
	console.log("Server running...");
});