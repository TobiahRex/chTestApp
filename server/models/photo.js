'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let photoSchema = new mongoose.Schema({
  created : {
    type    :   Date,
    default :   Date.now
  },
  url     : {
    type    :   String
  }
});


let Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
