import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
  client.quit();
});

// Gracefully handle process interruptions and close the Redis connection
process.on('SIGINT', () => {
  client.quit();
  process.exit();
});
