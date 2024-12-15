const redis = require('redis');

const client = redis.createClient({
  url: 'redis://redis:6379',
});

(async () => {
  try {
    await client.connect(); // Bağlantıyı başlat
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;