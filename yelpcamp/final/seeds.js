var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Dismals Canyon",
		image: "http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg",
		price: '15',
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium sint quas illo ducimus perferendis eos a earum, illum natus omnis, facere magni sapiente! Illo, consectetur, blanditiis! Perferendis neque at sit!"
	},
	{
		name: "Lake Oloiden",
		image: "http://oloidencamp.com/wp-content/uploads/2014/05/campsite-7.jpg",
		price: '18',
		description: "Lake Oloiden is the greatest secret of the Rift Valley. The Naivasha area is a fantastic location, but if you’re looking for a private piece of paradise away from the masses, follow our lead and come to the most serene escape. Ever."
	},
	{
		name: "Peaceful Pond",
		image: "http://pickwick-dam.com/wp-content/uploads/2015/08/17991101764_fcb19c7311_k.jpg",
		price: '12',
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt repudiandae accusamus dolorum fuga consectetur quam beatae recusandae itaque reiciendis, corporis ducimus, soluta illo nesciunt maiores. Quasi hic nihil eligendi fugit."
	},
	{
		name: "Icy Tundra",
		image: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?dpr=1&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=",
		price: '0',
		description: "Bundle up! If you aren't prepared you will die!"
	},
	{
		name: "British Exploration",
		image: "https://images.unsplash.com/photo-1483425571841-9662f86c7154?dpr=1&auto=format&fit=crop&w=1080&h=537&q=80&cs=tinysrgb&crop=",
		price: '20',
		description: "We've got it all, explore the mountains, swim in the lake... You want it you've got it."
	},
	{
		name: "Serene Italian Beach",
		image: "https://images.unsplash.com/photo-1498910265115-9fb541931cd1?dpr=1&auto=format&fit=crop&w=1080&h=685&q=80&cs=tinysrgb&crop=",
		price: '25',
		description: "Beautiful, white beaches and crystal clear water. If you can't have a good time here you should just kill yourself."
	},
	{
		name: "Swiss Wilderness",
		image: "https://images.unsplash.com/photo-1478728073286-db190d3d8ce6?dpr=1&auto=format&fit=crop&w=1080&h=809&q=80&cs=tinysrgb&crop=",
		price: '0',
		description: "Make sure you have all your supplies, it gets cold at night."
	}
];

function seedDB() {
	// remove all campgrounds			
	Campground.remove({}, function(err) {
		if (err) console.log(err);
		else  {
			console.log("removed campgrounds");

			// add a few campgrounds
			// This must be inside remove because we want to make sure campgrounds are removed before we
			// add new ones.
			// data.forEach(function(cg) {
			// 	Campground.create(cg, function(err, campground) {
			// 		if (err) console.log(err);
			// 		else {
			// 			console.log("added a campground!");
			// 		}
			// 	});
			// });
		}
	});


	// add a few comments
}

module.exports = seedDB;