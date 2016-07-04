'use strict';

angular.module('fullStackTemplate')
.controller('photosController', function($scope, $state, Photo, dbPhotos){
  console.log('photosCtrl');

  let allPhotos = dbPhotos;
  $scope.Photos = allPhotos.data;

});
