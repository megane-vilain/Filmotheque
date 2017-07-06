angular.module('movieApp').controller('PopularCtrl',function($scope,$location,$anchorScroll,MoviesService)
{	
	var Load_Movies = function(url_fini)
	{
		MoviesService.LoadMovies(url_fini).then(function(data)
		{
		    console.log(url_fini);
			$scope.movies = data.results;
			$scope.total_pages = data.total_pages;
			$scope.current_page = data.page;
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
		$location.hash('top');
		$anchorScroll();
	}

	$scope.Precedent = function()
	{
		$location.hash('');
		$anchorScroll();
		$scope.current_page = $scope.current_page - 1;
		var url_fini = url + $scope.current_page +"&api_key=" + apiKey;
		Load_Movies(url_fini);
	}

	$scope.Suivant = function()
	{
		$scope.current_page = $scope.current_page +1;
		$location.hash('');
		$anchorScroll();
		var url_fini = url + $scope.current_page +"&api_key=" + apiKey;
		Load_Movies(url_fini);
	}

	var apiKey = 'f9fcc60c238c6f2f647bfb195f28a447';
	var tmdburl = "https://api.themoviedb.org/3/movie/popular"; 
	var url = tmdburl + '?page=';
	var url_fini = url + $scope.current_page +"&api_key=" + apiKey;
	Load_Movies(url_fini);
});