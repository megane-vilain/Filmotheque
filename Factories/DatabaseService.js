angular.module('movieApp').factory('DatabaseService',function()
{
	var factory = {};

	//Récupére la liste des films de l'utilisateur
	factory.Add_User =function()
	{
		var updates={};
		updates['/users/' + User_id ];
	}
	factory.Get_Movies = function(User_id)
	{
		return firebase.database().ref('users/' + User_id + '/movies/').once('value').then(function(snapshot)
		{
			return snapshot.val();
		});
	}
	//Ajoute un film
	factory.Add_Movie = function(Data, Movie_id,User_id)
	{
		var updates={};
		updates['/users/' + User_id + '/movies/'  + Movie_id] = Data;
		return firebase.database().ref().update(updates);
	}
	//Supprime un film
	factory.Delete_Movie = function(Movie_id,User_id)
	{
		var movieRef = firebase.database().ref('users/' + User_id + '/movies/'  + Movie_id);
		movieRef.remove().then(function() 
	  	{
	  		//Remove successful	
	  	})
	  	.catch(function(error) {
	    	console.log("Remove failed: " + error.message)
	  	});
	}
	//Change la variable langage
	factory.Change_User_Language = function(Data, User_id)
	{
		var updates = {};
		updates['/users/' + User_id + '/config/' ] = Data;
		return firebase.database().ref().update(updates);
	}
	//Supprime les données de l'utilisateur
	factory.Delete_Data_User = function(User_id)
	{
		var Ref = firebase.database().ref('users/' + User_id);
		Ref.remove().then(function()
		{
			//remove successful
		})
	}

	return factory;
});