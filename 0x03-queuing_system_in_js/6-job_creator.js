import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create a job data object
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification message!',
};

// Create a job in the push_notification_code queue
const job = queue.create('push_notification_code', jobData);

// When the job is created without error
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
  // Important: You need to save the job to actually enqueue it
  job.save();
});

// When the job is completed
job.on('complete', () => {
  console.log('Notification job completed');
  // Quit Kue to gracefully handle process interruptions
  kue.app.close();
});

// When the job is failing
job.on('failed', () => {
  console.log('Notification job failed');
  // Quit Kue to gracefully handle process interruptions
  kue.app.close();
});

// To process the job, go to the next task!
