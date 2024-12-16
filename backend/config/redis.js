const redis = require('redis');
const { logInfo, logError } = require('../utils/loggerUtil');

const client = redis.createClient({
  url: 'redis://redis:6379',
});

(async () => {
  try {
    await client.connect(); // Bağlantıyı başlat
    logInfo('Redis', `Redis connected: ${client.options.url}`);
  } catch (err) {
    logError('Redis', `Redis connection failed: ${err.message}`);
  }
})();

client.on('error', (err) => {
  logError('Redis', `Redis error: ${err.message}`);
});

module.exports = client;