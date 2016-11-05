'use strict';

angular.module('movieApp', ['ngRoute']);
	
angular.module('movieApp').config(['$routeProvider',function($routeProvider)
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
				controller: 'PopularCtrl'
			}
		)
		  .when('/search/:Title',
			{
				templateUrl:'Views/Search.html',
				controller: 'SearchCtrl'
			}
		)
			.when('/upcoming',
			{
				templateUrl:'Views/Upcoming.html',
				controller: 'UpcomingCtrl'
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
	}
]);