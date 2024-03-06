import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  // Before each test, create a new Kue queue and enter test mode
  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  // After each test, clear the queue and exit test mode
  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    // Call the function with a non-array argument
    const testFunction = () => createPushNotificationsJobs('not an array', queue);

    // Expect an error to be thrown
    expect(testFunction).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    // Define the list of jobs
    const list = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' },
    ];

    // Call the function with the list of jobs
    createPushNotificationsJobs(list, queue);

    // Get the list of jobs in the queue
    const jobsInQueue = queue.testMode.jobs['push_notification_code_3'];

    // Expect two jobs to be created
    expect(jobsInQueue.length).to.equal(2);

    // Expect the created jobs to match the expected job data
    expect(jobsInQueue[0].data).to.deep.equal(list[0]);
    expect(jobsInQueue[1].data).to.deep.equal(list[1]);
  });

  // Add more test cases as needed

});
