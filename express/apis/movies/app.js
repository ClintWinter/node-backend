var app = require("express")();
var bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/results", function(req, res) {
	var search = req.query.search;
	var url = 'http://omdbapi.com/?apikey=thewdb&s=' + search
	// console.log(search);
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			
			// console.log(data);
			res.render("results", {
				data: data,
				search: search
			});
		}
	});
});

app.get("*", function(req, res) {
	res.send("No page found");
});

app.listen(3000, 'localhost', function() {
	console.log("Server listening...");
});