angular.module('co.video', [      
      "ngSanitize",
      "com.2fdevs.videogular"])
.controller('VideoController',
    function ($sce, $stateParams, Videos, $scope) {
      $scope.video = {}
      Videos.getOne($stateParams.id)
      .then(function(video) {
        $scope.video = video;
        $scope.video.sources = [
          {src: $sce.trustAsResourceUrl($scope.video.url), type: "video/mp4"}
        ];
        $scope.video.theme = {
          url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        };
      })
     .catch(function(error) {
       console.error(error);
     });   
    }
);