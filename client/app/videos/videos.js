angular.module('co.videos', [])

.controller('VideosController', function ($scope, $window, $location, Videos) {
  $scope.data = {};
  // get first 10 videos by default
  // attach array to scope data object to iterate over it
  Videos.getMany()
  .then(function (resp) {
    for (var i = 0; i < resp.length; i++) {
      var rating = 0;
      for (var j = 0; j < resp[i].rating.length; j++) {
        rating += resp[i].rating[j];
      }
      resp[i]['overallRating'] = rating / resp[i].rating.length;
      resp[i]['videoType'] = resp[i].url.split('.')[resp[i].url.split('.').length];
    }
    $scope.data.videos = resp;
  });
});