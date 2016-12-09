angular.module('co', [
  'co.services',
  'co.auth',
  'co.videos',
  'angular-md5',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('/', {
      templateUrl: 'app/videos/videos.html',
      controller: 'VideosController'
    })
    .otherwise({redirectTo: '/'});
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
      config.params = config.params || {};
      var sessionId = $window.localStorage.getItem('sessionId');
      if (sessionId) {
        config.params.sessionId = sessionId;
      }
      config.headers['Allow-Control-Allow-Origin'] = '*';
      return config;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the sessionId in localstorage
  // and send that sessionId to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  // TODO: not working, fix it
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});