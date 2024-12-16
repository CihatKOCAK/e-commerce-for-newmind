const logger = require('../config/logger');

// Servis adı ve seviyeyi parametre olarak alarak loglama yap
const logInfo = (serviceName, message) => {
  const log = logger(serviceName, 'info');
  log.info(message);
};

const logError = (serviceName, message) => {
  const log = logger(serviceName, 'error');
  log.error(message);
};

const logWarn = (serviceName, message) => {
  const log = logger(serviceName, 'warn');
  log.warn(message);
};

const logDebug = (serviceName, message) => {
  const log = logger(serviceName, 'debug');
  log.debug(message);
};

module.exports = {
  logInfo,
  logError,
  logWarn,
  logDebug,
};
