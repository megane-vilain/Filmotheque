'use strict';

angular.module('movieApp', ['ngRoute', 'ngMaterial', 'ngSanitize']);
	
angular.module('movieApp').config(['$routeProvider','$sceDelegateProvider','$mdThemingProvider',function($routeProvider,$sceDelegateProvider,$mdThemingProvider)
	{
		//Système de routage
		$routeProvider
			.when('/view/:id',
			{
				templateUrl:'Views/View_Movie.html',
				controller: 'Movie_ViewCtrl'
			}
		)
			.when('/popular',
			{
				templateUrl:'Views/View_Movies.html',
				controller: 'View_MoviesCtrl'
			}
		)
		  .when('/search/:Title',
			{
				templateUrl:'Views/View_Movies.html',
				controller: 'View_MoviesCtrl'
			}
		)
			.when('/upcoming',
			{
				templateUrl:'Views/View_Movies.html',
				controller: 'View_MoviesCtrl'
			}
		)
			.when('/my_movies',
			{
				templateUrl:'Views/My_Movies.html',
				controller:'My_MoviesCtrl'
			}
		)
			.when('/profil',
			{
				templateUrl:'Views/Profil.html',
				controller:'ProfilCtrl'
			}
		)
			.when('/connexion',
			{
				templateUrl:'Views/Connexion.html',
				controller:'ConnexionCtrl'
			}
		)
			.otherwise(
			{
				redirectTo: '/my_movies'
			}
		);

		$sceDelegateProvider.resourceUrlWhitelist
		([
    	// Allow same origin resource loads.
    	'self',
    	// Allow loading from our assets domain.  Notice the difference between * and **.
    	'https://image.tmdb.org/**'
  		]);
	}
]);