angular.module('co.videos', ['ngSanitize', 'infinite-scroll', 'com.2fdevs.videogular'])

.controller('VideosController', function ($scope, LazyLoading, Videos, HelperFuncs) {
  // Initialize data object on scope
  $scope.data = {};
  
  // Initialize rating maximum limit upon initialization
  $scope.max = 5;

  // Rating read only or not
  $scope.isReadonly = false;

  // Initialize an instance of LazyLoading factory
  $scope.data = new LazyLoading();

  // Initialize array of video players
  $scope.players = [];

  // Add video to array of players upon loading
  $scope.onPlayerReady = function (API, index) {
    $scope.players[index] = API;
  };

  // Pause all playing videos one video plays
  $scope.onUpdateState = function (state, index) {
    if (state === 'play') {
      // pause other players
      for (var i = 0; i < this.players.length; i++) {
        if (i !== index) {
          $scope.players[i].pause();
        }
      }
    }
  };

  // Detect value of star rating on hover
  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  // Send rating to rateVideo service to backend
  $scope.rateVideo = function (i, id, value) {
    Videos.rateVideo({videoId: id, rating: value})
    .then(function (resp) {
      $scope.data.videos[i].overallRating = Math.round(HelperFuncs.arrayAverage(resp.data.ratings));
    })
  };
})
.factory('LazyLoading', function($sce, HelperFuncs, Videos) {
  // Lazy loading video function
  var LazyLoading = function() {
    // Initialize video array upon creation
    this.videos = [];
    // Set busy flag to false at start to load videos
    this.busy = false;
    // To keep track of latest batch of videos fetched from backend
    this.skip = 0;
    // Keep limit of videos being fetched from backend to 10
    this.limit = 10;
  };

  // Load more videos function
  LazyLoading.prototype.loadMore = function() {
    var videoType;
    
    // if videos are being loaded exit
    if (this.busy) {
      return;
    }
    // Set busy flag to true to show "Loading More..."
    this.busy = true;
    // Hack: Since .bind doesnt work with promisified function
    var that = this;
    Videos.getMany(this.skip, this.limit)
    .then(function (resp) {
      var videos = resp;
      for (var i = 0; i < videos.length; i++) {
        // Calculate over all rating and video type for display purposes
        videos[i].overallRating = Math.round(HelperFuncs.arrayAverage(videos[i].ratings));
        var videoType = HelperFuncs.videoType(videos[i].url);
        // Trust url for video source display
        videos[i].source = [{ src: $sce.trustAsResourceUrl( videos[i].url ), type: 'video/' + videoType }];
        // Set videogular theme for better visuals
        videos[i].theme = {
          url: 'http://www.videogular.com/styles/themes/default/latest/videogular.css'
        };
        that.videos.push(videos[i]);
      }
      // Update skip to currently loaded videos
      that.skip = that.videos.length;
      that.busy = false;
    });
  };
  return LazyLoading;
});