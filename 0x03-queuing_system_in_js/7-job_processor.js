import kue from 'kue';

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notification
const sendNotification = (phoneNumber, message, job, done) => {
  // Track progress 0% complete
  job.progress(0, 100);

  // If phoneNumber is blacklisted, fail the job
  if (blacklistedNumbers.includes(phoneNumber)) {
    const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
    job.log(errorMessage);
    return done(new Error(errorMessage));
  }

  // Otherwise, track progress 50% complete
  job.progress(50, 100);

  // Log to the console
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Job is done
  done();
};

// Create a Kue queue (push_notification_code_2)
const queue = kue.createQueue();

// Process jobs of the queue push_notification_code_2 with two jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  // Extract data from the job
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message, job, done);
});

// Gracefully handle process interruptions
process.on('SIGINT', () => {
  // Quit Kue
  kue.app.close();
  process.exit();
});
