angular.module('movieApp').directive('checkdirective', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "Views/Check.html",
        controller: ['$scope','$location','DatabaseService', function ($scope,$location,DatabaseService) 
        {
            // Your behaviour goes here :)
            firebase.auth().onAuthStateChanged(function(user) 
            {
                if (user) 
                {
                    $scope.user  = firebase.auth().currentUser;
                }
            });

            $scope.Check_Movie = function(id,movie)
            {
                firebase.database().ref('users/' + $scope.user.uid + '/movies/' + id).once('value').then(function(snapshot)
                {
                    //Film non présent 
                    if (snapshot.val() == null)
                    {
                        $scope.$apply(function()
                        {
                            movie.database = false;
                        });
                    }
                    //Film présent
                    else
                    {
                        $scope.$apply(function()
                        {
                            movie.database = true;
                        });     
                    }
                });
            }
            //Fonction servant à afficher un film
            $scope.Add_Movie = function(movie)
            {
                $scope.status = "false";
                var postData= {
                    title: movie.title,
                    status: $scope.status,
                    note_average : movie.vote_average, 
                    release_date : movie.release_date,  
                    poster_url: movie.poster_path,
                    id: movie.id
                };
                DatabaseService.Add_Movie(postData, movie.id, firebase.auth().currentUser.uid);
                movie.database = true;
            }

            //Fonction servant à supprimer un film
    
            $scope.Delete_Movie = function(movie) 
            {
                DatabaseService.Delete_Movie(movie.id, firebase.auth().currentUser.uid);
                movie.database = false;
            }

        }]
    }
});