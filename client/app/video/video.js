angular.module('co.video', ['ngSanitize', 'com.2fdevs.videogular'])
.controller('VideoController',
  function ($sce, $stateParams, Videos, $scope, HelperFuncs) {
    // Initialize video object on scope
    $scope.video = {};

    // Initialize rating maximum limit upon initialization
    $scope.max = 5;

    // get video with id from route parameters from backend
    Videos.getOne($stateParams.id)
    .then(function(video) {
      $scope.video = video;

      // safe parsing of video url for use in video source in html
      $scope.video.sources = [
        {src: $sce.trustAsResourceUrl($scope.video.url), type: 'video/mp4'}
      ];

      // Load videogular theme for better visuals of video controls
      $scope.video.theme = {
        url: 'http://www.videogular.com/styles/themes/default/latest/videogular.css'
      };

      // Calculate video overall rating from ratings array
      $scope.video.overallRating = Math.round(HelperFuncs.arrayAverage(video.ratings));

      // Get video type from video url
      $scope.video.videoType = HelperFuncs.videoType(video.videoType);
    })
   .catch(function(error) {
     console.error(error);
   });   
  }
);