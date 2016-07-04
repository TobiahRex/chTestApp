'use strict';

angular.module('fullStackTemplate')
.service('Album', function($http){

  this.getAlbums      = _         => $http.get      ('/api/albums/');

  this.createAlbum    = albumName => $http.post    ('/api/albums/', albumName);


  this.getOne         = id        => $http.get      (`/api/albums/${id}`);

  this.editOne        = id        => $http.put     (`/api/albums/${id}`);

  this.deleteOne      = id        => $http.delete  (`/api/albums/${id}`);


  this.addPhoto       = idsObj    => $http.post    (`/api/albums/${idsObj.albumId}/photo/${idsObj.photoId}`);

  this.removePhoto    = idsObj    => $http.delete  (`/api/albums/${idsObj.albumId}/photo/${idsObj.photoId}`);
});
