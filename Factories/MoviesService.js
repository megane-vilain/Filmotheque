angular.module('movieApp').factory('MoviesService',function($http)
	{
	//Fonction servant à envoyer une requête à the MovieDatabase
		var factory = {};
		factory.LoadMovies = function(url)
		{
			return $http({method: 'GET',url: url,headers: {'X-Requested-With': undefined}}).then(function(response)
				{
					return response.data;
				});
		}
		//Fonction pour créer l'url affichant le poster du film
		factory.Change_Url_Poster=function(Data_Poster,size)
		{
			var Url_Poster = "";
			if (Data_Poster == undefined)
			{
				Url_Poster="Medias/photo-non-disponible.jpg"
			}
			else
			{
				Url_Poster = "https://image.tmdb.org/t/p/" + size + Data_Poster;
			}
			return Url_Poster;
		}
		return factory;
	}
);