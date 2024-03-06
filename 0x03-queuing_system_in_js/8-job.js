import kue from 'kue';

// Function to create push notifications jobs
const createPushNotificationsJobs = (jobs, queue) => {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // For each job in jobs, create a job in the queue push_notification_code_3
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);

    // Job creation log
    job
      .on('enqueue', () => console.log(`Notification job created: ${job.id}`))

      // Job completion log
      .on('complete', () => console.log(`Notification job ${job.id} completed`))

      // Job failure log
      .on('failed', (errorMessage) => console.log(`Notification job ${job.id} failed: ${errorMessage}`))

      // Job progress log
      .on('progress', (progress, data) => console.log(`Notification job ${job.id} ${progress}% complete`));

    // Save the job to the queue
    job.save();
  });
};

export default createPushNotificationsJobs;
