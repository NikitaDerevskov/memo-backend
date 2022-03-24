import {createClient} from "redis";

export const redisClient = createClient({ url: process.env.REDIS_URI });
redisClient.connect().then(() => console.log('Redis connected'));
