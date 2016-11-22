angular.module('movieApp').controller('Movie_ViewCtrl',function($scope,MoviesService,$sce,$routeParams,$location,$anchorScroll,DatabaseService)
{ 		
	//Resconstrution de l'url de la vidéo youtube avant de l'afficher

	$scope.getIframeSrc = function(videoID)
	{
		return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoID);
	}

	//Fonction servant à ajouter un film dans la base de données.

	$scope.Add_Movie = function()
	{
		$scope.status = "false";
		var postData= {
			title: $scope.movie.title,
			status: $scope.status,
			note_average : $scope.movie.vote_average, 
			release_date : $scope.movie.release_date,	
			poster_url: $scope.movie.poster_path,
			id: $scope.movie.id
		};
		DatabaseService.Add_Movie(postData, $scope.movie.id, firebase.auth().currentUser.uid);
		$scope.Hide_Button_Database = true;
	}

	//Fonction servant à supprimer un film
	
	$scope.Delete_Movie = function() 
	{
		DatabaseService.Delete_Movie($scope.movie.id);
	  	$scope.Hide_Button_Database = false;
	}

	$scope.Update_Movie = function(status)
	{
		if(status == "false")
		{
			$scope.status = "true";
			var postData= {
				title: $scope.movie.title,
				status: $scope.status,
				note_average : $scope.movie.vote_average, 
				release_date : $scope.movie.release_date,	
				poster_url: $scope.movie.poster_path,
				id: $scope.movie.id
			};
		}
		else
		{
			$scope.status = "false";
			var postData= {
				title: $scope.movie.title,
				status: $scope.status,
				note_average : $scope.movie.vote_average, 
				release_date : $scope.movie.release_date,	
				poster_url: $scope.movie.poster_path,
				id: $scope.movie.id
			};
		}	
		DatabaseService.Add_Movie(postData, $scope.movie.id ,firebase.auth().currentUser.uid);
	}


	//Données servant à la requete 
	$location.hash('');
	$anchorScroll();
	$location.hash('top');
	$anchorScroll();

	$scope.id = $routeParams.id;

	var tmdburl = "https://api.themoviedb.org/3/";
	var apiKey = 'f9fcc60c238c6f2f647bfb195f28a447';

	firebase.auth().onAuthStateChanged(function(user) 
	{
	    if (user) 
	    {
	    	firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/movies/' + $scope.id).once('value').then(function(snapshot)
			{
				if (snapshot.val() == null)
				{
					$scope.Hide_Button_Database = false;
				}
				else
				{
					$scope.$apply(function()
					{
						$scope.Hide_Button_Database = true;
						$scope.status = snapshot.val().status;
					});
					$scope.Hide_Button_Database = true;
					$scope.status = snapshot.val().status;
				}
			});
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/config/Language').once('value').then(function(snapshot)
			{
				if (snapshot.val()!=null)
				{
					var url = tmdburl  + "movie/" + $scope.id + "?append_to_response=credits,videos&api_key=" + apiKey+"&language=" + snapshot.val();
				}
				else
				{
					var url = tmdburl  + "movie/" + $scope.id + "?append_to_response=credits,videos&api_key=" + apiKey+"&language=en";
				}

				MoviesService.LoadMovies(url).then(function(Data_Movie)
				{
					$scope.movie = Data_Movie;
					$scope.movie.poster_path = MoviesService.Change_Url_Poster($scope.movie.poster_path);
					if( $scope.movie.vote_average == 0)
					{
						$scope.movie.vote_average = "Aucun avis";
					}
					if ($scope.movie.belongs_to_collection != null)
					{
						var url = tmdburl + "collection/" +$scope.movie.belongs_to_collection.id + "?api_key=" + apiKey+"&language=" + snapshot.val();
						MoviesService.LoadMovies(url).then(function(Data_Collection)
						{
							$scope.Collection = Data_Collection;
						}).catch(function(error)
						{
							console.log("An error happened : " +error);
						});
					}
				}).catch(function(error)
				{
					console.log("An error happened : " +error);
				});
			});
	    }	
	});

});
