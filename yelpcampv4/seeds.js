var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Dismals Canyon",
		image: "http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium sint quas illo ducimus perferendis eos a earum, illum natus omnis, facere magni sapiente! Illo, consectetur, blanditiis! Perferendis neque at sit!"
	},
	{
		name: "Lake Oloiden",
		image: "http://oloidencamp.com/wp-content/uploads/2014/05/campsite-7.jpg",
		description: "Lake Oloiden is the greatest secret of the Rift Valley. The Naivasha area is a fantastic location, but if you’re looking for a private piece of paradise away from the masses, follow our lead and come to the most serene escape. Ever."
	},
	{
		name: "Peaceful Pond",
		image: "http://pickwick-dam.com/wp-content/uploads/2015/08/17991101764_fcb19c7311_k.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt repudiandae accusamus dolorum fuga consectetur quam beatae recusandae itaque reiciendis, corporis ducimus, soluta illo nesciunt maiores. Quasi hic nihil eligendi fugit."
	}
];

function seedDB() {
	// remove all campgrounds
	Comment.remove({}, function(err) {
		if (err) console.log(err);
		else {
			console.log("removed comment");
			
			Campground.remove({}, function(err) {
				if (err) console.log(err);
				else  {
					console.log("removed campgrounds");

					// add a few campgrounds
					// This must be inside remove because we want to make sure campgrounds are removed before we
					// add new ones.
					data.forEach(function(cg) {
						Campground.create(cg, function(err, campground) {
							if (err) console.log(err);
							else {
								console.log("added a campground!");

								// add a comment
								Comment.create({ // creates the comment
									text: "This place is great, but I wish there was internet",
									author: "Homer"
								}, function(err, comment) { // CALLBACK HELL
									if (err) console.log(err)
									else {
										campground.comments.push(comment); // push the comment to the campground
										campground.save(); // save it in the campground
										console.log("Created new comment");
									}
								});
							}
						});
					});
				}
			});
		}
	});


	// add a few comments
}

module.exports = seedDB;