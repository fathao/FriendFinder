var path = require("path");


var friends = require("../data/friends.js");

module.exports = function(app) {

  app.get("/api/friends", function(req, res){
    res.json(friends);
  });

  app.post("/api/friends", function(req, res){

    var userInput = req.body;
		

		var userResponses = userInput.scores;
		
		// best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 500; 

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			var difference = 0;
			for (var j = 0; j < userResponses.length; j++) {
				difference += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
      
      
			if (difference < totalDifference) {
				
				totalDifference = difference;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

	
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});

  });
}