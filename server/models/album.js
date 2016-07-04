'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Photo    = require('./photo');

let albumSchema = new mongoose.Schema({
  name    :   {
    type    :     String
  },
  photos  :   [{
    type    :   ObjectId,
    ref     :   'Photo'
  }]
});


albumSchema.statics.addPhoto = (Params, cb) => {
  if(!Params.id_album || !Params.id_photo) return cb({ERROR : 'You did not provide both ids.'});

  Album.findById(Params.id_album, (err1, dbAlbum)=> {
    Photo.findById(Params.id_photo, (err2, dbPhoto)=> {
      err1 || err2 ? cb(err1 || err2) : null;
      dbAlbum.photos.push(dbPhoto._id);
      dbAlbum.save((err, savedAlbum) => {
        err ? cb(err) : cb(null, savedAlbum);
      });
    });
  });
};

albumSchema.statics.removePhoto = (Params, cb) => {
  if(!Params.id_album || !Params.id_photo) return cb({ERROR : 'You did not provide both ids.'});

  Album.findById(Params.id_album, (err1, dbAlbum)=> {
    Photo.findById(Params.id_photo, (err2, dbPhoto)=> {
      err1 || err2 ? cb(err1 || err2) : null;

      dbAlbum.photos.splice(dbAlbum.photos.indexOf(dbPhoto._id));

      dbAlbum.save((err, savedAlbum) => {
        err ? cb(err) : cb(null, savedAlbum);
      });
    });
  });
};



let Album = mongoose.model('Album', albumSchema);
module.exports = Album;
