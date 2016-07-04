'use strict';

angular.module('fullStackTemplate')
.controller('photosController', function($scope, $state, Photo, dbPhotos, $uibModal, $log){
  console.log('photosCtrl');

  let allPhotos = dbPhotos;
  $scope.Photos = angular.copy(allPhotos.data);

  let renderPhotos = photo => {
    Photo.createPhoto(photo)
    .then(res=>{
      $scope.Photos = angular.copy(res.data);
    })
    .catch(err=>{
      $q.reject();
      console.log('photo add did not work: ', err );
    });
  };

  let deletePhoto = photo => {
    Photo.deleteOne(photo._id)
    .then(res=>{
      $state.go('photos');
    })
    .catch(res=>{
      $state.go('photos');
    });
  };

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
      renderPhotos(photo);
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
      deletePhoto(deletePhoto);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
