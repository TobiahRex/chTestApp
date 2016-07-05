'use strict';

angular.module('fullStackTemplate')
.controller('albumsController', function($scope, $state, Album, Photo, $uibModal, $log, $q){

  let renderAlbums = () => {
    Album.getAlbums()
    .then(res => $scope.Albums = res.data)
    .catch(err => $q.reject());
  };

  renderAlbums();

  let createAlbum = album => {
    Album.createAlbum(album)
    .then(res => renderAlbums())
    .catch(err => $q.reject());
  };

  let removeAlbum = album => {
    Album.deleteOne(album)
    .then(res => renderAlbums())
    .catch(res => $q.reject());
  };

  let saveEdit = album =>
  Album.editOne(album)
  .then(res => renderAlbums())
  .catch(err => $q.reject());

  let insertPhoto = idObj => {
    Album.addPhoto(idObj)
    .then(res => renderAlbums())
    .catch(err => $q.reject());
  };

  //////////////////////////////////////////////////////////////////////
  // Add photo Modal

  $scope.addPhoto = album => {
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
        },
        album
      }
    });

    modalInstance.result
    .then(idObj => insertPhoto(idObj),
    _ => $log.info('Modal dismissed at: ' + new Date()));
  };

  //////////////////////////////////////////////////////////////////////
  // Add Album Modal
  $scope.addAlbum = _ => {
    var modalInstance = $uibModal.open({
      keyboard: true,
      animation: true,
      templateUrl: '/uib/template/modal/addAlbumModal.html',
      controller: 'addAlbumModalController',
      size: 'lg',
    });

    modalInstance.result
    .then(album => createAlbum(album),
    _ => $log.info('Modal dismissed at: ' + new Date()));
  };

  ////////////////////////////////////////////////////////////////////////
  /// Edit Album Modal
  $scope.editAlbum = album => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/editAlbumModal.html',
      controller: 'editAlbumModalController',
      size: 'lg',
      resolve : { editAlbum : ()=> album }
    });
    modalInstance.result
    .then(editedAlbum => saveEdit(editedAlbum),
    _ => $log.info('Modal dismissed at: ' + new Date()));
  };

  ////////////////////////////////////////////////////////////////////////
  /// Delete Album Modal
  $scope.deleteAlbum = album => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/deleteAlbumModal.html',
      controller: 'deleteAlbumModalController',
      size: 'lg',
      resolve : { deleteAlbum : ()=> album }
    });
    modalInstance.result.then(albumId => removeAlbum(albumId),
    _ => $log.info('Modal dismissed at: ' + new Date()));
  };
});
