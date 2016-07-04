'use strict';

angular.module('fullStackTemplate')
.controller('albumsController', function($scope, $state, Album, Photo, dbAlbums, $uibModal, $log){
  console.log('albumsCtrl');

  let allAlbums = dbAlbums;
  $scope.Albums = allAlbums.data;

  let renderAlbums = album => {
    Album.createAlbum(album)
    .then(res=>{
      $scope.Albums = angular.copy(res.data);
    })
    .catch(err=>{
      $q.reject();
      console.log('album add did not work: ', err );
    });
  };


  let deleteAlbum = album => {
    Album.deleteOne(album._id)
    .then(res=>{
      $state.go('albums');
    })
    .catch(res=>{
      $state.go('albums');
    });
  };

  //////////////////////////////////////////////////////////////////////
  // Add photo modal

  $scope.addPhoto = () => {
    var modalInstance = $uibModal.open({
      keyboard: true,
      animation: true,
      templateUrl: '/uib/template/modal/insertPhotoModal.html',
      controller: 'insertPhotoModalController',
      size: 'lg',
      resolve : {
        dbPhotos : function(Photo, $q){
          return Photo.getPhotos()
          .catch(()=> {
            $q.reject();
          });
        }
      }
  });

  modalInstance.result.then(function (album) {
    renderAlbums(album);
  }, function (something) {
    console.log('something: ', something);
    $log.info('Modal dismissed at: ' + new Date());
  });
};

//////////////////////////////////////////////////////////////////////
// Add Album
$scope.addAlbum = () => {
  var modalInstance = $uibModal.open({
    keyboard: true,
    animation: true,
    templateUrl: '/uib/template/modal/addAlbumModal.html',
    controller: 'addAlbumModalController',
    size: 'lg',
  });

  modalInstance.result.then(function (album) {
    renderAlbums(album);
  }, function (something) {
    console.log('something: ', something);
    $log.info('Modal dismissed at: ' + new Date());
  });
};

////////////////////////////////////////////////////////////////////////
/// Edit Album
$scope.editAlbum = album => {
  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: '/uib/template/modal/editAlbumModal.html',
    controller: 'editAlbumModalController',
    size: 'lg',
    resolve : { editAlbum : ()=> album }
  });
  modalInstance.result.then(function (editedAlbum) {
    console.log('editedAlbum: ', editedAlbum);
  }, function () {
    $log.info('Modal dismissed at: ' + new Date());
  });
};

////////////////////////////////////////////////////////////////////////
/// Delete Album
$scope.deleteAlbum = album => {
  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: '/uib/template/modal/deleteAlbumModal.html',
    controller: 'deleteAlbumModalController',
    size: 'lg',
    resolve : { deleteAlbum : ()=> album }
  });
  modalInstance.result.then(function (deleteAlbum) {
    deleteAlbum(deleteAlbum);
  }, function () {
    $log.info('Modal dismissed at: ' + new Date());
  });
};
});
