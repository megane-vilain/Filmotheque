angular.module('movieApp').directive('headerdirective', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "Views/header.html",
        controller: ['$scope','$location','ConnexionService', function ($scope,$location,ConnexionService) 
        {
            // Your behaviour goes here :)
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) 
                {
                    // User is signed in.
                    //renvoi sur la page mes films
                    $scope.$apply(function()
                    {
                        $scope.user  = firebase.auth().currentUser;
                        $scope.Img_Profil_Url = $scope.user.photoURL;
                        if ($location.url() == "/connexion" || $location.url() == "/connexion#top")
                        {
                            $location.path("/my_movies");
                        }
                        else 
                        {
                            
                        }
                        
                    });
                } 
                else 
                {
                    // User signed out
                    //Renvoi sur la page de connexion
                    $scope.$apply(function()
                    {
                        $scope.user = $scope.user = firebase.auth().currentUser;
                        $location.path("/connexion");
                    });
                }
            });
            $scope.Deconnexion = function()
            {   
                //Fonction de deconnexion
                var moviesRef = firebase.database().ref('users/' + $scope.user.uid + '/movies/');
                moviesRef.off();
                ConnexionService.Deconnexion();  
            }
            $scope.Search = function()
            {
                var url = "/search/:" + $scope.Title;
                $location.path(url);
                $scope.Title = "";
            }

        }]
    }
});