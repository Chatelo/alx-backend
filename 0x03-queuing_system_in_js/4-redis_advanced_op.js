import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');

  // Create Hash using hset
  client.hset(
    'HolbertonSchools',
    'Portland', 50,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Seattle', 80,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'New York', 20,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Bogota', 20,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Cali', 40,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Paris', 2,
    redis.print
  );

  // Display Hash using hgetall
  client.hgetall('HolbertonSchools', (err, reply) => {
    console.log(reply);
    // Quit the client after displaying the hash
    client.quit();
  });
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
