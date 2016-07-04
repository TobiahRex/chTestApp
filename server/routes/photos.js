'use strict';

var express = require('express');
var router = express.Router();
var Photo = require('../models/photo');


router.route('/')
.get((req, res)     => Photo.find({}, res.handle))
.post((req, res)    => Photo.create(req.body, res.handle));

router.route('/:id')
.get((req, res)     => Photo.findById(req.params.id, res.handle))
.delete((req, res)  => Photo.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     =>  Photo.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, res.handle));

module.exports = router;
