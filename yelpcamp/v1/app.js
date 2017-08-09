var express = require("express");
var bodyParser = require("body-parser"); // parsing form data into an object
var app = express();

var campgrounds = [
	{
		name: "Salmon Creek",
		image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"
	},
	{
		name: "Angel's Landing",
		image: "https://3q6jfk244bi51myw1n49at43-wpengine.netdna-ssl.com/wp-content/uploads/2013/04/angels-landing-15.jpg"
	},
	{
		name: "Granite Hill",
		image: "http://www.visitnc.com/contents/imgcrop/60726/1200/630/preview"
	},
	{
		name: "Glenn Canyon",
		image: "https://www.nps.gov/common/uploads/grid_builder/imr/crop16_9/84C871F3-1DD8-B71B-0BCAD116B65E0D38.jpg?width=950&quality=90&mode=crop"
	},
	{
		name: "Salmon Creek",
		image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"
	},
	{
		name: "Angel's Landing",
		image: "https://3q6jfk244bi51myw1n49at43-wpengine.netdna-ssl.com/wp-content/uploads/2013/04/angels-landing-15.jpg"
	},
	{
		name: "Granite Hill",
		image: "http://www.visitnc.com/contents/imgcrop/60726/1200/630/preview"
	},
	{
		name: "Glenn Canyon",
		image: "https://www.nps.gov/common/uploads/grid_builder/imr/crop16_9/84C871F3-1DD8-B71B-0BCAD116B65E0D38.jpg?width=950&quality=90&mode=crop"
	}
];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs"); // allows you to leave off .ejs on each res.render call
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("home");
});

// form for new campgrounds
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

// display campgrounds
app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds: campgrounds});
});

// submit new campgrounds and redirect to display campgrounds
app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	campgrounds.push({name: name, image: image});

	res.redirect("/campgrounds");
});

app.get("*", function(req, res) {
	res.send("Error: Page not found");
});

app.listen(3000, 'localhost', function() {
	console.log("Server listening...");
});