angular.module('co.videos', ["ngSanitize", "infinite-scroll", "com.2fdevs.videogular"])

.controller('VideosController', function ($scope, LazyLoading) {
  $scope.data = {};
  $scope.max = 5;
  $scope.isReadonly = false;
  $scope.data = new LazyLoading();
  $scope.players = [];

  $scope.onPlayerReady = function (API, index) {
      
      $scope.players[index] = API;
  };
  $scope.onUpdateState = function (state, index) {
            if (state === 'play') {
                // pause other players
                for (var i=0, l=this.players.length; i<l; i++) {
                    if (i !== index) {
                        $scope.players[i].pause();
                    }
                }
            }
        };
  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.rateVideo = function (id, value) {
    Videos.rateVideo({videoId:id, rating:value})
  };
})
.factory('LazyLoading', function($sce, HelperFuncs, Videos) {
  var LazyLoading = function() {
    this.videos = [];
    this.busy = false;
    this.skip = 0
    this.limit = 10;
  };

  LazyLoading.prototype.loadMore = function() {
    var videoType;
    if (this.busy) return;
    this.busy = true;
    
    var that = this;
    Videos.getMany(this.skip, this.limit)
    .then(function (resp) {
      var videos = resp;
      for (var i = 0; i < videos.length; i++) {
        videos[i].overallRating = Math.round(HelperFuncs.arrayAverage(videos[i].ratings));
        var videoType = HelperFuncs.videoType(videos[i].url);
        videos[i].source = [{src:$sce.trustAsResourceUrl(videos[i].url), type: "video/"+videoType }]
        videos[i].theme = {
          url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        };
        that.videos.push(videos[i]);
      }
      that.skip = that.videos.length;
      that.busy = false;

    });
  };
  return LazyLoading;
});