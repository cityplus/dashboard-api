/**
 * Logging service
 */

'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');
const env = require('pkg-env');

// create default logger
const logger = winston.createLogger({
    transports: [],
    exceptionHandlers: [],
    exitOnError: false
});

logger.add(new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,

    stderrLevels: ['error'],
    consoleWarnLevels: ['error', 'warn']
}));


logger.add(new winston.transports.DailyRotateFile({
    level: 'info',
    handleExceptions: true,

    frequency: '24h',
    datePattern: 'YYYY-MM-DD',
    filename: `toasty_server_%DATE%.log`,
    dirname: 'logs',
    maxSize: '10m',
    zippedArchive: env.isProd,
    maxFiles: '90d'
}));

module.exports = logger;