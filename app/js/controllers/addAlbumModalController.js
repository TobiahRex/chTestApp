'use strict';

angular.module('fullStackTemplate')
.controller('addAlbumModalController', function ($scope, $uibModalInstance) {
  console.log('addAlbumModalCtrl');

  $scope.createAlbum = () => {
    console.log('$scope.album: ', $scope.album);
    $uibModalInstance.close(album);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss();
  };
});
