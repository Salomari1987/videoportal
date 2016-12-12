angular.module('co.helpers', [])

//Factory to manage all user authentication related communications with backend
.factory('HelperFuncs', function () {
  var arrayAverage = function (array) {
    var sum = 0;
    var l = array.length
    for (var i = 0; i < l; i++) {
      sum += array[i];
    }
    var average = sum/l;
    return average
  }
  var videoType = function (videoURL) {
    videoURL = videoURL.split('.')
    return videoURL[videoURL.length-1];

  }
  return {
    arrayAverage: arrayAverage,
    videoType: videoType
  }
});