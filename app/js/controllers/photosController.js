'use strict';

angular.module('fullStackTemplate')
.controller('photosController', function($scope, $state, Photo, dbPhotos, $uibModal, $log){
  console.log('photosCtrl');

  let allPhotos = dbPhotos;
  $scope.Photos = allPhotos.data;

  //////////////////////////////////////////////////////////////////////
  // Add Photo
  $scope.addPhoto = () => {
    var modalInstance = $uibModal.open({
      keyboard: true,
      animation: true,
      templateUrl: '/uib/template/modal/addPhotoModal.html',
      controller: 'addPhotoModalController',
      size: 'lg',
    });

    modalInstance.result.then(function (photo) {
      console.log('photo: ', photo);
    }, function (something) {
      console.log('something: ', something);
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  ////////////////////////////////////////////////////////////////////////
  /// Edit Photo
  $scope.editPhoto = photo => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/editPhotoModal.html',
      controller: 'editPhotoModalController',
      size: 'lg',
      resolve : { editPhoto : ()=> photo }
    });
    modalInstance.result.then(function (editedPhoto) {
      console.log('editedPhoto: ', editedPhoto);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  ////////////////////////////////////////////////////////////////////////
  /// Delete Photo
  $scope.deletePhoto = photo => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/deletePhotoModal.html',
      controller: 'deletePhotoModalController',
      size: 'lg',
      resolve : { deletePhoto : ()=> photo }
    });
    modalInstance.result.then(function (deletePhoto) {
      console.log('deletePhoto: ', deletePhoto);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
