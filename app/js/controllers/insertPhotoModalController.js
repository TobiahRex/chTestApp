'use strict';

angular.module('fullStackTemplate')
.controller('insertPhotoModalController', function ($scope, $uibModalInstance, dbPhotos) {
  console.log('insertPhotoModalController');

  $scope.Photos = dbPhotos;

  $scope.createPhoto = () => {
    console.log('$scope.photo: ', $scope.photo);
    $uibModalInstance.close(photo);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss();
  };
});
