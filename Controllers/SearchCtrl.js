angular.module('movieApp').controller('SearchCtrl',function($scope,$routeParams,MoviesService,DatabaseService)
{	

	//Données servant à la requete 

	var apiKey = 'f9fcc60c238c6f2f647bfb195f28a447';
	$scope.page = 1;
	$scope.title = $routeParams.Title;
	var tmdburl = "https://api.themoviedb.org/3/search/movie?query=";
	var url = tmdburl + $scope.title + "&page=";
	var url = url + $scope.page +"&api_key=" + apiKey;
	
	//Récupération des données du film

	MoviesService.LoadMovies(url).then(function(data)
		{
			$scope.movies = data.results;
			if ($scope.movies.length <=0)
			{	
				$scope.Hide_Search = true;
			}
			for (var i = 0; i < $scope.movies.length; i++) 
			{
				$scope.movies[i].poster_path = MoviesService.Change_Url_Poster($scope.movies[i].poster_path);
				if( $scope.movies[i].vote_average == 0)
				{
					$scope.movies[i].vote_average = "Aucun avis";
				}
			}
		}).catch(function()
		{
			console.log("An error happened");
		});
	
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

	/////////////////////////////////////
	$scope.Check_Movie = function(id)
	{
		console.log("Check Movie");
		var Hide_Button_Database;
		firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/movies/' + id).once('value').then(function(snapshot)
		{
			console.log("Recherche film :" + id);
			if (snapshot.val() == null)
			{
				Hide_Button_Database = false;
				console.log("Film non present");
			}
			else
			{
				console.log("Film present");
				Hide_Button_Database = true;
				$scope.status = snapshot.val().status;
			}
		});
		return Hide_Button_Database;
	}
	/////////////////////////////////////
	
});