const redis = require('redis');
const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
const queueName = 'pythonQueue';
const transcode = async (job) => {
    await client.connect();
    job = JSON.stringify(job);
    client.rPush(queueName, job, (err, reply) => {
        if (err) {
            console.error('Error pushing job to queue:', err);
        } else {
            console.log(`Job ${job} pushed to queue. Reply from Redis: ${reply}`);
        }
    });
    client.quit();
}


module.exports = { transcode }