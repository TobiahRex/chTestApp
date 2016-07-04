
angular.module('fullStackTemplate')
.service('Photo', function($http){

  this.getPhotos      = _         => $http.get      ('/api/photos/');

  this.createPhoto    = url       => $http.post     ('/api/photos/', url);


  this.getOne         = id        => $http.post     (`/api/photos/${id}`);

  this.editOne        = id        => $http.put      (`/api/photos/${id}`);

  this.deleteOne      = id        => $http.delete   (`/api/photos/${id}`);
});
