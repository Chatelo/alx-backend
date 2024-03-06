import redis from 'redis';

const subscriberClient = redis.createClient();

subscriberClient.on('connect', () => {
  console.log('Redis client connected to the server');

  // Subscribe to the channel
  subscriberClient.subscribe('holberton school channel');
});

subscriberClient.on('message', (channel, message) => {
  console.log(message);

  // Unsubscribe and quit when the message is 'KILL_SERVER'
  if (message === 'KILL_SERVER') {
    subscriberClient.unsubscribe();
    subscriberClient.quit();
  }
});

subscriberClient.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
  subscriberClient.quit();
});

// Gracefully handle process interruptions and close the Redis connection
process.on('SIGINT', () => {
  subscriberClient.quit();
  process.exit();
});
