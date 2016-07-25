function photosController($scope, $state, Photo, dbPhotos, $uibModal, $log, $q){
  $scope.Photos = dbPhotos.data

  let renderPhotos = () => {
    Photo.getPhotos
    .then(res => $scope.Photos = res.data)
    .catch(err => $q.reject());
  }

  let addPhoto = photo => {
    Photo.createPhoto(photo)
    .then(res => $scope.Photos = res.data)
    .catch(err => $q.reject());
  };

  let deletePhoto = photo => {
    Photo.deleteOne(photo._id)
    .then(res => renderPhotos())
    .catch(res=> $q.reject());
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
    modalInstance.result
    .then(photo => addPhoto(photo),
    _ => $log.info('Modal dismissed at: ' + new Date()));
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
    modalInstance.result.then(editedPhoto => {
      console.log('editedPhoto: ', editedPhoto);
    }, _ => $log.info('Modal dismissed at: ' + new Date()));
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
    modalInstance.result
    .then(deletePhoto => deletePhoto(deletePhoto),
    _ => $log.info('Modal dismissed at: ' + new Date()));
  };
}

angular.module('fullStackTemplate').controller('photosController', photosController);
