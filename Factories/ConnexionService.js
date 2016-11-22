angular.module('movieApp').factory('ConnexionService',function()
{
	var factory = {};
	//fonction de connexion
	factory.Connexion = function(provider)
	{
		var auth = firebase.auth();
<<<<<<< HEAD
		auth.signInWithRedirec(provider).then(function(result) 
=======
		auth.signInWithRedirect(provider).then(function(result) 
>>>>>>> Developpement
		{
			// Sign-in successful.
		}).catch(function(error) 
		{
			// An error occurred
		});
	}
	//fonction de deconnexion
	factory.Deconnexion = function()
	{
		firebase.auth().signOut().then(function() 
		{
			// Sign-out successful.
		}, function(error) 
		{
			// An error happened.
		});
	}
	return factory;
});