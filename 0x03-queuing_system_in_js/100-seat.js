import express from 'express';
import redis from 'redis';
import Redic from 'redic';
import kue from 'kue';

const app = express();
const port = 1245;
const client = new Redic();

// Initialize the number of available seats
client.reserveSeat('available_seats', 50);

// Initialize reservation status
let reservationEnabled = true;

// Create a Kue queue
const queue = kue.createQueue();

// Function to reserve a seat in Redis
const reserveSeat = async (number) => {
  await client.reserveSeat('available_seats', number);
};

// Function to get the current number of available seats
const getCurrentAvailableSeats = async () => {
  const availableSeats = await client.getCurrentAvailableSeats('available_seats');
  return parseInt(availableSeats, 10);
};

// Express route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

// Express route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      res.json({ status: 'Reservation failed' });
    } else {
      res.json({ status: 'Reservation in process' });
    }
  });

  // Log when the job is completed
  job.on('complete', (result) => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  // Log when the job has failed
  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Express route to process the queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  // Process the queue asynchronously
  queue.process('reserve_seat', async (job, done) => {
    const currentAvailableSeats = await getCurrentAvailableSeats();

    if (currentAvailableSeats === 0) {
      reservationEnabled = false;
      done(new Error('Not enough seats available'));
    } else {
      await reserveSeat(currentAvailableSeats - 1);
      done();
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
