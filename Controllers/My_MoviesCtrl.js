angular.module('movieApp').controller('My_MoviesCtrl',function($scope,ConnexionService,DatabaseService)
{	
	$scope.Hide_Movie = "false";
	
	$scope.User_Movies = [];
	$scope.processing = true;
	
	firebase.auth().onAuthStateChanged(function(user) 
	{
        if (user) 
        {
        	var moviesRef = firebase.database().ref('users/' + $scope.user.uid + '/movies/');

        	$scope.promise = DatabaseService.Get_Movies($scope.user.uid);

        	$scope.promise.then(function(data)
        	{
        		$scope.$apply(function()
        		{
        			$scope.User_Movies = data;
        			$scope.processing = false;
        		});
        		if (data == null || undefined)
        		{
        			$scope.Hide_Texte = true;
        			$scope.processing = false;
        		}
        	});

			moviesRef.on('child_changed',function(data)
			{	
				for(var i=0; i < $scope.User_Movies.length;i++)
				{
					if($scope.User_Movies[i].id == data.key)
					{
						$scope.User_Movies[i] = data.val();
					}
				}

				for (object in $scope.User_Movies)
				{
					if(data.key == object)
					{
						$scope.User_Movies[object] = data.val();
					}
				}
			});

			moviesRef.on('child_removed', function(data) 
			{
		  		for (object in $scope.User_Movies)
		  		{
		  			if (data.key == object)
		  			{
		  				delete $scope.User_Movies[object];
		  			}
		  		}
			});
		}
	});

	$scope.Vus = function()
	{
		$scope.Hide_Movie = "true";
	}

	$scope.A_Voir = function()
	{
		$scope.Hide_Movie = "false";
	}

	$scope.Delete_Movie = function(id) 
	{
		DatabaseService.Delete_Movie(id,$scope.user.uid );
	}
	$scope.Update_Movie = function(id, note_average, poster_url, release_date, title,status)
	{
		if(status == "false")
		{
			var postData= {
				title: title,
				status: "true",
				poster_url: poster_url,
				id: id
			};	
		}
		else
		{
			var postData= {
				title: title,
				status: "false",	
				poster_url: poster_url,
				id: id
			};
		}
		DatabaseService.Add_Movie(postData, id, $scope.user.uid);
	}
});