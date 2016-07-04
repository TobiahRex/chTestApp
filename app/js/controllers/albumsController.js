'use strict';

angular.module('fullStackTemplate')
.controller('albumsController', function($scope, $state, Photo, dbAlbums){
  console.log('albumsCtrl');

  let allAlbums = dbAlbums;
  $scope.Albums = allAlbums.data;

});
