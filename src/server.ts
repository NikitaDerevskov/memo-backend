import express from 'express';
import knex from 'knex';
import { createClient } from 'redis';

import handleRegistration from './controllers/Registration';
import signIn from './controllers/SignIn';

const app = express();
const port = 3000;

app.use(express.json());

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  searchPath: ['knex', 'public'],
});

const redisClient = createClient({ url: process.env.REDIS_URI });
redisClient.connect().then(() => console.log('Redis connected'));

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('test');
  res.send('Hell1o');
});

app.post('/api/register', (req:express.Request, res: express.Response) => handleRegistration(req, res, db, redisClient));

app.post('/api/login', (req: express.Request, res:express.Response) => signIn(req, res, db, redisClient));

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
