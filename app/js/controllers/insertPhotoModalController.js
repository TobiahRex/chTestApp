'use strict';

angular.module('fullStackTemplate')
.controller('insertPhotoModalController', function ($scope, $uibModalInstance, dbPhotos, album) {

  $scope.Photos = dbPhotos.data;
  let idObj = { albumId : album.album._id}

  $scope.insertPhoto = photo => {
    let addPhoto  = angular.copy(photo);
    idObj.photoId = addPhoto.photo._id;
    $uibModalInstance.close(idObj);
  };

  $scope.cancel = () => $uibModalInstance.dismiss();
});
