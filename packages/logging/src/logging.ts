import { config, createLogger as createWinstonLogger, format, transports } from 'winston';

type Options = {
  level?: string;
  service?: string;
  exceptionLog?: boolean;
  rejectionsLog?: boolean;
  syslog?: boolean;
};

const DefaultOptions = {
  level: 'info',
  syslog: true,
};

/**
 * create logger instance
 * @param {Options} options
 * @param {string} [options.level='info']  the log level
 * @param {string} [options.service]  the service name to log
 * @param {boolean} [options.exceptionLog]  write extra file exception.log?
 * @param {boolean} [options.rejectstionLog]  write extra file rejections.log?
 * @param {boolean} [options.syslog=true]  use syslog methods?
 */
const createLogger = (options: Options = DefaultOptions) =>
  createWinstonLogger({
    levels: options.syslog === false ? config.npm.levels : config.syslog.levels,
    level: options.level || DefaultOptions.level,
    format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
    defaultMeta: {
      ...(options.service ? { service: options.service } : null),
    },
    transports: [new transports.Console()],
    ...(options.exceptionLog ? { exceptionHandlers: [new transports.File({ filename: 'exception.log' })] } : null),
    ...(options.rejectionsLog ? { rejectionHandlers: [new transports.File({ filename: 'rejections.log' })] } : null),
  });

export default createLogger;
