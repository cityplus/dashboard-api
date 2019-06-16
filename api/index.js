/**
 * API entry point
 */

'use strict';

const express = require('express');

const app = express();

app.use('*', (req, res) => res.send({ app: 'API' }));

module.exports = app;