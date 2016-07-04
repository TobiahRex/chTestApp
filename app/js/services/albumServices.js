'use strict';

angular.module('fullStackTemplate')
.service('Album', function($http){

  this.getAlbums      = _         => $http.get   ('/api/albums/');

  this.createAlbum    = albumObj  => $http.post   ('/api/albums/', albumObj);

  this.getOne         = id        => $http.get   (`/api/albums/${id}`);

  this.getProfile     = _         => $http.get    ('/api/albums/profile');

});
angular.module('fullStackTemplate')
.service('Photo', function($http){

  this.loginUser      = userObj   => $http.post   ('/api/photos/login', userObj);

  this.logoutUser     = _         => $http.delete ('/api/photos/login');

  this.registerUser   = userObj   => $http.post   ('/api/photos/register', userObj);

  this.getProfile     = _         => $http.get    ('/api/photos/profile');

});

router.route('/')
.get((req, res)     => Album.find({}).populate('photos').exec(res.handle))
.post((req, res)    => Album.create(req.body, res.handle));

router.route('/:id')
.get((req, res)     => Album.findById(req.params.id, res.handle))
.delete((req, res)  => Album.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     =>  Album.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, res.handle));


router.route('/:id_album/photo/:id_photo')
.post((req, res)    => Album.addPhoto(req.params, res.handle))
.delete((req, res)  => Album.removePhoto(req.params, res.handle));
