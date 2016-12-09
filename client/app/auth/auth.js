angular.module('co.auth', [])

.controller('AuthController', function ($scope, $window, $location, md5, Auth) {
  $scope.user = {};
  $scope.login = function () {
    // Send username and password md5 hash to Auth factory
    // The password is hashed using angular md5 package
    Auth.login({username: $scope.user.username, password: md5.createHash($scope.user.password || '')})
    .then(function(data) {
      if (data.status === 'success') {
        // if user was successfully authenticated
        // then attach session id and username to local storage
        // for use elsewhere in the application
        $window.localStorage.setItem('sessionId', data.sessionId);
        $window.localStorage.setItem('username', data.username);
        $location.path('/');     
      } else {
        console.log(data.error);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  };
});