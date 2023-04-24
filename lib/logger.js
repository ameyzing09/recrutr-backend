import { existsSync, mkdirSync } from "fs"
import { format as _format, transports as _transports, createLogger } from "winston"
import "winston-daily-rotate-file"

const logDir = process.env.LOG_DIR || "logs"

if(!existsSync(logDir)) mkdirSync(logDir)

const format = _format.printf(info => {
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
        format: _format.combine(
            _format.errors({stack: true}),
            _format.timestamp(),
            _format.colorize(),
            format
        )
    },

    verbose: {
        level: process.env.LOGGING_LEVEL,
        format: _format.combine(
            _format.timestamp(),
            format,
        )
    }
}

const transDailyRotate = new _transports.DailyRotateFile({
    ...options.verbose,
    ...transportOptions
})

const logger = createLogger({
    transports: [
        new _transports.Console(options.console),
        transDailyRotate
    ]
})

export default moduleName => ({
    info: message => logger.info(`[${moduleName}] : ${message}`),
    debug: message => logger.debug(`[${moduleName}] : ${message}`),
    error: (message, error) => logger.error(`[${moduleName}] : ${message}`, error)
})