'use strict';

var express = require('express');
var router = express.Router();
var Album = require('../models/album');


router.route('/')
.get((req, res)     => Album.find({}).populate('photos').exec(res.handle))
.post((req, res)    => Album.create(req.body, res.handle));

router.route('/:id')
.get((req, res)     => Album.findById(req.params.id, res.handle))
.delete((req, res)  => Album.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     =>  Album.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, res.handle));


router.route('/:id_album/photo/:id_photo')
.post((req, res)    => Album.addPhoto(req.params, res.handle))
.delete((req, res)  => Album.removePhoto(req.params, res.handle));


module.exports = router;
