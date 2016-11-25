angular.module('movieApp').controller('View_MoviesCtrl',function($scope,$routeParams,$location,$anchorScroll,MoviesService)
{

	var apiKey = 'f9fcc60c238c6f2f647bfb195f28a447';

	$scope.page = 1;

	var tmdburl = "https://api.themoviedb.org/3/";
	var url = "";

	if ($location.path() == "/popular")
	{
		url = tmdburl + "movie/popular?page="
	}
	else if ($location.path() == "/upcoming")
	{
		url = tmdburl + "movie/upcoming&page=";
	}
	else 
	{
		$scope.title = $routeParams.Title;

		url = tmdburl + "search/movie?query=" + $scope.title + "&page=";
	}

	url_fini = url + $scope.page + "&api_key=" + apiKey;

	var Load_Movies = function(url)
	{
		MoviesService.LoadMovies(url).then(function(data)
		{
			$scope.movies = data.results;
			$scope.total_pages = data.total_pages;
			$scope.current_page = data.page;

			for (var i = 0; i < $scope.movies.length; i++) 
			{
				$scope.movies[i].poster_path = MoviesService.Change_Url_Poster($scope.movies[i].poster_path);
			}	


		}).catch(function()
		{
			console.log("An error happened");
		});
	}

	$scope.Precedent = function()
	{
		$location.hash('');
		$anchorScroll();

		$scope.current_page = $scope.current_page - 1;
		url_fini = url + $scope.current_page +"&api_key=" + apiKey;

		Load_Movies(url_fini);
	}

	$scope.Suivant = function()
	{
		$location.hash('');
		$anchorScroll();
	
		$scope.current_page = $scope.current_page + 1;
		url_fini = url + $scope.current_page + "&api_key=" + apiKey;

		Load_Movies(url_fini);
	}

	Load_Movies(url_fini);

});