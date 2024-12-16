const winston = require('winston');
const path = require('path'); // path modülünü dahil et

// Log formatlarını tanımla
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Logger'ı yapılandır
const logger = (serviceName, level = 'info') => {
  return winston.createLogger({
    level: level, // Servise özel log seviyesi
    format: logFormat,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          logFormat
        ),
      }),
      new winston.transports.File({
        filename: path.join(__dirname, `../logs/${serviceName}.log`),
        level: level,
      }),
    ],
  });
};

module.exports = logger;
