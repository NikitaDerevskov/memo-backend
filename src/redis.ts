import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URI });
redisClient.connect().then(() => console.log('Redis connected'));

redisClient.on('error', (e) => {
  console.error('Redis error', e);
});

export default redisClient;
