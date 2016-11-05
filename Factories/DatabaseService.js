angular.module('movieApp').factory('DatabaseService',function()
{
	var factory = {};

	factory.Get_Movies = function(User_id)
	{
		return firebase.database().ref('users/' + User_id + '/movies/').once('value').then(function(snapshot)
		{
			return snapshot.val();
		});
	}

	factory.Add_Movie = function(Data, Movie_id,User_id)
	{
		var updates={};
		updates['/users/' + User_id + '/movies/'  + Movie_id] = Data;
		return firebase.database().ref().update(updates);
	}

	factory.Delete_Movie = function(Movie_id,User_id)
	{
		var movieRef = firebase.database().ref('users/' + User_id + '/movies/'  + Movie_id);
		movieRef.remove().then(function() 
	  	{
	  		//Remove succeful   	
	  	})
	  	.catch(function(error) {
	    	console.log("Remove failed: " + error.message)
	  	});
	}
	factory.Change_User_Language = function(Data, User_id)
	{
		var updates = {};
		updates['/users/' + User_id + '/config/' ] = Data;
		return firebase.database().ref().update(updates);
	}

	return factory;
});