angular.module('co.services', [])

// Factory to manage all videos http communications with backend
.factory('Videos', function ($window, $http, $location) {
  var getMany = function (skip, limit) {
    // Send GET http request to fetch videos from API
    // Will add skip and limit params to request
    return $http({
      method: 'GET',
      url: '/videos?' + 'skip=' + skip + '&limit=' + limit,
    })
    .then(function (resp) {
      // return http response body to controller
      return resp.data.data;
    })
    .catch(function (err) {
      // if error is sent back by API, log it in console
      console.log(err);
    });
  };
  var getOne = function (videoId) {
    // Send GET http request to fetch one video from API
    return $http({
      method: 'GET',
      url: '/video?videoId=' + videoId
    })
    .then(function (resp) {
      return resp.data.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  };
  var rateVideo = function (data) {
    // send rating to video specified by 'videoId'
    return $http ({
      method: 'POST',
      url: '/video/ratings',
      data: data
    })
    .then(function (resp) {
      return resp.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  };
  return {
    getMany: getMany,
    getOne: getOne,
    rateVideo: rateVideo
  };
})

//Factory to manage all user authentication related communications with backend
.factory('Auth', function ($window, $http, $location) {
  // Login user
  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/user/auth',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // Check if user is authenticated by checking if session id is registered
  // in local storage
  var isAuth = function () {
    return !!$window.localStorage.getItem('sessionId');
  };

  // Log out user
  var logout = function () {
    return $http({
      method: 'GET',
      url: '/user/logout'
    })
    .then(function (resp) {
      // if user logout was successful
      // then remove session id and username from local storage
      if (resp.data.status === 'success') {
        console.log('success');
        $window.localStorage.removeItem('sessionId');
        $window.localStorage.removeItem('username');
        $location.path('/');
      } else {
        return resp.data;
      }
    });
  };
  return {
    login: login,
    isAuth: isAuth,
    logout: logout
  };
});