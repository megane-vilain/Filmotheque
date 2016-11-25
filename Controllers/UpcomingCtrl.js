angular.module('movieApp').controller('UpcomingCtrl',function($scope,$location,$anchorScroll,MoviesService)
{	
	var Load_Movies = function(url_fini)
	{
		MoviesService.LoadMovies(url_fini).then(function(data)
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
		$location.hash('top');
		$anchorScroll();
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
		$scope.current_page = $scope.current_page +1;	
		url_fini = url + $scope.current_page +"&api_key=" + apiKey;
		Load_Movies(url_fini);	
	}
	
	var apiKey = 'f9fcc60c238c6f2f647bfb195f28a447';
	var tmdburl = "https://api.themoviedb.org/3/movie/upcoming"; 
	var url = tmdburl + '?page=';
	var url_fini = url + $scope.current_page +"&api_key=" + apiKey;
	Load_Movies(url_fini);
});