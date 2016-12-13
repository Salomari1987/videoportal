angular.module('co.video', [      
      "ngSanitize",
      "com.2fdevs.videogular"])
.controller('VideoController',
    function ($sce, $stateParams, Videos, $scope, HelperFuncs) {
      $scope.video = {};
      $scope.max = 5;
      Videos.getOne($stateParams.id)
      .then(function(video) {
        $scope.video = video;
        $scope.video.sources = [
          {src: $sce.trustAsResourceUrl($scope.video.url), type: "video/mp4"}
        ];
        $scope.video.theme = {
          url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        };
        $scope.video.overallRating = Math.round(HelperFuncs.arrayAverage(video.ratings))
        $scope.video.videoType = HelperFuncs.videoType(video.videoType);
      })
     .catch(function(error) {
       console.error(error);
     });   
    }
);