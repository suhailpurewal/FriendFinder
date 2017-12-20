var friendInfo = require('../data/friends.js');
var path = require('path');

// handles functions for each link that's clicked.
module.exports = function(app){

	app.get('/api/friendsList', function(req, res){
		res.json(friendInfo);
	});

	// this takes the data that's input in the survey and stores it in an array and does the math to see the difference from each stored user
	app.post('/api/friendsList', function(req, res){
		var lowestDifferenceInt = 50;
		var chosenMatch;
		friendInfo.forEach(function(storedUserObject){
			var difference = 0;
			for(i=0;i<storedUserObject.scores.length;i++){
				difference+=Math.abs(storedUserObject.scores[i] - req.body.scores[i]);
			} if(difference<lowestDifferenceInt){
				lowestDifferenceInt = difference;
				chosenMatch = storedUserObject;
			}
		});
		res.json(chosenMatch);
		friendInfo.push(req.body);
	});
}