angular.module('movieApp').controller('ConnexionCtrl',function  ($scope, ConnexionService,$location) 
{
	$scope.Twitter_Connexion = function()
	{
		var provider = new firebase.auth.GoogleAuthProvider();
        ConnexionService.Connexion(provider);  
	}

	$scope.Facebook_Connexion = function()
	{
		var provider = new firebase.auth.FacebookAuthProvider();
        ConnexionService.Connexion(provider);
	}

	$scope.Google_Connexion = function()
	{
		var provider = new firebase.auth.GoogleAuthProvider();
        ConnexionService.Connexion(provider); 	
	}

});