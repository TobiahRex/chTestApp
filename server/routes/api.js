'use strict';

var express = require('express');
var router = express.Router();

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

module.exports = router;
