/**
 * Debug mode
 */

'use strict';

const path = require('path');
const pkg = require('./package.json');

require('dotenv').config();

require(path.join(__dirname, pkg.main));