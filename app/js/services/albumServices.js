function albumServices($http) {

  this.getAlbums = () => $http.get('/api/albums/');

  this.createAlbum = albumName => $http.post('/api/albums/', albumName);

  this.getOne = id => $http.get(`/api/albums/${id}`);

  this.editOne = album => {
    console.log('Services album: ', album);
    return $http.put(`/api/albums/${album._id}`, album)
  };

  this.deleteOne = id => $http.delete(`/api/albums/${id}`);

  this.addPhoto = idsObj => $http.post(`/api/albums/${idsObj.albumId}/photo/${idsObj.photoId}`);

  this.removePhoto = idsObj => $http.delete(`/api/albums/${idsObj.albumId}/photo/${idsObj.photoId}`);
}

angular.module('fullStackTemplate').service('Album', albumServices);
