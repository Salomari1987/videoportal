var states = [
  { name: 'login', state: { url: '/login', templateUrl: 'app/auth/login.html', controller: 'AuthController'}},
  { name: 'videos', state: { url: '/videos', templateUrl: 'app/videos/videos.html', controller: 'VideosController'} },
  { name: 'video', state: { url: '/video/:id', templateUrl: 'app/video/video.html', controller: 'VideoController'} },
  { name: 'logout', state: { url: '/logout'} }
];
angular.module('co', [
  'ui.router',
  'angular-md5',
  'ngAnimate', 
  'ui.bootstrap',
  'co.auth',
  'co.videos',
  'co.video',
  'co.helpers',
  'co.services'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.when('/', '/videos');
  $urlRouterProvider.otherwise('/login');

  angular.forEach(states, function (state) {
    $stateProvider.state(state.name, state.state);
  });
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachSessionId');
})
.factory('AttachSessionId', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's sessionId
  // then add it to the params so the server can validate the request
  var attach = {
    request: function (config) {
      if(config.url.startsWith("template/") || config.url.startsWith("vg-templates/")){
        // Not modifying requests to these urls, 
        // as they are angular template cache requests
        return config;
      } else {
        config.params = config.params || {};
        var sessionId = $window.localStorage.getItem('sessionId');
        if (sessionId) {
          config.params.sessionId = sessionId;
        }
        config.headers['Allow-Control-Allow-Origin'] = '*';
        return config;
      }
    }
  }
  return attach;
})
.run(function ($rootScope, $location, Auth, $window) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the sessionId in localstorage
  // and send that sessionId to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  // TODO: not working, fix it
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (event  && !Auth.isAuth()) {
      console.log(!Auth.isAuth())
      $location.path('/login');
    } else if (toState.url === '/logout') {
      console.log('logout')
      $window.localStorage.removeItem('sessionId');
      $window.localStorage.removeItem('username');
      $location.path('/login');
    }
  });
});