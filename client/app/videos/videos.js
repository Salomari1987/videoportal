angular.module('co.videos', [      
      "ngSanitize",
      "com.2fdevs.videogular"])

.controller('VideosController', function ($sce, $scope, $window, $location, Videos, HelperFuncs) {
  $scope.data = {};
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.rateVideo = function (id, value) {
    console.log(id, value)
    Videos.rateVideo({videoId:id, rating:value})
    .then(function (resp) {
      console.log(resp)
    })
  };

  // get first 10 videos by default
  // attach array to scope data object to iterate over it
  Videos.getMany()
  .then(function (resp) {
    var videos = resp.map(function (e) { return e;});
    for (var i = 0; i < videos.length; i++) {
      videos[i].overallRating = Math.round(HelperFuncs.arrayAverage(videos[i].ratings));
      var videoType = HelperFuncs.videoType(videos[i].url);
      videos[i].source = {src:$sce.trustAsResourceUrl(videos[i].url), type: "video/"+videoType }
    }
    return videos;
  })
  .then(function (videos) {
    $scope.data.videos = videos;
  })
});