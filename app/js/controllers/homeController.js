'use strict';

angular.module('fullStackTemplate')
.controller('homeController', function($scope, $state, Album, Photo, dbAlbums){
  console.log('homeCtrl');

  let allAlbums = dbAlbums;
  $scope.Albums = allAlbums.data;

});
