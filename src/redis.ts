import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URI });
redisClient.connect().then(() => console.log('Redis connected'));

export default redisClient;
