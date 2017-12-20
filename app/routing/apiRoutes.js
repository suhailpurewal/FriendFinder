var friendInfo = require('../data/friends.js');
var path = require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
	// ---------------------------------------------------------------------------

	app.get('/api/friendsList', function(req, res){
		res.json(friendInfo);
	});

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

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



		// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
		// It will do this by sending out the value "true" have a table 
		res.json(chosenMatch);
		friendInfo.push(req.body);

	});

	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!

	app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		friendInfo = [];

		console.log(friendInfo);
	})
}