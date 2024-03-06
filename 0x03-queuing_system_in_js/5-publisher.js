import redis from 'redis';

const publisherClient = redis.createClient();

publisherClient.on('connect', () => {
  console.log('Redis client connected to the server');

  // Function to publish a message after a specified time
  const publishMessage = (message, time) => {
    setTimeout(() => {
      console.log(`About to send ${message}`);
      publisherClient.publish('holberton school channel', message);
    }, time);
  };

  // Use the function to publish messages
  publishMessage('Holberton Student #1 starts course', 100);
  publishMessage('Holberton Student #2 starts course', 200);
  publishMessage('KILL_SERVER', 300);
  publishMessage('Holberton Student #3 starts course', 400);
});

publisherClient.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
  publisherClient.quit();
});

// Gracefully handle process interruptions and close the Redis connection
process.on('SIGINT', () => {
  publisherClient.quit();
  process.exit();
});
