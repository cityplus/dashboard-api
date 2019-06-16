/**
 * Status controller
 */

'use strict';

const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => res.send({ app: 'status' }));

module.exports = router;