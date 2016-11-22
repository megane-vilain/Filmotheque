angular.module('movieApp').controller('ProfilCtrl',function($scope,ConnexionService, DatabaseService)
{
	firebase.auth().onAuthStateChanged(function(user) 
	{
	    if (user) 
	    {
			$scope.auth = firebase.auth();
			$scope.user = firebase.auth().currentUser;
			var provider = [];
			user.providerData.forEach(function (profile) 
			{
				provider.push(profile.providerId);
		  	});

			for (var i =0; i< provider.length; i++)
			{
				if (provider[i] === "twitter.com")
				{
					$scope.$apply(function()
				{
					$scope.Twitter_Provider = true;	
				});
					
				}
				else if(provider[i] === "facebook.com")
				{
					$scope.$apply(function()
				{
					$scope.Facebook_Provider = true;
				});
					
				}
				else if(provider[i] === "google.com")
				{
					$scope.$apply(function()
				{
					$scope.Google_Provider = true;
				});
					
				}
			}
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/config/Language').once('value').then(function(snapshot)
			{
				$scope.$apply(function()
				{
					$scope.Language = snapshot.val();
				});
				
			});
		}
	});
	$scope.Google_Link_Account = function()
	{
		var provider = new firebase.auth.GoogleAuthProvider();
		$scope.auth.currentUser.linkWithRedirect(provider).then(function()
		{
			$scope.$apply(function()
			{
				$scope.Google_Provider = true;
			});
		}, function(error) 
		{
			alert("Vous avez déjà un compte avec Google+. Veuillez le supprimer afin de pouvoir l'associer avec d'autres comptes.");
		});
		
	}

	$scope.Twitter_Link_Account = function()
	{
		var provider = new firebase.auth.TwitterAuthProvider();
		$scope.auth.currentUser.linkWithRedirect(provider).then(function()
		{
			$scope.$apply(function()
			{
				$scope.Twitter_Provider = true;
			});
		}, function(error) 
		{
			alert("Vous avez déjà un compte avec Twitter. Veuillez le supprimer afin de pouvoir l'associer avec d'autres comptes.");
		});
	}

	$scope.Facebook_Link_Account = function()
	{
		var provider = new firebase.auth.FacebookAuthProvider();
		$scope.auth.currentUser.linkWithRedirect(provider).then(function()
		{
			$scope.$apply(function()
			{
				$scope.Facebook_Provider = true;
			});
		}, function(error) 
		{
			alert("Vous avez déjà un compte avec Facebook. Veuillez le supprimer afin de pouvoir l'associer avec d'autres comptes.");
		});
	}
	$scope.Unlick_Facebook = function()
	{
		var providerId = "facebook.com";
		$scope.user.unlink(providerId).then(function() 
		{
			// Auth provider unlinked from account
			$scope.$apply(function()
			{
				$scope.Facebook_Provider = false;
			});
		}, function(error) {
		 	// An error happened
		});
		$scope.Facebook_Provider = false;
	}

	$scope.Unlick_Google = function()
	{
		var providerId = "google.com";
		$scope.user.unlink(providerId).then(function() 
		{
			// Auth provider unlinked from account
			$scope.$apply(function()
			{
				$scope.Google_Provider = false;
			});
		}, function(error) {
		 	// An error happened
		});
	}
	$scope.Unlick_Twitter = function()
	{
		var providerId = "twitter.com";
		$scope.user.unlink(providerId).then(function() 
		{
			// Auth provider unlinked from account
			$scope.$apply(function()
			{
				$scope.Twitter_Provider = false;
			});
		}, function(error) {
		 	// An error happened
		});
	}

	$scope.Delete_Account = function()
	{
		DatabaseService.Delete_Data_User($scope.user.uid);

		user.delete().then(function() 
			{
				// User deleted.
				//ConnexionService.Deconnexion();
			}, function(error) 
			{
				// An error happened.
				alert("Vous devez vous reconnecter pour pouvoir supprimer votre compte!");
			});
	}
	$scope.Save_Data = function()
	{
		var postData= {
				Language: $scope.Language,
			};	
		DatabaseService.Change_User_Language(postData, $scope.user.uid);
		$scope.Hide_Alert = true;	
		console.log($scope.Hide_Alert);
	}
});