const fs = require("fs")
const winston = require("winston")
require("winston-daily-rotate-file")

const logDir = process.env.LOG_DIR || "logs"

if(!fs.existsSync(logDir)) fs.mkdirSync(logDir)

const format = winston.format.printf(info => {
    const log = `${info.timestamp} ${info.level} : ${info.message}`;
    return info.stack ? `${log}\n${info.stack}` : log;
})

const transportOptions = {
    filename : `app-logs-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
}

const options = {
    console: {
        level: 'debug',
        format: winston.format.combine(
            winston.format.errors({stack: true}),
            winston.format.timestamp(),
            winston.format.colorize(),
            format
        )
    },

    verbose: {
        level: process.env.LOGGING_LEVEL,
        format: winston.format.combine(
            winston.format.timestamp(),
            format,
        )
    }
}

const transDailyRotate = new winston.transports.DailyRotateFile({
    ...options.verbose,
    ...transportOptions
})

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        transDailyRotate
    ]
})

module.exports = moduleName => ({
    info: message => logger.info(`[${moduleName}] : ${message}`),
    debug: message => logger.debug(`[${moduleName}] : ${message}`),
    error: (message, error) => logger.error(`[${moduleName}] : ${message}`, error)
})