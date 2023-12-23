//@ts-nocheck
import * as redis from "redis";

const client = redis.createClient();

client.on("error", (err: Error) => console.log("Redis Client Error", err));

const queueName: string = "pythonQueue";

const transcode = async (job: Record<string, any>): Promise<void> => {
  await client.connect();
  let jobString: string = JSON.stringify(job);
  client.rPush(queueName, jobString, (err: Error | null, reply: number) => {
    if (err) {
      console.error("Error pushing job to queue:", err);
    } else {
      console.log(`Job ${job} pushed to queue. Reply from Redis: ${reply}`);
    }
  });
  client.quit();
};

export { transcode };
